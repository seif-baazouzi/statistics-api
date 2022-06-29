const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkLog } = require("../../utils/logs-tests")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")

logs.post("/:collectionID", tokens.auth(), checkCollectionOwner(), checkParams([ "label", "value" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { label, value } = req.body
    const { isValid, errors } = await checkLog(label, value)
    
    // return errors
    if(!isValid) return res.json(errors)

    // insert log
    const { rows } = await db.query(
      "INSERT INTO logs (label, value, collectionID) VALUES ($1, $2, $3) RETURNING logID",
      [ label, value, req.params.collectionID ]
    )
    
    res.json({ message: "success", logID: rows[0].logid })
  })
})

module.exports = logs
