class GetAllMembers {
  constructor(memberRepository) {
    this._memberRepository = memberRepository
  }

  async execute() {
    const members = await this._memberRepository.findAll()

    return members.map((member) => ({
      ...member.toJSON(),
      borrowedBooks: member.borrowedBooks.length,
    }))
  }
}

module.exports = GetAllMembers
