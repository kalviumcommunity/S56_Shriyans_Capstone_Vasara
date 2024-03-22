const express = require("express")
const cors = require("cors")
const {router} = require("./Routes/routes.js")
require("dotenv").config()
const port = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`)
})