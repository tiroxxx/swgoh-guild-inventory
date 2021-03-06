const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", err => console.error(error))
db.once("open", () => console.log("connected to db"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const guildmatesRouter = require("./routes/GuildMates")

app.use("/api/guildmates", guildmatesRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}`))