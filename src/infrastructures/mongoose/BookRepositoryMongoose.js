const BookRepository = require('../../domains/BookRepository')
const BookModel = require('../databases/models/BookModel')

class BookRepositoryMongoose extends BookRepository {
  async findOne(id) {
    return await BookModel.findOne({ _id: id })
  }

  async findAll() {
    return await BookModel.find({ stock: { $gte: 1 } })
  }

  /* istanbul ignore next */
  async save(book) {
    /* istanbul ignore next */
    await book.save()
  }
}

module.exports = BookRepositoryMongoose
