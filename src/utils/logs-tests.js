const db = require("./db")

async function checkLog(label, value) {
  const errors = {}

  // check label
  if(label === "") {
    errors.label = "Must not be empty"
  }
  
  // check value
  if(value === "") {
    errors.value = "Must not be empty"
  } else if(!(/^[0-9]+$/g.test(value))) {
    errors.value = "Must be a valid number"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = { checkLog }
