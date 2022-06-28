const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/logs-tests")

logs.delete("/:collectionName/:logID", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const { collectionName, logID } = req.params

    // delete log
    const { rows } = await db.query(
      "DELETE FROM logs WHERE collectionName = $1 AND logID = $2",
      [ collectionName, logID ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = logs
