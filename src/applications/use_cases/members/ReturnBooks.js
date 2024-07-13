/* istanbul ignore file */
const NotFoundError = require('../../../commons/errors/NotFoundError')
const InvariantError = require('../../../commons/errors/InvariantError')

class ReturnBooks {
  constructor(memberRepository, bookRepository) {
    this._memberRepository = memberRepository
    this._bookRepository = bookRepository
  }

  async execute(memberId, bookId) {
    let message = 'Book returned successfully'

    const member = await this._memberRepository.findOne(memberId)
    if (!member) {
      throw new NotFoundError('Member not found')
    }

    const book = await this._bookRepository.findOne(bookId)
    if (!book) {
      throw new NotFoundError('Book not found')
    }

    const borrowedBookIndex = member.borrowedBooks.findIndex((borrowedBook) => borrowedBook.book.equals(book._id))
    if (borrowedBookIndex === -1) {
      throw new InvariantError('The book was not borrowed by this member')
    }

    const borrowedDate = member.borrowedBooks[borrowedBookIndex].borrowedDate
    const currentDate = new Date()
    const penaltyDays = 3
    const returnDeadline = new Date(borrowedDate)
    returnDeadline.setDate(returnDeadline.getDate() + 7)

    if (currentDate > returnDeadline) {
      member.penaltyEndDate = new Date(currentDate.setDate(currentDate.getDate() + penaltyDays))
      message = 'Book returned successfully with penalty'
    }

    const session = await this._memberRepository.startSession()

    try {
      session.startTransaction()

      book.stock += 1
      member.borrowedBooks.splice(borrowedBookIndex, 1)

      await this._bookRepository.save(book)
      await this._memberRepository.save(member)

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }

    return message
  }
}

module.exports = ReturnBooks
