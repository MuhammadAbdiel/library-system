class MemberRepository {
  async findOne(id) {
    throw new Error('Not implemented')
  }

  async findAll() {
    throw new Error('Not implemented')
  }

  async isNotPenalized(member) {
    throw new Error('Not implemented')
  }

  async isAbleToBorrow(member) {
    throw new Error('Not implemented')
  }

  async updateBorrowedBooks(member, bookId) {
    throw new Error('Not implemented')
  }

  async isBookNotBorrowed(borrowedBookIndex) {
    throw new Error('Not implemented')
  }

  async isPenalized(member, borrowedBookIndex) {
    throw new Error('Not implemented')
  }

  async removeBorrowedBooks(member, borrowedBookIndex) {
    throw new Error('Not implemented')
  }

  async save(member) {
    throw new Error('Not implemented')
  }

  async startSession() {
    throw new Error('Not implemented')
  }
}

module.exports = MemberRepository
