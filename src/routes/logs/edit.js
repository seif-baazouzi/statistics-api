const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkLog } = require("../../utils/logs-tests")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")

logs.put("/:collectionID/:logID", tokens.auth(), checkCollectionOwner(), checkParams([ "label", "value" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { label, value } = req.body
    const { collectionID, logID } = req.params
    const { isValid, errors } = await checkLog(label, value)
    
    // return errors
    if(!isValid) return res.json(errors)

    // insert log
    const { rows } = await db.query(
      "UPDATE logs SET label = $1, value = $2 WHERE collectionID = $3 AND logID = $4",
      [ label, value, collectionID, logID ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = logs
