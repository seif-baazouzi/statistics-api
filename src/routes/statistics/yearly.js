const express = require("express")
const statistics = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")
const { isValidDate, getYearMonths } = require("../../utils/date-functions")

statistics.get("/:collectionID/:date", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const date = req.params.date

    // check date
    if(!isValidDate(date)) {
      res.json({ date: "Invalid Date" })
      return
    }

    const months = getYearMonths(date)
    
    // get statistics
    const statistics = {}
    for(const month of months) {
      const { startingDate, endingDate } = month

      const { rows } = await db.query(
        "SELECT label, sum(value) FROM logs WHERE collectionID = $1 AND logDate >= $2 AND logDate <= $3 GROUP BY label",
        [ req.params.collectionID, startingDate, endingDate ]
      )

      statistics[month.number] = rows
    }

    res.json({ statistics })
  })
})

module.exports = statistics
