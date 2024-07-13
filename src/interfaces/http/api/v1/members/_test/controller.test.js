const MemberController = require('../controller')
const GetAllMembers = require('../../../../../../applications/use_cases/members/GetAllMembers')
const GetOneMember = require('../../../../../../applications/use_cases/members/GetOneMember')
const BorrowBooks = require('../../../../../../applications/use_cases/members/BorrowBooks')
const ReturnBooks = require('../../../../../../applications/use_cases/members/ReturnBooks')

jest.mock('../../../../../../applications/use_cases/members/GetAllMembers', () => {
  return jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([{ _id: 1, code: 'M001', name: 'John Doe', borrowedBooks: 1 }]),
  }))
})

jest.mock('../../../../../../applications/use_cases/members/GetOneMember', () => {
  return jest.fn().mockImplementation(() => ({
    findOne: jest.fn().mockResolvedValue({ _id: 1, code: 'M001', name: 'John Doe', borrowedBooks: 1 }),
  }))
})

jest.mock('../../../../../../applications/use_cases/members/BorrowBooks', () => {
  return jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue('Book borrowed successfully'),
  }))
})

jest.mock('../../../../../../applications/use_cases/members/ReturnBooks', () => {
  return jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue('Book returned successfully'),
  }))
})

describe('MemberController', () => {
  let memberController

  beforeEach(() => {
    const mockMemberRepository = {}
    const mockBookRepository = {}
    const getAllMembers = new GetAllMembers(mockMemberRepository)
    const getOneMember = new GetOneMember(mockMemberRepository)
    const borrowBooks = new BorrowBooks(mockMemberRepository, mockBookRepository)
    const returnBooks = new ReturnBooks(mockMemberRepository, mockBookRepository)
    memberController = new MemberController(mockMemberRepository, mockBookRepository)
    memberController._getAllMembers = getAllMembers
    memberController._getOneMember = getOneMember
    memberController._borrowBooks = borrowBooks
    memberController._returnBooks = returnBooks
  })

  describe('index method', () => {
    it('should return a list of members with status 200', async () => {
      const req = {}
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await memberController.index(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        data: [{ _id: 1, code: 'M001', name: 'John Doe', borrowedBooks: 1 }],
      })
    })

    it('should call next with error if getAllMembers throws an error', async () => {
      const mockError = new Error('Failed to fetch members')
      memberController._getAllMembers.execute.mockRejectedValueOnce(mockError)

      const req = {}
      const res = {}
      const next = jest.fn()

      await memberController.index(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('show method', () => {
    it('should return a member with status 200', async () => {
      const req = { params: { _id: 1 } }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await memberController.show(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        data: { _id: 1, code: 'M001', name: 'John Doe', borrowedBooks: 1 },
      })
    })

    it('should call next with error if getOneMember throws an error', async () => {
      const mockError = new Error('Failed to fetch Member')
      memberController._getOneMember.findOne.mockRejectedValueOnce(mockError)

      const req = { params: { _id: 1 } }
      const res = {}
      const next = jest.fn()

      await memberController.show(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('borrowBooks method', () => {
    it('should borrow books successfully', async () => {
      const req = {
        body: {
          memberId: 'memberId1',
          bookId: 'bookId1',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await memberController.borrowBooks(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        message: 'Books borrowed successfully',
      })

      expect(memberController._borrowBooks.execute).toHaveBeenCalledWith('memberId1', 'bookId1')

      expect(next).not.toHaveBeenCalled()
    })

    it('should call next with error if borrowBooks throws an error', async () => {
      const mockError = new Error('Failed to borrow books')
      memberController._borrowBooks.execute.mockRejectedValueOnce(mockError)

      const req = {
        body: {
          memberId: 'memberId1',
          bookId: 'bookId1',
        },
      }
      const res = {}
      const next = jest.fn()

      await memberController.borrowBooks(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('returnBooks method', () => {
    it('should return books successfully', async () => {
      const req = {
        body: {
          memberId: 'memberId1',
          bookId: 'bookId1',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await memberController.returnBooks(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        message: 'Book returned successfully',
      })

      expect(memberController._returnBooks.execute).toHaveBeenCalledWith('memberId1', 'bookId1')

      expect(next).not.toHaveBeenCalled()
    })

    it('should call next with error if returnBooks throws an error', async () => {
      const mockError = new Error('Failed to return books')
      memberController._returnBooks.execute.mockRejectedValueOnce(mockError)

      const req = {
        body: {
          memberId: 'memberId1',
          bookId: 'bookId1',
        },
      }
      const res = {}
      const next = jest.fn()

      await memberController.returnBooks(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })
})
