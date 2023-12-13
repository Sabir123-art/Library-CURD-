const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 150,
    validate: {
      validator: function(value) {
        return /^[A-Z].*/.test(value);
      },
      message: props => `${props.value} Title start with a capital letter!`
    }
  },
  author: {
    type: String,
    required: true,
    maxLength: 100,
    validate: {
      validator: function(value) {
        return /^[A-Z].*/.test(value);
      },
      message: props => `${props.value} Auther Name start with a capital letter!`
    }
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
    // validate: {
    //   validator: function(value) {
    //     return /^[A-Z].*/.test(value);
    //   },
    //   message: props => `${props.value} Description start with a capital letter!`
    // }
  },
  year: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  generatedId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      const { title, author, description, year } = this;
      const yearLastDigits = year.toString().slice(-2);
      const hash = crypto.createHash('sha1').update(`${title}${author}${description}${yearLastDigits}`).digest('hex');
      const generatedId = parseInt(hash.substring(0, 8), 16).toString().slice(0, 8);
      return generatedId;
    },
    message: props => `${props.value} Year can't be blank!`
  }
});
bookSchema.pre('save', function(next) {
  const requiredFields = ['Title', 'Author','Description', 'Year'];

  for (const field of requiredFields) {
    if (!this[field]) {
      const error = new Error(`${field} can't be blank.`);
      error.validationError = true;
      error.field = field;
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
