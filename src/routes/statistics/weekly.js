const express = require("express")
const statistics = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")
const { isValidDate, getEndWeek, datesRange } = require("../../utils/date-functions")

statistics.get("/:collectionID/:date", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const startingDate = req.params.date

    // check date
    if(!isValidDate(startingDate)) {
      res.json({ date: "Invalid Date" })
      return
    }

    const endingDate = getEndWeek(startingDate)
    const datesList  = datesRange(startingDate, endingDate)

    // get statistics
    const statistics = {}
    for(const date of datesList) {
      const { rows } = await db.query(
        "SELECT label, sum(value) FROM logs WHERE collectionID = $1 AND logDate >= $2 GROUP BY label",
        [ req.params.collectionID, date ]
      )

      statistics[date] = rows
    }

    res.json({ statistics })
  })
})

module.exports = statistics
