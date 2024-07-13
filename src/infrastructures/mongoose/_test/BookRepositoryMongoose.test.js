const BookRepositoryMongoose = require('../BookRepositoryMongoose')
const BookModel = require('../../databases/models/BookModel')

// Mocking the BookModel methods
jest.mock('../../databases/models/BookModel', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
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
})
