require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const authROutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoute")

const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("MongoDB is connected")})
    .catch(err => console.log(err))

app.use("/auth",authROutes)
app.use("/project",projectRoutes)
app.use("/task",taskRoutes)

const PORT=7000

app.listen(PORT,()=>{
    console.log(`Server is running on port 7000 http://localhost:${PORT}/`)
})