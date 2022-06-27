const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")

collection.delete("/:collectionName", tokens.auth(), (req, res) => {
  trycatch(req, res, async () => {
    // delete collection
    await db.query(
      "DELETE FROM collections WHERE collectionName = $1 AND email = $2",
      [ req.params.collectionName, req.body.email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = collection
