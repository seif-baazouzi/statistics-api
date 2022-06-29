const express = require("express")
const statistics = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")
const { isValidDate, getStartingAndEndingMonth } = require("../../utils/date-functions")

statistics.get("/:collectionID/:date", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const date = req.params.date

    // check date
    if(!isValidDate(date)) {
      res.json({ date: "Invalid Date" })
      return
    }

    const [ startingDate, endingDate ] = getStartingAndEndingMonth(date)

    // get statistics
    const { rows } = await db.query(
      "SELECT label, sum(value) FROM logs WHERE collectionID = $1 AND logDate >= $2 AND logDate <= $3 GROUP BY label",
      [ req.params.collectionID, startingDate, endingDate ]
    )

    res.json({ statistics: rows })
  })
})

module.exports = statistics
