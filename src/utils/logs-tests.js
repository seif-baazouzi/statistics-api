const db = require("./db")

function checkCollectionOwner() {
  return (async (req, res, next) => {
    try {
      const { rows } = await db.query(
        "SELECT 1 from collections WHERE collectionName = $1 AND email = $2",
        [ req.params.collectionName, req.body.email ]
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

async function checkLog(label, value) {
  const errors = {}

  // check label
  if(label === "") {
    errors.label = "Must not be empty"
  }
  
  // check value
  if(value === "") {
    errors.value = "Must not be empty"
  } else if(!(/[0-9]+/g.test(value))) {
    errors.value = "Must be a valid number"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = { checkCollectionOwner, checkLog }
