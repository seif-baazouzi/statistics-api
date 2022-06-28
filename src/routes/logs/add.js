const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkLog, checkCollectionOwner } = require("../../utils/logs-tests")

logs.post("/:collectionName", tokens.auth(), checkCollectionOwner(), checkParams([ "label", "value" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { label, value } = req.body
    const collectionName = req.params.collectionName
    const { isValid, errors } = await checkLog(label, value)
    
    // return errors
    if(!isValid) return res.json(errors)

    // insert log
    const { rows } = await db.query(
      "INSERT INTO logs (label, value, collectionName) VALUES ($1, $2, $3) RETURNING logID",
      [ label, value, collectionName ]
    )
    
    res.json({ message: "success", logID: rows[0].logid })
  })
})

module.exports = logs
