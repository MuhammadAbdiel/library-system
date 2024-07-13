const GetAllMembers = require('../GetAllMembers')

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
        toJSON: () => ({
          id: '1',
          name: 'John Doe',
          borrowedBooks: [{}], // 1 borrowed books
        }),
        borrowedBooks: [{}],
      },
      {
        toJSON: () => ({
          id: '2',
          name: 'Jane Doe',
          borrowedBooks: [{}, {}], // 2 borrowed books
        }),
        borrowedBooks: [{}, {}],
      },
    ]

    mockMemberRepository.findAll.mockResolvedValue(mockMembers)

    const result = await getAllMembers.execute()

    expect(result).toEqual([
      {
        id: '1',
        name: 'John Doe',
        borrowedBooks: 1,
      },
      {
        id: '2',
        name: 'Jane Doe',
        borrowedBooks: 2,
      },
    ])
    expect(mockMemberRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return an empty list if no members are found', async () => {
    mockMemberRepository.findAll.mockResolvedValue([])

    const result = await getAllMembers.execute()

    expect(result).toEqual([])
    expect(mockMemberRepository.findAll).toHaveBeenCalledTimes(1)
  })
})
