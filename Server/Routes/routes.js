const express = require('express')
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Server is working!")
})


router.get('*', (req, res) => res.status(404).send('Page not found'))
module.exports= {router}