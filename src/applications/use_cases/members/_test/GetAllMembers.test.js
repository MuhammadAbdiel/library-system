const GetAllMembers = require('../GetAllMembers')
const GetAllMember = require('../../../../domains/entities/GetAllMember')

describe('GetAllMembers', () => {
  let getAllMembers
  let mockMemberRepository

  beforeEach(() => {
    mockMemberRepository = {
      findAll: jest.fn(),
    }
    getAllMembers = new GetAllMembers(mockMemberRepository)
  })

  it('should return a list of members with the count of borrowed books', async () => {
    const mockMembers = [
      {
        _id: '1',
        code: '001',
        name: 'John Doe',
        borrowedBooks: 1,
        penaltyEndDate: new Date().toISOString(),
      },
      {
        _id: '2',
        code: '002',
        name: 'Jane Doe',
        borrowedBooks: 2,
        penaltyEndDate: new Date().toISOString(),
      },
    ]

    mockMemberRepository.findAll.mockResolvedValue(mockMembers)

    const result = await getAllMembers.execute()

    const expectedMembers = mockMembers.map(
      (member) =>
        new GetAllMember({
          _id: member._id,
          code: member.code,
          name: member.name,
          borrowedBooks: member.borrowedBooks.length,
          penaltyEndDate: member.penaltyEndDate,
        }),
    )

    expect(result).toEqual(expectedMembers)
    expect(mockMemberRepository.findAll).toHaveBeenCalledTimes(1)
  })
})
