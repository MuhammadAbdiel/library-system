/* istanbul ignore file */
const express = require('express')
const BookRepositoryMongoose = require('../../../../../infrastructures/mongoose/BookRepositoryMongoose')
const BookController = require('../../v1/books/controller')

const router = express.Router()
const bookRepository = new BookRepositoryMongoose()
const bookController = new BookController(bookRepository)

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books in the library
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', bookController.index.bind(bookController))

module.exports = router
