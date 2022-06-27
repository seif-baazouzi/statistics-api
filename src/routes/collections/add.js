const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkCollection } = require("../../utils/collection-tests")

collection.post("/", tokens.auth(), checkParams([ "collectionName" ]), (req, res) => {
  trycatch(req, res, async () => {
    const collectionName = req.body.collectionName.trim()
    const { isValid, errors } = await checkCollection(collectionName)
    
    // return errors
    if(!isValid) return res.json(errors)

    // insert collection
    await db.query(
      "INSERT INTO collections VALUES ($1, $2)",
      [ collectionName, req.body.email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = collection
