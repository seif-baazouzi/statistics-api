const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")

collection.get("/", tokens.auth(), (req, res) => {
  trycatch(req, res, async () => {
    const { rows } = await db.query(
      "SELECT collectionID, collectionName FROM collections WHERE email = $1",
      [ req.body.email ]
    )
    
    const collections = rows.map(c => ({ collectionID: c.collectionid, collectionName: c.collectionname }))

    res.json({ collections })
  })
})

module.exports = collection
