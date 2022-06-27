const express = require("express")
const auth = express.Router()

const tokens = require("../../utils/tokens")

auth.get("/", tokens.auth(), async (req, res) => {
  res.json({ "message": "success", email: req.email })
})

module.exports = auth
