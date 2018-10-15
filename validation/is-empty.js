const isEmpty = value =>
  // Checks if value is undefined or null  
  value === undefined ||
  value === null ||
  // Checks if value is an empty object or string
  (typeof 
    value === 'object' &&
    Object.keys(value).length === 0) ||
  (typeof 
    value === 'string' && 
    value.trim().length === 0);

module.exports = isEmpty;