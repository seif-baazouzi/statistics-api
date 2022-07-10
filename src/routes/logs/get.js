const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")

logs.get("/:collectionID", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const { rows } = await db.query(
      "SELECT logID, label, value, logDate FROM logs WHERE collectionID = $1",
      [ req.params.collectionID ]
    )

    const logs = rows.map(log => ({ logID: log.logid, label: log.label, value: log.value, logDate: log.logdate }))
    
    res.json({ logs })
  })
})

module.exports = logs
