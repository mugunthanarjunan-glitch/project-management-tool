const express = require("express")
const cors = require("cors")


const app = express()

app.use(cors())
app.use(express.json())




const PORT=7000

app.listen(PORT,()=>{
    console.log(`Server is running on port 7000 http://localhost:${PORT}/`)
})