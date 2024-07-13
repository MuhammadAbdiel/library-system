/* istanbul ignore file */
const NotFoundError = require('../../../commons/errors/NotFoundError')
const InvariantError = require('../../../commons/errors/InvariantError')

class BorrowBooks {
  constructor(memberRepository, bookRepository) {
    this._memberRepository = memberRepository
    this._bookRepository = bookRepository
  }

  async execute(memberId, bookId) {
    const member = await this._memberRepository.findOne(memberId)
    if (!member) {
      throw new NotFoundError('Member not found')
    }

    if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
      throw new InvariantError('Member is currently penalized')
    }

    if (member.borrowedBooks.length >= 2) {
      throw new InvariantError('Member cannot borrow more than 2 books')
    }

    const book = await this._bookRepository.findOne(bookId)
    if (!book) {
      throw new NotFoundError('Book not found')
    }

    if (book.stock <= 0) {
      throw new InvariantError('Book is already borrowed by another member')
    }

    const session = await this._memberRepository.startSession()

    try {
      session.startTransaction()

      book.stock -= 1

      member.borrowedBooks.push({
        book: book._id,
        borrowedDate: new Date(),
      })

      await this._bookRepository.save(book)
      await this._memberRepository.save(member)

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }

    return 'Book borrowed successfully'
  }
}

module.exports = BorrowBooks
