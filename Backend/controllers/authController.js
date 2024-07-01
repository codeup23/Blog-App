const bcrypt = require('bcrypt');       // to hash the password
const User = require('../models/User'); // to interact with DB
const jwt = require('jsonwebtoken');    // to generate token
require('dotenv').config();

const salt = 10;                    // to hash password
const secret = process.env.SECRET;  // to sign token

// Register Controller
exports.register = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // hash password
        let hashedPassword;

        try {
            hashedPassword = await bcrypt.hash(password, salt);
        } catch(err){
            console.log(err);
            return res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
        }

        // create user
        const user = new User({
            name,
            username,
            password: hashedPassword
        });

        // save user
        await user.save();

        return res.status(200).json({ 
            success: true,
            message: 'User created successfully' 
        });

    }catch(err){
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error outside' 
        });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // validate username and password
        if(!username || !password){
            return res.status(400).json({ 
                success: false,
                message: 'Please enter username and password' 
            });
        }

        // check if user exists
        let user = await User.findOne({
            username
        });
        
        // check if username exists
        if(!user){
            return res.status(400).json({ 
                success: false,
                message: 'User Not Found' 
            });
        }

        // create a payload
        const payload = {
            username : user.username,
            id: user._id,
        }

        //verify password and generate token

        let validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json({ 
                success: false,
                message: 'Invalid Password' 
            });
        }
        else{
            let token = jwt.sign(payload, secret, { expiresIn: '24h' });

            user = user.toObject();
            user.token = token;

            user.password = undefined;

            // creating options for the cookie
            const options = {
                expires: new Date(Date.now() + 24*60*60*1000),
                httpOnly: true,
            }

            // send cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                token : token,
                message: 'Login Successful',
                user: user
            });
        }
    }
    catch(err){
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};

// Logout Controller
exports.logout = (req, res) => {
    // the cookie named token containing login info is cleared
    res.clearCookie('token');

    return res.status(200).json({ 
        success: true,
        message: 'Logged Out' 
    });
};

// Show Profile
exports.profile = async (req, res) => {
    try {
        const token = req.cookies.token;

        jwt.verify(token, secret, async (err, info) => {
            if(err){
                return res.status(400).json({ 
                    success: false,
                    message: 'Invalid Token' 
                });
            }
        try {
            const user = await User.findById(info.id).select('-password');
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            return res.status(200).json({ 
                success: true,
                user: user 
            });
        } catch(err){
            return res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
            }
        });
    }
    catch(err){
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};
