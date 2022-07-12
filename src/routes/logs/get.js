const express = require("express")
const logs = express.Router()

const db = require("../../utils/db")
const tokens = require("../../utils/tokens")
const trycatch = require("../../utils/try-catch")
const { checkCollectionOwner } = require("../../utils/check-collection-owner")

logs.get("/:collectionID", tokens.auth(), checkCollectionOwner(), (req, res) => {
  trycatch(req, res, async () => {
    const page = req.query.page ?? 1;
    
    const limit = 20;
    const offset = limit * (page -1);

    // get pages

    const { rows: pagesRow } = await db.query(
      "SELECT count(*) as count FROM logs WHERE collectionID = $1",
      [ req.params.collectionID ]
    )

    const pages = Math.floor(pagesRow[0].count / limit);
    
    // get logs

    const { rows } = await db.query(
      "SELECT logID, label, value, logDate FROM logs WHERE collectionID = $1 LIMIT $2 OFFSET $3",
      [ req.params.collectionID, limit, offset ]
    )

    const logs = rows.map(log => ({ logID: log.logid, label: log.label, value: log.value, logDate: log.logdate }))
    
    res.json({ logs, pages })
  })
})

module.exports = logs
