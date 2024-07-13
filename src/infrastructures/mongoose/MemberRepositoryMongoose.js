const MemberRepository = require('../../domains/MemberRepository')
const MemberModel = require('../databases/models/MemberModel')

class MemberRepositoryMongoose extends MemberRepository {
  async findOne(id) {
    return await MemberModel.findOne({ _id: id })
  }

  async findAll() {
    return await MemberModel.find().populate({
      path: 'borrowedBooks',
      select: 'book borrowedDate',
      populate: { path: 'book', select: 'code title author' },
    })
  }

  /* istanbul ignore next */
  async save(member) {
    /* istanbul ignore next */
    await member.save()
  }

  /* istanbul ignore next */
  async startSession() {
    /* istanbul ignore next */
    return await MemberModel.startSession()
  }
}

module.exports = MemberRepositoryMongoose
