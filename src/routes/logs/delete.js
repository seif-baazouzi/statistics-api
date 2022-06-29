const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")

logs.delete("/:collectionID/:logID", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const { collectionID, logID } = req.params

    // delete log
    const { rows } = await db.query(
      "DELETE FROM logs WHERE collectionID = $1 AND logID = $2",
      [ collectionID, logID ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = logs
