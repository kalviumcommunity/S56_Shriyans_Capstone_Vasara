const express = require('express')
const router = express.Router()
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.get("/",(req,res)=>{
    res.send("Server is working!")
})
router.post("/signup",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send("User already exists!")
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        const newUser  =await User.create({
            ...req.body,
            password: hashedPassword,
        })
        const token = jwt.sign({_id:newUser._id},"secretkey123",{
            expiresIn:'90d',
        })
        res.status(201).json({
            status:"success",
            message:"User registered sucess",
            token
        })
    } catch (error) {
        res.json(error)
        
    }
})

router.post("/login",async(req,res)=>{
    try {
        const {email,password} =req.body
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(404).send("User not found!")
    
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).send("Incorrect email or password password")
        }
    
        const token = jwt.sign({_id:user._id},"secretkey123",{
            expiresIn:'90d',
        })
        res.status(200).json({
            status:"sucess",
            token,
            message:"Logged in successfully",
            user:{
                _id:user._id,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        res.send(error)        
    }
    
})

router.get('*', (req, res) => res.status(404).send('Page not found'))
module.exports= {router}