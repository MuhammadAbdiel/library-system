const MemberRepositoryMongoose = require('../MemberRepositoryMongoose')
const MemberModel = require('../../databases/models/MemberModel')

jest.mock('../../databases/models/MemberModel', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
}))

describe('MemberRepositoryMongoose', () => {
  let memberRepository

  beforeEach(() => {
    memberRepository = new MemberRepositoryMongoose()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne method', () => {
    it('should find one member by id', async () => {
      const mockMember = { _id: 'mockId', name: 'John Doe', borrowedBooks: [] }
      MemberModel.findOne.mockResolvedValue(mockMember)

      const memberId = 'mockId'
      const result = await memberRepository.findOne(memberId)

      expect(result).toEqual(mockMember)
      expect(MemberModel.findOne).toHaveBeenCalledWith({ _id: memberId })
    })
  })

  describe('findAll method', () => {
    it('should find all members', async () => {
      const mockMembers = [
        { _id: 'mockId1', name: 'John Doe', borrowedBooks: [] },
        { _id: 'mockId2', name: 'Jane Doe', borrowedBooks: [] },
      ]
      MemberModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockMembers),
      })

      const result = await memberRepository.findAll()

      expect(result).toEqual(mockMembers)
      expect(MemberModel.find).toHaveBeenCalled()
      expect(MemberModel.find().populate).toHaveBeenCalledWith({
        path: 'borrowedBooks',
        select: 'book borrowedDate',
        populate: { path: 'book', select: 'code title author' },
      })
    })
  })
})
