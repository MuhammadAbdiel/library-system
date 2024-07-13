const Members = require('../Members')

describe('Members Entity', () => {
  it('should create a member entity', () => {
    const member = new Members({ _id: '1', code: '123', name: 'John Doe' })
    expect(member).toEqual({
      _id: '1',
      code: '123',
      name: 'John Doe',
    })
  })
})
