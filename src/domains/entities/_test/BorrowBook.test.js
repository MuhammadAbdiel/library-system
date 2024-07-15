const BorrowBook = require('../BorrowBook')

describe('BorrowBook Entity', () => {
  it('should throw an error when not contain needed property', () => {
    // Arrange
    const payload = {
      bookId: '123',
    }

    // Action and Assert
    expect(() => new BorrowBook(payload)).toThrowError('BORROW_BOOK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw an error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      memberId: 123,
      bookId: '123',
    }

    // Action and Assert
    expect(() => new BorrowBook(payload)).toThrowError('BORROW_BOOK.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw an error when payload not meet data length specification', () => {
    // Arrange
    const payload = {
      memberId: '123',
      bookId: '123',
    }

    // Action and Assert
    expect(() => new BorrowBook(payload)).toThrowError('BORROW_BOOK.NOT_MEET_DATA_LENGTH_SPECIFICATION')
  })

  it('should create BorrowBook object correctly', () => {
    // Arrange
    const payload = {
      memberId: '6222882126f7cc72f30ea0df',
      bookId: '62cfe59890e64e9e644d3fb9',
    }

    // Action
    const borrowBook = new BorrowBook(payload)

    // Assert
    expect(borrowBook).toBeInstanceOf(BorrowBook)
    expect(borrowBook.memberId).toEqual(payload.memberId)
    expect(borrowBook.bookId).toEqual(payload.bookId)
  })
})
