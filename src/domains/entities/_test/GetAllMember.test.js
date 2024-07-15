const GetAllMember = require('../GetAllMember')

describe('GetAllMember Entity', () => {
  it('should throw an error when not contain needed property', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      name: 'John Doe',
      borrowedBooks: 1,
      penaltyEndDate: '2022-01-01',
    }

    // Action and Assert
    expect(() => new GetAllMember(payload)).toThrowError('GET_ALL_MEMBER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw an error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      code: 123,
      name: 'John Doe',
      borrowedBooks: 1,
      penaltyEndDate: '2022-01-01',
    }

    // Action and Assert
    expect(() => new GetAllMember(payload)).toThrowError('GET_ALL_MEMBER.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create GetAllMember object correctly', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      code: '123',
      name: 'John Doe',
      borrowedBooks: 1,
      penaltyEndDate: '2022-01-01',
    }

    // Action
    const getAllMember = new GetAllMember(payload)

    // Assert
    expect(getAllMember.code).toEqual(payload.code)
    expect(getAllMember.name).toEqual(payload.name)
    expect(getAllMember.borrowedBooks).toEqual(payload.borrowedBooks)
    expect(getAllMember.penaltyEndDate).toEqual(payload.penaltyEndDate)
  })
})
