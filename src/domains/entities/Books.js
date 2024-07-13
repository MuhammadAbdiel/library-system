class Books {
  constructor({ _id, code, title, author, stock }) {
    this._id = _id
    this.code = code
    this.title = title
    this.author = author
    this.stock = stock
  }
}

module.exports = Books
