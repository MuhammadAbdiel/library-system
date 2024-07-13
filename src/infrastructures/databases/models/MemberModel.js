/* istanbul ignore file */
const mongoose = require('mongoose')

const borrowedBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrowedDate: {
    type: Date,
    required: true,
  },
})

const memberSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    borrowedBooks: [borrowedBookSchema],
    penaltyEndDate: {
      type: Date,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Member', memberSchema)
