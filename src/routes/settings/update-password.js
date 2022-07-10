const express = require("express")
const settings = express.Router()

const bcrypt = require("bcrypt")

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkUpdatePassword } = require("../../utils/settings-tests")

settings.patch("/", tokens.auth(), checkParams([ "newPassword", "password" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { email, newPassword, password } = req.body
    const { isValid, errors } = await checkUpdatePassword(email, password, newPassword)
    
    // return errors
    if(!isValid) return res.json(errors)

    // hash the password
    const hash = await bcrypt.hash(newPassword, 10)

    // update name
    await db.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [ hash, email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = settings
