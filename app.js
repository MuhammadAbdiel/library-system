/* istanbul ignore file */
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const swaggerSetup = require('./swagger')
const connectDB = require('./src/infrastructures/databases/index')
const bookRouter = require('./src/interfaces/http/api/v1/books/router')
const memberRouter = require('./src/interfaces/http/api/v1/members/router')
const errorHandler = require('./src/commons/middlewares/ErrorHandler')
const notFound = require('./src/commons/middlewares/NotFound')

dotenv.config()

const app = express()
const v1 = 'api/v1'

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Connect to database
connectDB()

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    status: 'ok',
    message: 'Welcome to the API',
  })
})
app.use(`/${v1}`, bookRouter)
app.use(`/${v1}`, memberRouter)

swaggerSetup(app)

// Middlewares
app.use(notFound)
app.use(errorHandler)

module.exports = app
