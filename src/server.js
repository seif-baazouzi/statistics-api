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

// logs routes
app.use("/logs", require("./routes/logs/get"))
app.use("/logs", require("./routes/logs/add"))
app.use("/logs", require("./routes/logs/edit"))
app.use("/logs", require("./routes/logs/delete"))

// statistics routes
app.use("/statistics/weekly", require("./routes/statistics/weekly"))
app.use("/statistics/monthly", require("./routes/statistics/monthly"))
app.use("/statistics/yearly", require("./routes/statistics/yearly"))

// settings routes
app.use("/settings/update/name", require("./routes/settings/update-name"))
app.use("/settings/update/email", require("./routes/settings/update-email"))
app.use("/settings/update/password", require("./routes/settings/update-password"))

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
