const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/logs-tests")

logs.get("/:collectionName", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const { rows } = await db.query(
      "SELECT logID, label, value, logDate FROM logs WHERE collectionName = $1",
      [ req.params.collectionName ]
    )

    res.json({ logs: rows })
  })
})

module.exports = logs
