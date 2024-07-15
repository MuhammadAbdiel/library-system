class GetAllBook {
  constructor(payload) {
    this._verifyPayload(payload)

    const { _id, code, title, author, stock } = payload
    this._id = _id
    this.code = code
    this.title = title
    this.author = author
    this.stock = stock
  }

  _verifyPayload({ _id, code, title, author, stock }) {
    if (!_id || !code || !title || !author || !stock) {
      throw new Error('GET_ALL_BOOK.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof code !== 'string' || typeof title !== 'string' || typeof author !== 'string' || typeof stock !== 'number') {
      throw new Error('GET_ALL_BOOK.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = GetAllBook
