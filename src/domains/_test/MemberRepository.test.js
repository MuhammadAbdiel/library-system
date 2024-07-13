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
