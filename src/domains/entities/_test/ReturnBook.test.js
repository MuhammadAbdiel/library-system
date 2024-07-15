const ReturnBook = require('../ReturnBook')

describe('ReturnBook Entity', () => {
  it('should throw an error when not contain needed property', () => {
    // Arrange
    const payload = {
      bookId: '123',
    }

    // Action and Assert
    expect(() => new ReturnBook(payload)).toThrowError('RETURN_BOOK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw an error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      memberId: 123,
      bookId: '123',
    }

    // Action and Assert
    expect(() => new ReturnBook(payload)).toThrowError('RETURN_BOOK.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw an error when payload not meet data length specification', () => {
    // Arrange
    const payload = {
      memberId: '123',
      bookId: '123',
    }

    // Action and Assert
    expect(() => new ReturnBook(payload)).toThrowError('RETURN_BOOK.NOT_MEET_DATA_LENGTH_SPECIFICATION')
  })

  it('should create ReturnBook object correctly', () => {
    // Arrange
    const payload = {
      memberId: '6222882126f7cc72f30ea0df',
      bookId: '62cfe59890e64e9e644d3fb9',
    }

    // Action
    const returnBook = new ReturnBook(payload)

    // Assert
    expect(returnBook).toBeInstanceOf(ReturnBook)
    expect(returnBook.memberId).toEqual(payload.memberId)
    expect(returnBook.bookId).toEqual(payload.bookId)
  })
})
