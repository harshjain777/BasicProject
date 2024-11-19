const express = require('express');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = express.Router();

router.post('/register', async(req,res)=>{
    const {username,password} = req.body
    if(!username||!password){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const hashedPass = await bycrpt.hash(password,10);
    const newUser = new User({username,password:hashedPass})

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/login', async(req,res)=>{
    const {username,password} = req.body

    const user = await User.findOne({username});
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordCorrect = await bycrpt.compare(password,user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials password is wrong' });

    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    res.json({token})
})

router.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: `Welcome to your dashboard, user ${decoded.id}` });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;