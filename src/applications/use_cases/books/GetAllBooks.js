class GetAllBooks {
  constructor(bookRepository) {
    this._bookRepository = bookRepository
  }

  async execute() {
    return await this._bookRepository.findAll()
  }
}

module.exports = GetAllBooks
