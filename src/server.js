require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(require("body-parser").json())

// auth routes
app.use("/auth", require("./routes/auth/index"))
app.use("/login", require("./routes/auth/login"))
app.use("/signup", require("./routes/auth/signup"))

// collections routes
app.use("/collections", require("./routes/collections/get"))
app.use("/collections", require("./routes/collections/add"))
app.use("/collections", require("./routes/collections/edit"))
app.use("/collections", require("./routes/collections/delete"))

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
