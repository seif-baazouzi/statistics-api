const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkCollection } = require("../../utils/collection-tests")

collection.post("/", tokens.auth(), checkParams([ "collectionName" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { collectionName, email } = req.body
    const { isValid, errors } = await checkCollection(collectionName, email)
    
    // return errors
    if(!isValid) return res.json(errors)
    
    // insert collection
    const { rows } = await db.query(
      "INSERT INTO collections (collectionName, email) VALUES ($1, $2) RETURNING collectionID",
      [ collectionName, email ]
    )
    
    res.json({ message: "success", collectionID: rows[0].collectionid })
  })
})

module.exports = collection
