const MemberRepository = require('../MemberRepository')

describe('MemberRepository', () => {
  let memberRepository

  beforeEach(() => {
    memberRepository = new MemberRepository()
  })

  it('should throw an error for findOne method', async () => {
    try {
      await memberRepository.findOne('123')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for findAll method', async () => {
    try {
      await memberRepository.findAll()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for isNotPenalized method', async () => {
    try {
      await memberRepository.isNotPenalized({})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for isAbleToBorrow method', async () => {
    try {
      await memberRepository.isAbleToBorrow({})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for updateBorrowedBooks method', async () => {
    try {
      await memberRepository.updateBorrowedBooks({}, '')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for isBookNotBorrowed method', async () => {
    try {
      await memberRepository.isBookNotBorrowed('')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for isPenalized method', async () => {
    try {
      await memberRepository.isPenalized({}, '')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for removeBorrowedBooks method', async () => {
    try {
      await memberRepository.removeBorrowedBooks({}, '')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for save method', async () => {
    try {
      await memberRepository.save({})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('should throw an error for startSession method', async () => {
    try {
      await memberRepository.startSession()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Not implemented')
    }
  })
})
