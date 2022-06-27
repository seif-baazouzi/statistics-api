require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(require("body-parser").json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
