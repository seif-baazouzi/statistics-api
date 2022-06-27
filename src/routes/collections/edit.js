const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkCollection } = require("../../utils/collection-tests")

collection.put("/:collectionName", tokens.auth(), checkParams([ "newCollectionName" ]), (req, res) => {
  trycatch(req, res, async () => {
    const newCollectionName = req.body.newCollectionName.trim()
    const { isValid, errors } = await checkCollection(newCollectionName)
    
    // return errors
    if(!isValid) return res.json(errors)

    // update collection
    await db.query(
      "UPDATE collections SET collectionName = $1 WHERE collectionName = $2 AND email = $3",
      [ newCollectionName, req.params.collectionName, req.body.email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = collection
