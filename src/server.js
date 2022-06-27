require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(require("body-parser").json())

app.use("/auth", require("./routes/auth/index"))
app.use("/login", require("./routes/auth/login"))
app.use("/signup", require("./routes/auth/signup"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
