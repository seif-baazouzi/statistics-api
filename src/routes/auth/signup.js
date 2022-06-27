const express = require("express")
const signup = express.Router()

const bcrypt = require("bcrypt")

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkSignup } = require("../../utils/auth-tests")

signup.post("/", checkParams(["name", "email", "password"]), (req, res) => {
  trycatch(req, res, async () => {
    const { name, email, password } = req.body
    const { isValid, errors } = await checkSignup(name, email, password)
    
    // return errors
    if(!isValid) return res.json(errors)

    // hash password
    const hash = await bcrypt.hash(password, 10)

    // insert user
    await db.query(
      "INSERT INTO users VALUES ($1, $2, $3)",
      [ email, name, hash ]
    )
    
      res.json({ token: tokens.get(email) })
  })
})

module.exports = signup
