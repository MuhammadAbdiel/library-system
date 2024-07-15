const ReturnBooks = require('../ReturnBooks')
const MemberRepository = require('../../../../infrastructures/mongoose/MemberRepositoryMongoose')
const BookRepository = require('../../../../infrastructures/mongoose/BookRepositoryMongoose')
const { InvariantError } = require('../../../../commons/errors')

jest.mock('../../../../infrastructures/mongoose/MemberRepositoryMongoose')
jest.mock('../../../../infrastructures/mongoose/BookRepositoryMongoose')

describe('ReturnBooks', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return book successfully', async () => {
    const memberId = '6222882126f7cc72f30ea0df'
    const bookId = '62cfe59890e64e9e644d3fb9'

    const mockMember = { _id: memberId, borrowedBooks: [{ book: bookId }] }
    const mockBook = { _id: bookId }

    const memberRepository = new MemberRepository()
    memberRepository.findOne.mockResolvedValue(mockMember)
    memberRepository.isBookNotBorrowed.mockResolvedValue()
    memberRepository.isPenalized.mockResolvedValue(false)
    memberRepository.startSession.mockResolvedValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    })
    memberRepository.removeBorrowedBooks.mockResolvedValue()

    const bookRepository = new BookRepository()
    bookRepository.findOne.mockResolvedValue(mockBook)
    bookRepository.increaseStock.mockResolvedValue()

    const returnBooks = new ReturnBooks(memberRepository, bookRepository)
    const result = await returnBooks.execute(memberId, bookId)

    expect(result).toBe('Book returned successfully')

    expect(memberRepository.findOne).toHaveBeenCalledWith(memberId)
    expect(memberRepository.isBookNotBorrowed).toHaveBeenCalledWith(0)
    expect(memberRepository.isPenalized).toHaveBeenCalledWith(mockMember, 0)
    expect(memberRepository.startSession).toHaveBeenCalled()
    expect(memberRepository.removeBorrowedBooks).toHaveBeenCalledWith(mockMember, 0)
    expect(bookRepository.findOne).toHaveBeenCalledWith(bookId)
    expect(bookRepository.increaseStock).toHaveBeenCalledWith(mockBook)
  })

  it('should return book successfully with penalty', async () => {
    const memberId = '6222882126f7cc72f30ea0df'
    const bookId = '62cfe59890e64e9e644d3fb9'

    const mockMember = { _id: memberId, borrowedBooks: [{ book: bookId }], penaltyEndDate: new Date() }
    const mockBook = { _id: bookId }

    const memberRepository = new MemberRepository()
    memberRepository.findOne.mockResolvedValue(mockMember)
    memberRepository.isBookNotBorrowed.mockResolvedValue()
    memberRepository.isPenalized.mockResolvedValue(true)
    memberRepository.startSession.mockResolvedValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    })
    memberRepository.removeBorrowedBooks.mockResolvedValue()

    const bookRepository = new BookRepository()
    bookRepository.findOne.mockResolvedValue(mockBook)
    bookRepository.increaseStock.mockResolvedValue()

    const returnBooks = new ReturnBooks(memberRepository, bookRepository)
    const result = await returnBooks.execute(memberId, bookId)

    expect(result).toBe('Book returned successfully with penalty')

    expect(memberRepository.findOne).toHaveBeenCalledWith(memberId)
    expect(memberRepository.isBookNotBorrowed).toHaveBeenCalledWith(0)
    expect(memberRepository.isPenalized).toHaveBeenCalledWith(mockMember, 0)
    expect(memberRepository.startSession).toHaveBeenCalled()
    expect(memberRepository.removeBorrowedBooks).toHaveBeenCalledWith(mockMember, 0)
    expect(bookRepository.findOne).toHaveBeenCalledWith(bookId)
    expect(bookRepository.increaseStock).toHaveBeenCalledWith(mockBook)
  })
})
