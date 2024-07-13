const BookController = require('../controller')
const GetAllBooks = require('../../../../../../applications/use_cases/books/GetAllBooks')
const GetOneBook = require('../../../../../../applications/use_cases/books/GetOneBook')

jest.mock('../../../../../../applications/use_cases/books/GetAllBooks', () => {
  return jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([
      { _id: 1, code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 },
      { _id: 2, code: 'BK-02', title: 'Book 2', author: 'Author 2', stock: 1 },
    ]),
  }))
})

jest.mock('../../../../../../applications/use_cases/books/GetOneBook', () => {
  return jest.fn().mockImplementation(() => ({
    findOne: jest.fn().mockResolvedValue({ _id: 1, code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 }),
  }))
})

describe('BookController', () => {
  let bookController

  beforeEach(() => {
    const mockBookRepository = {}
    const getAllBooks = new GetAllBooks(mockBookRepository)
    const getOneBook = new GetOneBook(mockBookRepository)
    bookController = new BookController(mockBookRepository)
    bookController._getAllBooks = getAllBooks
    bookController._getOneBook = getOneBook
  })

  describe('index method', () => {
    it('should return a list of books with status 200', async () => {
      const req = {}
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await bookController.index(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        data: [
          { _id: 1, code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 },
          { _id: 2, code: 'BK-02', title: 'Book 2', author: 'Author 2', stock: 1 },
        ],
      })
    })

    it('should call next with error if getAllBooks throws an error', async () => {
      const mockError = new Error('Failed to fetch books')
      bookController._getAllBooks.execute.mockRejectedValueOnce(mockError)

      const req = {}
      const res = {}
      const next = jest.fn()

      await bookController.index(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  describe('show method', () => {
    it('should return a book with status 200', async () => {
      const req = { params: { _id: 1 } }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()

      await bookController.show(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        status: 'ok',
        data: { _id: 1, code: 'BK-01', title: 'Book 1', author: 'Author 1', stock: 1 },
      })
    })

    it('should call next with error if getOneBook throws an error', async () => {
      const mockError = new Error('Failed to fetch book')
      bookController._getOneBook.findOne.mockRejectedValueOnce(mockError)

      const req = { params: { _id: 1 } }
      const res = {}
      const next = jest.fn()

      await bookController.show(req, res, next)

      expect(next).toHaveBeenCalledWith(mockError)
    })
  })
})
