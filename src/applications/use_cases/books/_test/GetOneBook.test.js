const GetOneBook = require('../GetOneBook')
const BookRepository = require('../../../../domains/BookRepository')

describe('GetOneBook', () => {
  let getBook
  let mockBookRepository

  beforeEach(() => {
    mockBookRepository = new BookRepository()
    mockBookRepository.findOne = jest.fn()
    getBook = new GetOneBook(mockBookRepository)
  })

  it('should get one book', async () => {
    await getBook.execute()
    expect(mockBookRepository.findOne).toHaveBeenCalled()
  })
})
