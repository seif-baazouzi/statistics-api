const express = require("express")
const settings = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkUpdateEmail } = require("../../utils/settings-tests")

settings.patch("/", tokens.auth(), checkParams([ "newEmail", "password" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { email, newEmail, password } = req.body
    const { isValid, errors } = await checkUpdateEmail(email, newEmail, password)
    
    // return errors
    if(!isValid) return res.json(errors)

    // update name
    await db.query(
      "UPDATE users SET email = $1 WHERE email = $2",
      [ newEmail, email ]
    )
    
    res.json({ message: "success", token: tokens.get(newEmail) })
  })
})

module.exports = settings
