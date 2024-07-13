const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library System API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Book code',
            },
            title: {
              type: 'string',
              description: 'Book title',
            },
            author: {
              type: 'string',
              description: 'Book author',
            },
            stock: {
              type: 'integer',
              description: 'Book stock',
            },
          },
          required: ['code', 'title', 'author', 'stock'],
        },
        Member: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Member code',
            },
            name: {
              type: 'string',
              description: 'Member name',
            },
          },
          required: ['code', 'name'],
        },
      },
    },
  },
  apis: ['./src/interfaces/http/api/v1/books/router.js', './src/interfaces/http/api/v1/members/router.js'],
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
