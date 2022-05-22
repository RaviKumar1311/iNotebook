const express = require('express')
const router = express.Router()
const User=require('../models/User')
const bcrypt = require('bcryptjs')
const {body,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'inotebook$'

// Route 1 : Creating a new User . No Login required
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password length must be atleast 5 character").isLength({min:5})
    ],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }

    try{

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    });
    const data={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.send({success,authToken})
    }catch(err){
        console.log(err.message);
        res.status(500).send("Some error Occured");
    }
})

// Route 2 : Authenticate a user . No Login required
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()
    ],async(req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;
    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).send({error:"Sorry No User Found"})
        }

        const  passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).send({success,error:"Sorry Wrong Credentials"})
        }

        const  data = {
            user:{
                id:user.id
            }
        } 
        const authToken = jwt.sign(data,JWT_SECRET)
        success=true;
        res.send({success,authToken})
    }catch(err){
        res.status(500).send({error:"Some error Occured"})
    }
    })

// Route 3 : Get Logged in User Detail . Login required
router.post('/getuser', fetchUser, async(req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(err){
        res.status(500).send({error:"Some error Occured"})
    }
})
module.exports = router;