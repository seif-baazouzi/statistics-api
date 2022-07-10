const express = require("express")
const settings = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkUpdateName } = require("../../utils/settings-tests")

settings.patch("/", tokens.auth(), checkParams([ "name", "password" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { email, name, password } = req.body
    const { isValid, errors } = await checkUpdateName(email, name, password)
    
    // return errors
    if(!isValid) return res.json(errors)

    // update name
    await db.query(
      "UPDATE users SET name = $1 WHERE email = $2",
      [ name, email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = settings
