const GetAllBooks = require('../../../../../applications/use_cases/books/GetAllBooks')
const GetOneBook = require('../../../../../applications/use_cases/books/GetOneBook')

class BookController {
  constructor(bookRepository) {
    this._getAllBooks = new GetAllBooks(bookRepository)
    this._getOneBook = new GetOneBook(bookRepository)
  }

  async index(req, res, next) {
    try {
      const books = await this._getAllBooks.execute()
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        data: books,
      })
    } catch (error) {
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params
      const book = await this._getOneBook.findOne(id)
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        data: book,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController
