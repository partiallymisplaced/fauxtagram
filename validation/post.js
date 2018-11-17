const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.url = !isEmpty(data.url) ? data.url : '';

  if (Validator.isEmpty(data.url)) {
    errors.url = 'url field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};