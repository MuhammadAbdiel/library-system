const MemberRepository = require('../../domains/MemberRepository')
const MemberModel = require('../databases/models/MemberModel')
const { NotFoundError, InvariantError } = require('../../commons/errors')

class MemberRepositoryMongoose extends MemberRepository {
  async findOne(id) {
    const member = await MemberModel.findOne({ _id: id })
    if (!member) {
      throw new NotFoundError('Member not found')
    }

    return member
  }

  async findAll() {
    return await MemberModel.find().populate({
      path: 'borrowedBooks',
      select: 'book borrowedDate',
      populate: { path: 'book', select: 'code title author' },
    })
  }

  async isNotPenalized(member) {
    const penaltyEndDate = member.penaltyEndDate
    if (penaltyEndDate && penaltyEndDate > new Date()) {
      throw new InvariantError('Member is currently penalized')
    }

    return true
  }

  async isAbleToBorrow(member) {
    if (member.borrowedBooks.length >= 2) {
      throw new InvariantError('Member cannot borrow more than 2 books')
    }

    return true
  }

  async updateBorrowedBooks(member, bookId) {
    member.borrowedBooks.push({ book: bookId, borrowedDate: new Date() })

    return await this.save(member)
  }

  async isBookNotBorrowed(borrowedBookIndex) {
    if (borrowedBookIndex === -1) {
      throw new InvariantError('The book was not borrowed by this member')
    }

    return true
  }

  async isPenalized(member, borrowedBookIndex) {
    const borrowedDate = member.borrowedBooks[borrowedBookIndex].borrowedDate
    const currentDate = new Date()
    const penaltyDays = 3
    const returnDeadline = new Date(borrowedDate)
    returnDeadline.setDate(returnDeadline.getDate() + 7)

    if (currentDate > returnDeadline) {
      member.penaltyEndDate = new Date(currentDate.setDate(currentDate.getDate() + penaltyDays))

      return true
    }

    return false
  }

  async removeBorrowedBooks(member, borrowedBookIndex) {
    member.borrowedBooks.splice(borrowedBookIndex, 1)

    return await this.save(member)
  }

  async save(member) {
    await member.save()
  }

  async startSession() {
    return await MemberModel.startSession()
  }
}

module.exports = MemberRepositoryMongoose
