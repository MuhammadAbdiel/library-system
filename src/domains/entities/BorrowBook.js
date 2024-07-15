class BorrowBook {
  constructor(payload) {
    this._verifyPayload(payload)

    const { memberId, bookId } = payload
    this.memberId = memberId
    this.bookId = bookId
  }

  _verifyPayload({ memberId, bookId }) {
    if (!memberId || !bookId) {
      throw new Error('BORROW_BOOK.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof memberId !== 'string' || typeof bookId !== 'string') {
      throw new Error('BORROW_BOOK.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    if (memberId.length !== 24 || bookId.length !== 24) {
      throw new Error('BORROW_BOOK.NOT_MEET_DATA_LENGTH_SPECIFICATION')
    }
  }
}

module.exports = BorrowBook
