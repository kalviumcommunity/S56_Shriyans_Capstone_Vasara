const express = require('express')
const router = express.Router()
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer  = require('multer')
const cloudinary = require('../Cloudinary')
const upload = require('../multer')
const FeedbackModal = require("../models/FeedbackModal")
const ColorModal = require("../models/ColorsModal")


require("dotenv").config()
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
        const token = jwt.sign({_id:newUser._id},process.env.JWT_Token,{
            expiresIn:'90d',
        })
        res.status(201).json({
            status:"success",
            message:"User registered sucess",
            token
        })
    } catch (error) {
        res.send(error)
        
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
            return res.status(401).send("Incorrect email or password")
        }
    
        const token = jwt.sign({id:user._id},process.env.JWT_Token,{
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
router.get("/profile/:id", (req, res) => {
    try {
        const id = jwt.verify(req.params.id, process.env.JWT_Token);
        // const id = req.params.id
        User.findById({ _id: id.id })
            .then((el) => res.json(el))
            .catch(err => res.status(400).json({ error: "Invalid or expired token" }));
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

router.put("/profile/:id", upload.single('image'), (req, res) => {
    try {
        const id = jwt.verify(req.params.id, process.env.JWT_Token);
        cloudinary.uploader.upload(req.file.path, function (error, result) {
            if (error) {
                res.status(400).json({ error: "Error uploading image" });
                return;
            }
            User.findByIdAndUpdate(id.id, { Image: result.secure_url })
                .then((el) => res.json(el))
                .catch(err => res.status(400).json(err));
        });
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

router.get("/updateProfile/:id",(req,res)=>{
    const id = req.params.id
    // console.log(id.id)
    User.findById({_id:id})
    .then((el) => res.json(el))
    .catch(err => res.json(err));
})

router.put("/updateProfile/:id",(req,res)=>{
    const id = req.params.id
    User.findByIdAndUpdate  (id,req.body)
    .then((el) => res.json(el))
    .catch(err => res.json(err));
}   
)

router.get("/feedback",async(req,res)=>{
    try{
        const feedback = await FeedbackModal.find({})
        res.status(200).json(feedback)
    }catch(error){
        res.status(500).json({message:"Failed to get feedback",error})
    }
}
)

router.post("/feedback",async(req,res)=>{
    const {name,email,message} = req.body
    const newFeedback = new FeedbackModal({
        name,email,message
    })
    try{
        await newFeedback.save()
        res.status(201).json({message:"Message sent!"})
    }catch(error){
        res.status(500).json({message:"Failed to submit",error})
    }
}
)

router.get("/colors",async(req,res)=>{
    try{
        const colors = await ColorModal.find({})
        res.status(200).json(colors)
    }catch(error){
        res.status(500).json({message:"Failed to get colors",error})
    }
}
)

router.get("/favorites/:id", (req, res) => {
    try {
        const id = jwt.verify(req.params.id, process.env.JWT_Token);
        User.findById({ _id: id.id })
            .then((el) => res.json(el))
            .catch(err => res.status(400).json({ error: "Invalid or expired token" }));
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

router.put("/favorites/:id", async (req, res) => {
    try {
        const id = jwt.verify(req.params.id, process.env.JWT_Token);
        const updatedUser = await User.findByIdAndUpdate(id.id, { $set: req.body }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.json(err);
    }
});


router.put("/favorites/:id",(req,res)=>{
    const id = jwt.verify(req.params.id, process.env.JWT_Token);
    if (req.body.favColors.some(colorId => !mongoose.Types.ObjectId.isValid(colorId))) {
        return res.status(400).json({ error: "Invalid favColors array" });
    }
    let favColors = req.body.favColors
    User.findById({ _id: id.id })
    .then((el) => {
        User.findByIdAndUpdate(id.id,{...el,favColors})
        .then((el) => {
            res.json(el)
    })
        .catch(err => res.json(err));
        res.json(el)
    
    })
    .catch(err => res.status(400).json({ error: "Invalid or expired token" }));


}   
)

router.get("/colordetail/:id", async (req, res) => {
    try {
        const color = await ColorModal.findById(req.params.id);
        res.status(200).json(color);
    } catch (error) {
        const errorMessage = process.env.ERROR_MESSAGE || "Failed to get color";
        res.status(500).json({ message: errorMessage, error });
    }
});

router.delete("/updateprofile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (err) {
        res.json(err);
    }
});

router.get("/getallusers",async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message:"Failed to get users",error})
    }
}
)

router.delete("/blockuser/:id",async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)   
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message:"Failed to block user",error})
    }
}
)


router.get('*', (req, res) => res.status(404).send('Page not found'))
module.exports= {router}