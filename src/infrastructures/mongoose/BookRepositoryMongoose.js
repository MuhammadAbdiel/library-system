const BookRepository = require('../../domains/BookRepository')
const BookModel = require('../databases/models/BookModel')
const { NotFoundError, InvariantError } = require('../../commons/errors')

class BookRepositoryMongoose extends BookRepository {
  async findOne(id) {
    const book = await BookModel.findOne({ _id: id })
    if (!book) {
      throw new NotFoundError('Book not found')
    }

    return book
  }

  async findAll() {
    return await BookModel.find({ stock: { $gte: 1 } })
  }

  async isBookAvailable(book) {
    const bookInStock = await BookModel.findOne({ _id: book._id, stock: { $gte: 1 } })
    if (!bookInStock || book.stock <= 0) {
      throw new InvariantError('Book is already borrowed by another member')
    }

    return true
  }

  async decreaseStock(book) {
    const newStock = book.stock - 1
    return await BookModel.updateOne({ _id: book._id }, { $set: { stock: newStock } })
  }

  async increaseStock(book) {
    const newStock = book.stock + 1
    return await BookModel.updateOne({ _id: book._id }, { $set: { stock: newStock } })
  }

  async save(book) {
    await book.save()
  }
}

module.exports = BookRepositoryMongoose
