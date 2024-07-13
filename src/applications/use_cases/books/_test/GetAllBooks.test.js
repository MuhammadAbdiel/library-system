const GetAllBooks = require('../GetAllBooks')
const BookRepository = require('../../../../domains/BookRepository')

describe('GetAllBooks', () => {
  let getBooks
  let mockBookRepository

  beforeEach(() => {
    mockBookRepository = new BookRepository()
    mockBookRepository.findAll = jest.fn()
    getBooks = new GetAllBooks(mockBookRepository)
  })

  it('should get all books', async () => {
    await getBooks.execute()
    expect(mockBookRepository.findAll).toHaveBeenCalled()
  })
})
