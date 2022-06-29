const express = require("express")
const collection = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const checkParams = require("../../utils/check-params")
const { checkCollection } = require("../../utils/collection-tests")

collection.put("/:collectionID", tokens.auth(), checkParams([ "newCollectionName" ]), (req, res) => {
  trycatch(req, res, async () => {
    const { newCollectionName, email } = req.body
    const { isValid, errors } = await checkCollection(newCollectionName, email)
    
    // return errors
    if(!isValid) return res.json(errors)

    // update collection
    await db.query(
      "UPDATE collections SET collectionName = $1 WHERE collectionID = $2 AND email = $3",
      [ newCollectionName, req.params.collectionID, email ]
    )
    
    res.json({ message: "success" })
  })
})

module.exports = collection
