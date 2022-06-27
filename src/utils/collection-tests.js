const db = require("./db")

async function checkCollection(collectionName) {
  const errors = {}

  if(collectionName == "") {
    errors.collectionName = "Must not be empty"
  } else {
    const { rows } = await db.query("SELECT 1 from collections WHERE collectionName = $1", [ collectionName ])
    const collection = rows[0]
    if(collection) errors.collectionName = "This collection name is already exist"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = { checkCollection }
