const express = require("express")
const statistics = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")
const { isValidDate, getStartingAndEndingMonth, datesRange } = require("../../utils/date-functions")

statistics.get("/:collectionID/:date", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const date = req.params.date

    // check date
    if(!isValidDate(date)) {
      res.json({ date: "Invalid Date" })
      return
    }

    const [ startingDate, endingDate ] = getStartingAndEndingMonth(date)
    const datesList = datesRange(startingDate, endingDate)
    console.log(datesList);
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
