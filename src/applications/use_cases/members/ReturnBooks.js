class ReturnBooks {
  constructor(memberRepository, bookRepository) {
    this._memberRepository = memberRepository
    this._bookRepository = bookRepository
  }

  async execute(memberId, bookId) {
    let message = 'Book returned successfully'

    const member = await this._memberRepository.findOne(memberId)
    const book = await this._bookRepository.findOne(bookId)

    const borrowedBookIndex = member.borrowedBooks.findIndex((borrowedBook) => borrowedBook.book == bookId)

    await this._memberRepository.isBookNotBorrowed(borrowedBookIndex)
    const isPenalized = await this._memberRepository.isPenalized(member, borrowedBookIndex)
    if (isPenalized) {
      message = 'Book returned successfully with penalty'
    }

    const session = await this._memberRepository.startSession()

    try {
      session.startTransaction()

      await this._bookRepository.increaseStock(book)
      await this._memberRepository.removeBorrowedBooks(member, borrowedBookIndex)

      await session.commitTransaction()
    } catch (error) {
      /* istanbul ignore next */
      await session.abortTransaction()
      /* istanbul ignore next */
      throw error
    } finally {
      session.endSession()
    }

    return message
  }
}

module.exports = ReturnBooks
