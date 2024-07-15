class GetAllMember {
  constructor(payload) {
    this._verifyPayload(payload)

    const { _id, code, name, borrowedBooks, penaltyEndDate } = payload
    this._id = _id
    this.code = code
    this.name = name
    this.borrowedBooks = borrowedBooks
    this.penaltyEndDate = penaltyEndDate
  }

  _verifyPayload({ _id, code, name, borrowedBooks, penaltyEndDate }) {
    if (!_id || !code || !name || borrowedBooks < 0 || !penaltyEndDate) {
      throw new Error('GET_ALL_MEMBER.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof code !== 'string' || typeof name !== 'string') {
      throw new Error('GET_ALL_MEMBER.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = GetAllMember
