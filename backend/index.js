require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Succesfuuly"))
    .catch((err) => console.log("Error", err))


//Available Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(PORT, () => console.log(
    `Server running at ${PORT}`
))    