const GetAllBooks = require('../GetAllBooks')
const BookRepository = require('../../../../domains/BookRepository')
const GetAllBook = require('../../../../domains/entities/GetAllBook')

describe('GetAllBooks', () => {
  let getBooks
  let mockBookRepository

  beforeEach(() => {
    mockBookRepository = new BookRepository()
    mockBookRepository.findAll = jest.fn()
    getBooks = new GetAllBooks(mockBookRepository)
  })

  it('should get all books', async () => {
    const mockBooks = [
      { _id: '6222882126f7cc72f30ea0df', code: '001', title: 'Book 1', author: 'Author 1', stock: 1 },
      { _id: '6222882126f7cc72f30ea0d1', code: '002', title: 'Book 2', author: 'Author 2', stock: 1 },
    ]

    mockBookRepository.findAll.mockResolvedValue(mockBooks)

    const books = await getBooks.execute()

    expect(mockBookRepository.findAll).toHaveBeenCalled()

    const expectedBooks = mockBooks.map(
      (book) =>
        new GetAllBook({
          _id: book._id,
          code: book.code,
          title: book.title,
          author: book.author,
          stock: book.stock,
        }),
    )

    expect(books).toEqual(expectedBooks)
  })
})
