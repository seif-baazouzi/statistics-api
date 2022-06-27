const express = require("express")
const login = express.Router()

const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkLogin } = require("../../utils/auth-tests")

login.post("/", checkParams(["email", "password"]), (req, res) => {
  trycatch(req, res, async () => {
    const { email, password } = req.body
    const { isValid, id, errors } = await checkLogin(email, password)
    
    // return errors
    if(!isValid) return res.json(errors)
    
    // return the token
    res.json({ token: tokens.get(id) })
  })
})

module.exports = login
