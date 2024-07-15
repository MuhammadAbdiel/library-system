const GetAllBook = require('../../../domains/entities/GetAllBook')

class GetAllBooks {
  constructor(bookRepository) {
    this._bookRepository = bookRepository
  }

  async execute() {
    const books = await this._bookRepository.findAll()

    return books.map(
      (book) =>
        new GetAllBook({
          _id: book._id,
          code: book.code,
          title: book.title,
          author: book.author,
          stock: book.stock,
        }),
    )
  }
}

module.exports = GetAllBooks
