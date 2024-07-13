const BookRepository = require('../BookRepository')

describe('BookRepository', () => {
  let bookRepository

  beforeEach(() => {
    bookRepository = new BookRepository()
  })

  it('should throw an error for findOne method', async () => {
    try {
      await bookRepository.findOne('123')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for findAll method', async () => {
    try {
      await bookRepository.findAll()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for save method', async () => {
    try {
      await bookRepository.save({})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })
})
