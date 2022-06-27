const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  max: 10,
})

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

console.log("Connected to postgresql database");

module.exports = pool
