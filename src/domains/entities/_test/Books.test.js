const Books = require('../Books')

describe('Books Entity', () => {
  it('should create a book entity', () => {
    const bookData = { code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1 }
    const books = new Books(bookData)

    expect(books.code).toBe(bookData.code)
    expect(books.title).toBe(bookData.title)
    expect(books.author).toBe(bookData.author)
    expect(books.stock).toBe(bookData.stock)
  })
})
