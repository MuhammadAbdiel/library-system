const GetAllBook = require('../GetAllBook')

describe('GetAllBook Entity', () => {
  it('should throw an error when not contain needed property', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      code: '123',
      title: 'Harry Potter',
      author: 'J.K Rowling',
    }

    // Action and Assert
    expect(() => new GetAllBook(payload)).toThrowError('GET_ALL_BOOK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw an error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      code: 123,
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    }

    // Action and Assert
    expect(() => new GetAllBook(payload)).toThrowError('GET_ALL_BOOK.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create a book entity', () => {
    // Arrange
    const payload = {
      _id: '6222882126f7cc72f30ea0df',
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    }

    // Action
    const getAllBook = new GetAllBook(payload)

    // Assert
    expect(getAllBook.code).toEqual(payload.code)
    expect(getAllBook.title).toEqual(payload.title)
    expect(getAllBook.author).toEqual(payload.author)
    expect(getAllBook.stock).toEqual(payload.stock)
  })
})
