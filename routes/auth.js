const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model');

const dotenv = require('dotenv');
dotenv.config();



// user register 
router.post('/register', async(req, res)=>{
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({username, password:hash});
    await newUser.save();
    res.status(201).json({message:'user registered..'})
})

//user login 

router.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({message:'invalid password'});
    }
    const token = jwt.sign({ id: user._id }, process.env.SCRETE_KEY, { expiresIn: '7d' });
    res.json({ token });
})

//protected 


router.get('/protected', async(req, res)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({message:'no token provide'});
    const tokenWithoutBearer = token.split(' ')[1]; // Remove "Bearer" from the token string
    jwt.verify(tokenWithoutBearer, process.env.SCRETE_KEY, (err, decoded)=>{
        if(err) return res.status(402).json({message:'invalid token'});
        res.json({message:'protected data', userId: decoded.id});
    })

    
})



module.exports = router;