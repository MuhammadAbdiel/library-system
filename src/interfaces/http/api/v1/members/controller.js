const GetAllMembers = require('../../../../../applications/use_cases/members/GetAllMembers')
const GetOneMember = require('../../../../../applications/use_cases/members/GetOneMember')
const BorrowBooks = require('../../../../../applications/use_cases/members/BorrowBooks')
const ReturnBooks = require('../../../../../applications/use_cases/members/ReturnBooks')

class MemberController {
  constructor(BookRepository, MemberRepository) {
    this._getAllMembers = new GetAllMembers(MemberRepository)
    this._getOneMember = new GetOneMember(MemberRepository)
    this._borrowBooks = new BorrowBooks(MemberRepository, BookRepository)
    this._returnBooks = new ReturnBooks(MemberRepository, BookRepository)
  }

  async index(req, res, next) {
    try {
      const members = await this._getAllMembers.execute()
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        data: members,
      })
    } catch (error) {
      next(error)
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params
      const member = await this._getOneMember.findOne(id)
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        data: member,
      })
    } catch (error) {
      next(error)
    }
  }

  async borrowBooks(req, res, next) {
    try {
      const { memberId, bookId } = req.body
      await this._borrowBooks.execute(memberId, bookId)
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        message: 'Books borrowed successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async returnBooks(req, res, next) {
    try {
      const { memberId, bookId } = req.body
      const result = await this._returnBooks.execute(memberId, bookId)
      res.status(200).json({
        statusCode: 200,
        status: 'ok',
        message: result,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MemberController
