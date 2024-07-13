/* istanbul ignore file */
const express = require('express')
const BookRepositoryMongoose = require('../../../../../infrastructures/mongoose/BookRepositoryMongoose')
const MemberRepositoryMongoose = require('../../../../../infrastructures/mongoose/MemberRepositoryMongoose')
const MemberController = require('../../v1/members/controller')

const router = express.Router()
const bookRepository = new BookRepositoryMongoose()
const memberRepository = new MemberRepositoryMongoose()
const memberController = new MemberController(bookRepository, memberRepository)

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for members in the library
 */

/**
 * @swagger
 * /api/v1/members:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/members', memberController.index.bind(memberController))

/**
 * @swagger
 * /api/v1/members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: Member ID
 *                 example: 6222882126f7cc72f30ea0df
 *               bookId:
 *                 type: string
 *                 description: Book ID
 *                 example: 62cfe59890e64e9e644d3fb9
 *     responses:
 *       200:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/members/borrow', memberController.borrowBooks.bind(memberController))

/**
 * @swagger
 * /api/v1/members/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: Member ID
 *                 example: 62cfea14e8fed983d5c3a4e7
 *               bookId:
 *                 type: string
 *                 description: Book ID
 *                 example: 62cfe5a790e64e9e644d3fbc
 *     responses:
 *       200:
 *         description: Successfully returned the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/members/return', memberController.returnBooks.bind(memberController))

module.exports = router
