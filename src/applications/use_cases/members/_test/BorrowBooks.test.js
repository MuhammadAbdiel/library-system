const BorrowBooks = require('../BorrowBooks')
const MemberRepository = require('../../../../infrastructures/mongoose/MemberRepositoryMongoose')
const BookRepository = require('../../../../infrastructures/mongoose/BookRepositoryMongoose')

jest.mock('../../../../infrastructures/mongoose/MemberRepositoryMongoose')
jest.mock('../../../../infrastructures/mongoose/BookRepositoryMongoose')

describe('BorrowBooks', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should borrow a book successfully', async () => {
    const memberId = '6222882126f7cc72f30ea0df'
    const bookId = '62cfe59890e64e9e644d3fb9'

    const mockMember = { _id: memberId, borrowedBooks: [] }
    const mockBook = { _id: bookId, stock: 1 }

    const memberRepository = new MemberRepository()
    memberRepository.findOne.mockResolvedValue(mockMember)
    memberRepository.isNotPenalized.mockResolvedValue()
    memberRepository.isAbleToBorrow.mockResolvedValue()
    memberRepository.startSession.mockResolvedValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    })
    memberRepository.updateBorrowedBooks.mockResolvedValue(mockMember)
    memberRepository.save.mockResolvedValue(mockMember)

    const bookRepository = new BookRepository()
    bookRepository.findOne.mockResolvedValue(mockBook)
    bookRepository.isBookAvailable.mockResolvedValue()
    bookRepository.decreaseStock.mockResolvedValue()

    const borrowBooks = new BorrowBooks(memberRepository, bookRepository)
    const result = await borrowBooks.execute(memberId, bookId)

    expect(result).toBe('Book borrowed successfully')

    expect(memberRepository.findOne).toHaveBeenCalledWith(memberId)
    expect(memberRepository.isNotPenalized).toHaveBeenCalledWith(mockMember)
    expect(memberRepository.isAbleToBorrow).toHaveBeenCalledWith(mockMember)
    expect(memberRepository.startSession).toHaveBeenCalled()
    expect(memberRepository.updateBorrowedBooks).toHaveBeenCalledWith(mockMember, bookId)

    expect(bookRepository.findOne).toHaveBeenCalledWith(bookId)
    expect(bookRepository.isBookAvailable).toHaveBeenCalledWith(mockBook)
    expect(bookRepository.decreaseStock).toHaveBeenCalledWith(mockBook)

    const session = await memberRepository.startSession()
    expect(session.startTransaction).toHaveBeenCalled()
    expect(session.commitTransaction).toHaveBeenCalled()
    expect(session.abortTransaction).not.toHaveBeenCalled()
    expect(session.endSession).toHaveBeenCalled()
  })

  it('should throw an error if member is penalized', async () => {
    const memberId = '6222882126f7cc72f30ea0df'
    const bookId = '62cfe59890e64e9e644d3fb9'

    const mockMember = { _id: memberId, borrowedBooks: [] }

    const memberRepository = new MemberRepository()
    memberRepository.findOne.mockResolvedValue(mockMember)
    memberRepository.isNotPenalized.mockRejectedValue(new Error('Member is penalized'))

    const bookRepository = new BookRepository()

    const borrowBooks = new BorrowBooks(memberRepository, bookRepository)

    await expect(borrowBooks.execute(memberId, bookId)).rejects.toThrow('Member is penalized')
    expect(memberRepository.findOne).toHaveBeenCalledWith(memberId)
    expect(bookRepository.findOne).not.toHaveBeenCalledWith(bookId)
    expect(memberRepository.isNotPenalized).toHaveBeenCalledWith(mockMember)
  })

  it('should throw an error if book is not available', async () => {
    const memberId = '6222882126f7cc72f30ea0df'
    const bookId = '62cfe59890e64e9e644d3fb9'

    const mockMember = { _id: memberId, borrowedBooks: [] }
    const mockBook = { _id: bookId, stock: 0 }

    const memberRepository = new MemberRepository()
    memberRepository.findOne.mockResolvedValue(mockMember)
    memberRepository.isNotPenalized.mockResolvedValue()
    memberRepository.isAbleToBorrow.mockResolvedValue()

    const bookRepository = new BookRepository()
    bookRepository.findOne.mockResolvedValue(mockBook)
    bookRepository.isBookAvailable.mockRejectedValue(new Error('Book is not available'))

    const borrowBooks = new BorrowBooks(memberRepository, bookRepository)

    await expect(borrowBooks.execute(memberId, bookId)).rejects.toThrow('Book is not available')

    expect(memberRepository.findOne).toHaveBeenCalledWith(memberId)
    expect(memberRepository.isNotPenalized).toHaveBeenCalledWith(mockMember)
    expect(memberRepository.isAbleToBorrow).toHaveBeenCalledWith(mockMember)
    expect(memberRepository.startSession).not.toHaveBeenCalled()
    expect(memberRepository.updateBorrowedBooks).not.toHaveBeenCalled()
    expect(memberRepository.save).not.toHaveBeenCalled()

    expect(bookRepository.findOne).toHaveBeenCalledWith(bookId)
    expect(bookRepository.isBookAvailable).toHaveBeenCalledWith(mockBook)
    expect(bookRepository.decreaseStock).not.toHaveBeenCalled()
  })
})
