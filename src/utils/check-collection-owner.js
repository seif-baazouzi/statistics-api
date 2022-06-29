const db = require("./db")

function checkCollectionOwner() {
  return (async (req, res, next) => {
    try {
      const { rows } = await db.query(
        "SELECT 1 from collections WHERE collectionID = $1 AND email = $2",
        [ req.params.collectionID, req.body.email ]
      )
      
      if(!rows[0]) {
        res.json({ message: "invalid-collection" })
      }

      next()
    } catch(err) {
      console.error(err)
      res.json({ message: "server-error" })
    }
  })
}

module.exports = { checkCollectionOwner }
