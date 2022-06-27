const bcrypt = require("bcrypt")
const db = require("./db")

const emailRegex = () => /^([a-z0-9_]+)((\.[a-z0-9]){0,})@[a-z0-9_]{2,}\.[a-z]{2,}$/gi

async function checkLogin(email, password) {
  const errors = {}

  // check if the fields are empty
  if(email == "") errors.email = "Must not be empty"
  else if(!emailRegex().test(email)) errors.email = "Must be a valid Email"

  if(password == "") errors.password = "Must not be empty"

  // check if there is any errors
  if(Object.keys(errors).length == 2) return { errors, isValid: false }

  // check if the user is exist
  const { rows } = await db.query("SELECT password from users WHERE email = $1", [ email ])
  const user = rows[0]
  if(!user) errors.email = "User not exist"
  
  // check if there is any errors
  if(Object.keys(errors).length) return { errors, isValid: false }

  // check the password
  const result = await bcrypt.compare(password, user.password)
  if(!result) errors.password = "Wrong password"

  return {
    errors,
    id: user._id,
    isValid: Object.keys(errors).length === 0
  }
}

async function checkSignup(name, email, password) {
  const errors = {}

  // check name
  if(name == "") errors.name = "Must not be empty"  

  // check email
  if(email == "") {
    errors.email = "Must not be empty"
  } else if(!emailRegex().test(email)) {
    errors.email = "Must be a valid Email"
  } else {
    const { rows } = await db.query("SELECT password from users WHERE email = $1", [ email ])
    const user = rows[0]
    if(user) errors.email = "Email is already taken"
  }
    
  // check password
  if(password == "") errors.password = "Must not be empty"

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = { checkLogin, checkSignup }
