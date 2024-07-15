const GetAllMember = require('../../../domains/entities/GetAllMember')

class GetAllMembers {
  constructor(memberRepository) {
    this._memberRepository = memberRepository
  }

  async execute() {
    const members = await this._memberRepository.findAll()

    return members.map(
      (member) =>
        new GetAllMember({
          _id: member._id,
          code: member.code,
          name: member.name,
          borrowedBooks: member.borrowedBooks.length,
          penaltyEndDate: member.penaltyEndDate,
        }),
    )
  }
}

module.exports = GetAllMembers
