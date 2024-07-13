class GetOneMember {
  constructor(memberRepository) {
    this._memberRepository = memberRepository
  }

  async execute() {
    return await this._memberRepository.findOne()
  }
}

module.exports = GetOneMember
