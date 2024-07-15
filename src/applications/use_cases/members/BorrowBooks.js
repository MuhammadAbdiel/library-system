const BorrowBook = require('../../../domains/entities/BorrowBook')

class BorrowBooks {
  constructor(memberRepository, bookRepository) {
    this._memberRepository = memberRepository
    this._bookRepository = bookRepository
  }

  async execute(memberId, bookId) {
    const borrowBook = new BorrowBook({ memberId, bookId })

    const member = await this._memberRepository.findOne(borrowBook.memberId)

    await this._memberRepository.isNotPenalized(member)
    await this._memberRepository.isAbleToBorrow(member)

    const book = await this._bookRepository.findOne(borrowBook.bookId)

    await this._bookRepository.isBookAvailable(book)

    const session = await this._memberRepository.startSession()

    try {
      session.startTransaction()

      await this._bookRepository.decreaseStock(book)
      await this._memberRepository.updateBorrowedBooks(member, book._id)

      await session.commitTransaction()
    } catch (error) {
      /* istanbul ignore next */
      await session.abortTransaction()
      /* istanbul ignore next */
      throw error
    } finally {
      session.endSession()
    }

    return 'Book borrowed successfully'
  }
}

module.exports = BorrowBooks
