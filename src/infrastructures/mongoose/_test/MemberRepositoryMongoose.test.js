const MemberRepositoryMongoose = require('../MemberRepositoryMongoose')
const MemberModel = require('../../databases/models/MemberModel')
const { NotFoundError, InvariantError } = require('../../../commons/errors')
const { default: mongoose } = require('mongoose')

jest.mock('../../databases/models/MemberModel', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  startSession: jest.fn(),
  equals: jest.fn(),
}))

describe('MemberRepositoryMongoose', () => {
  let memberRepository

  beforeEach(() => {
    memberRepository = new MemberRepositoryMongoose()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne method', () => {
    it('should find one member by id', async () => {
      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [] }
      MemberModel.findOne.mockResolvedValue(mockMember)

      const memberId = 'mockId'
      const result = await memberRepository.findOne(memberId)

      expect(result).toEqual(mockMember)
      expect(MemberModel.findOne).toHaveBeenCalledWith({ _id: memberId })
    })

    it('should throw NotFoundError if member not found', async () => {
      MemberModel.findOne.mockResolvedValue(null)

      const memberId = 'nonExistingId'

      await expect(memberRepository.findOne(memberId)).rejects.toThrow(NotFoundError)
      expect(MemberModel.findOne).toHaveBeenCalledWith({ _id: memberId })
    })
  })

  describe('findAll method', () => {
    it('should find all members', async () => {
      const mockMembers = [
        { _id: 'mockId1', name: 'John Doe', borrowedBooks: [] },
        { _id: 'mockId2', name: 'Jane Doe', borrowedBooks: [] },
      ]
      MemberModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockMembers),
      })

      const result = await memberRepository.findAll()

      expect(result).toEqual(mockMembers)
      expect(MemberModel.find).toHaveBeenCalled()
      expect(MemberModel.find().populate).toHaveBeenCalledWith({
        path: 'borrowedBooks',
        select: 'book borrowedDate',
        populate: { path: 'book', select: 'code title author' },
      })
    })
  })

  describe('isNotPenalized method', () => {
    it('should return true if member is not penalized', async () => {
      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [], penaltyEndDate: null }
      const result = await memberRepository.isNotPenalized(mockMember)

      expect(result).toBe(true)
    })

    it('should throw InvariantError if member is penalized', async () => {
      const futureDate = new Date()
      futureDate.setSeconds(futureDate.getSeconds() + 10)

      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [], penaltyEndDate: futureDate }

      await expect(memberRepository.isNotPenalized(mockMember)).rejects.toThrow(InvariantError)
    })
  })

  describe('isAbleToBorrow method', () => {
    it('should return true if member is able to borrow', async () => {
      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [], penaltyEndDate: null }
      const result = await memberRepository.isAbleToBorrow(mockMember)

      expect(result).toBe(true)
    })

    it('should throw InvariantError if member is not able to borrow', async () => {
      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [{}, {}], penaltyEndDate: null }

      await expect(memberRepository.isAbleToBorrow(mockMember)).rejects.toThrow(InvariantError)
    })
  })

  describe('updateBorrowedBooks method', () => {
    it("should add a book to the member's borrowedBooks list and save", async () => {
      const mockMember = {
        _id: 'memberId',
        name: 'John Doe',
        borrowedBooks: [],
      }
      const bookId = 'bookId'

      const saveMock = jest.fn().mockResolvedValue(mockMember)
      memberRepository.save = saveMock

      const updatedMember = await memberRepository.updateBorrowedBooks(mockMember, bookId)

      expect(updatedMember.borrowedBooks).toHaveLength(1)
      expect(updatedMember.borrowedBooks[0].book).toBe(bookId)
      expect(updatedMember.borrowedBooks[0].borrowedDate).toBeInstanceOf(Date)

      expect(saveMock).toHaveBeenCalledWith(mockMember)
    })
  })

  describe('save method', () => {
    it('should call save method on the member object', async () => {
      const mockMember = {
        save: jest.fn().mockResolvedValue(true),
      }

      await memberRepository.save(mockMember)

      expect(mockMember.save).toHaveBeenCalled()
    })

    it('should handle save method throwing an error', async () => {
      const mockMember = {
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }

      await expect(memberRepository.save(mockMember)).rejects.toThrow('Save failed')
    })
  })

  describe('startSession method', () => {
    it('should call MemberModel.startSession and return the session', async () => {
      const mockSession = { session: 'mockSession' }
      MemberModel.startSession.mockResolvedValue(mockSession)

      const result = await memberRepository.startSession()

      expect(MemberModel.startSession).toHaveBeenCalled()
      expect(result).toEqual(mockSession)
    })

    it('should handle startSession method throwing an error', async () => {
      const mockError = new Error('Start session failed')
      MemberModel.startSession.mockRejectedValue(mockError)

      await expect(memberRepository.startSession()).rejects.toThrow('Start session failed')
    })
  })

  describe('isPenalized method', () => {
    it('should set penaltyEndDate if member is penalized', async () => {
      const mockMember = {
        _id: 'mockMemberId',
        borrowedBooks: [{ book: 'mockBookId', borrowedDate: new Date('2023-01-01') }],
        penaltyEndDate: null,
      }

      const memberRepository = new MemberRepositoryMongoose()

      await memberRepository.isPenalized(mockMember, 0)

      expect(mockMember.penaltyEndDate).toBeDefined()
      expect(mockMember.penaltyEndDate).toBeInstanceOf(Date)
    })

    it('should not set penaltyEndDate if member is not penalized', async () => {
      const mockMember = {
        _id: 'mockMemberId',
        borrowedBooks: [{ book: 'mockBookId', borrowedDate: new Date() }],
        penaltyEndDate: null,
      }

      const memberRepository = new MemberRepositoryMongoose()
      await memberRepository.isPenalized(mockMember, 0)

      expect(mockMember.penaltyEndDate).toBeNull()
    })
  })

  describe('removeBorrowedBooks method', () => {
    it('should remove borrowed book from member', async () => {
      const mockMember = {
        _id: 'mockMemberId',
        borrowedBooks: [
          { book: 'mockBookId1', borrowedDate: new Date('2023-01-01') },
          { book: 'mockBookId2', borrowedDate: new Date('2023-02-01') },
        ],
      }

      const memberRepository = new MemberRepositoryMongoose()

      jest.spyOn(memberRepository, 'save').mockResolvedValueOnce(mockMember)

      const borrowedBookIndexToRemove = 1

      await memberRepository.removeBorrowedBooks(mockMember, borrowedBookIndexToRemove)

      expect(mockMember.borrowedBooks.length).toBe(1)
      expect(mockMember.borrowedBooks[0].book).toBe('mockBookId1')
      expect(memberRepository.save).toHaveBeenCalledWith(mockMember)
    })
  })

  describe('isBookNotBorrowed method', () => {
    it('should throw InvariantError if borrowedBookIndex is -1', async () => {
      const borrowedBookIndex = -1

      const memberRepository = new MemberRepositoryMongoose()

      let error

      try {
        await memberRepository.isBookNotBorrowed(borrowedBookIndex)
      } catch (e) {
        error = e
      }

      expect(error).toBeInstanceOf(InvariantError)
      expect(error.message).toBe('The book was not borrowed by this member')
    })

    it('should return true if borrowedBookIndex is not -1', async () => {
      const borrowedBookIndex = 1

      const memberRepository = new MemberRepositoryMongoose()

      const result = await memberRepository.isBookNotBorrowed(borrowedBookIndex)

      expect(result).toBe(true)
    })
  })
})
