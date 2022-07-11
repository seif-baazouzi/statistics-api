const bcrypt = require("bcrypt")
const db = require("./db")

const emailRegex = () => /^([a-z0-9_]+)((\.[a-z0-9]){0,})@[a-z0-9_]{2,}\.[a-z]{2,}$/gi

async function checkUpdateName(email, name, password) {
  const errors = {}

  // check if the fields are empty
  if(name == "") errors.name = "Must not be empty"
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
    isValid: Object.keys(errors).length === 0
  }
}

async function checkUpdateEmail(email, newEmail, password) {
  const errors = {}

  // check if the fields are empty
  if(newEmail == "") {
    errors.newEmail = "Must not be empty"
  } else if(!emailRegex().test(newEmail)) {
    errors.newEmail = "Must be a valid Email"
  } else {
    const { rows } = await db.query("SELECT password from users WHERE email = $1", [ newEmail ])
    const user = rows[0]
    if(user) errors.newEmail = "Email is already taken"
  }

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
    isValid: Object.keys(errors).length === 0
  }
}

async function checkUpdatePassword(email, password, newPassword) {
  const errors = {}

  // check if the fields are empty
  if(password == "") errors.password = "Must not be empty"
  if(newPassword == "") errors.newPassword = "Must not be empty"

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

  // check if the passwords are the same
  if(password === newPassword) errors.newPassword = "Must not be the same as the old one"

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = { checkUpdateName, checkUpdateEmail, checkUpdatePassword }
