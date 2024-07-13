class GetOneBook {
  constructor(bookRepository) {
    this._bookRepository = bookRepository
  }

  async execute() {
    return await this._bookRepository.findOne()
  }
}

module.exports = GetOneBook
