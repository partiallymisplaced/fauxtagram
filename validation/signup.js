const Validator = require("validator");
const isEmpty = require('./is-empty');

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mobileNumber = !isEmpty(data.mobileNumber) ? data.mobileNumber : '';
  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.username, {min: 1, max: 30})) {
    errors.username = "Your username can be between 1 and 30 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username cannot be empty";
  } 
  if (!Validator.isEmail(data.email)){
    errors.email = "This does not look like a valid email";
  }
  if (Validator.isEmpty(data.username)) {
    errors.email = "Email cannot be empty";
  }
  if (!Validator.isMobilePhone(data.mobileNumber)) {
    errors.mobileNumber = "This does not look like a valid mobile number";
  }
  if (!Validator.isLength(data.password), {min: 6, max: 64}) {
    errors.password = "Your password must be at least 6 characters long";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty"
  }

  return { errors, isValid: isEmpty(errors) }
}