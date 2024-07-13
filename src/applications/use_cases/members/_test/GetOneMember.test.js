const GetOneMember = require('../GetOneMember')
const MemberRepository = require('../../../../domains/MemberRepository')

describe('GetOneMember', () => {
  let getMember
  let mockMemberRepository

  beforeEach(() => {
    mockMemberRepository = new MemberRepository()
    mockMemberRepository.findOne = jest.fn()
    getMember = new GetOneMember(mockMemberRepository)
  })

  it('should get one member', async () => {
    await getMember.execute()
    expect(mockMemberRepository.findOne).toHaveBeenCalled()
  })
})
