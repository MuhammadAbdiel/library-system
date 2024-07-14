const BookRepositoryMongoose = require('../BookRepositoryMongoose')
const BookModel = require('../../databases/models/BookModel')
const { NotFoundError, InvariantError } = require('../../../commons/errors')

// Mocking the BookModel methods
jest.mock('../../databases/models/BookModel', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  decreaseStock: jest.fn(),
  increaseStock: jest.fn(),
  updateOne: jest.fn(),
  save: jest.fn(),
}))

describe('BookRepositoryMongoose', () => {
  let bookRepository

  beforeEach(() => {
    bookRepository = new BookRepositoryMongoose()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne method', () => {
    it('should find one Book by id', async () => {
      const mockBook = { _id: 'mockId', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }
      BookModel.findOne.mockResolvedValue(mockBook)

      const BookId = 'mockId'
      const result = await bookRepository.findOne(BookId)

      expect(result).toEqual(mockBook)
      expect(BookModel.findOne).toHaveBeenCalledWith({ _id: BookId })
    })

    it('should throw NotFoundError if Book not found', async () => {
      BookModel.findOne.mockResolvedValue(null)

      const BookId = 'nonExistingId'

      await expect(bookRepository.findOne(BookId)).rejects.toThrow(NotFoundError)
      expect(BookModel.findOne).toHaveBeenCalledWith({ _id: BookId })
    })
  })

  describe('findAll method', () => {
    it('should find all Books', async () => {
      const mockBooks = [
        { _id: 'mockId1', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 },
        { _id: 'mockId2', code: 'BK-02', title: 'Book 2', author: 'Author 2', stock: 2 },
      ]
      BookModel.find.mockResolvedValue(mockBooks)
      const result = await bookRepository.findAll()

      expect(result).toEqual(mockBooks)
      expect(BookModel.find).toHaveBeenCalled()
    })
  })

  describe('isBookAvailable method', () => {
    it('should return true if Book is available', async () => {
      const mockBook = { _id: 'mockId', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }
      BookModel.findOne.mockResolvedValue(mockBook)

      const result = await bookRepository.isBookAvailable(mockBook)

      expect(result).toBe(true)
    })

    it('should throw InvariantError if Book not found', async () => {
      BookModel.findOne.mockResolvedValue(null)

      const mockBook = { _id: 'mockId', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }

      await expect(bookRepository.isBookAvailable(mockBook)).rejects.toThrow(InvariantError)
    })
  })

  describe('decreaseStock method', () => {
    it('should update Book stock', async () => {
      const mockBook = { _id: 'mockId', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }
      const mockUpdateResult = { modifiedCount: 1 }

      BookModel.decreaseStock.mockResolvedValue(mockUpdateResult)
      await bookRepository.decreaseStock(mockBook)

      expect(BookModel.updateOne).toHaveBeenCalledWith({ _id: mockBook._id }, { $set: { stock: mockBook.stock - 1 } })
    })
  })

  describe('increaseStock method', () => {
    it('should update Book stock', async () => {
      const mockBook = { _id: 'mockId', code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }
      const mockUpdateResult = { modifiedCount: 1 }

      BookModel.increaseStock.mockResolvedValue(mockUpdateResult)
      await bookRepository.increaseStock(mockBook)

      expect(BookModel.updateOne).toHaveBeenCalledWith({ _id: mockBook._id }, { $set: { stock: mockBook.stock + 1 } })
    })
  })

  describe('save method', () => {
    it('should call save method on the member object', async () => {
      const mockBook = {
        save: jest.fn().mockResolvedValue(true),
      }

      await bookRepository.save(mockBook)

      expect(mockBook.save).toHaveBeenCalled()
    })

    it('should handle save method throwing an error', async () => {
      const mockBook = {
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }

      await expect(bookRepository.save(mockBook)).rejects.toThrow('Save failed')
    })
  })
})
