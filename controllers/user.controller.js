const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register User
const registerUser = async (req, res) => {
    try{
        const findUserEmail = await User.findOne({email: req.body.email});
        if(findUserEmail){
            return res.status(400).json({message: "user with this email already exists"});
        }
        const findUserUsername = await User.findOne({username: req.body.username});
        if(findUserUsername){
            return res.status(400).json({message: "user with this username already exists"});
        }
        // Generate Hashed Password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // Create user with Hashed Password
        var data = req.body
        data.password = hashedPassword
        const user = await User.create(data);
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

//Login User
const loginUser = async (req, res) => {
    try{
        var data = {};
        const password = req.body.password;
        // Set email or username
        if(req.body.email){
            data.email = req.body.email;
        }
        if(req.body.username){
            data.username = req.body.username;
        }
        const user = await User.findOne(data);
        // Wrong email/username
        if(!user){
            return res.status(404).json({message: "Wrong username/email or password"});
        }

        // Compare passwords
        if(await bcrypt.compare(password, user.password)){
            var resUser = user.toJSON();
            delete resUser.password
            const accessToken = jwt.sign(resUser, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '7d' // expires in 365 days
            })
            return res.status(200).json( {accessToken: accessToken} );
        } else{ //Wrong password
            return res.status(401).json({message: "Wrong username/email or password"});
        }
        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

//Get user by Id
const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
        resUser = user.toJSON()
        delete resUser.password
        return res.status(200).json(resUser);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

//Get all Users
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        return res.status(200).json(users);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get user by Email
const getUserByEmail = async (req, res) => {
    try{
        const { email } = req.params;
        const user = await User.find({email : email});
        if(!user.length){
            return res.status(404).json({message: "User not Found"});
        } else{
            return res.status(200).json(user);
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get user by Username
const getUserByUsername = async (req, res) => {
    try{
        const { username } = req.params;
        const user = await User.find({username: username});
        if(!user.length){
            return res.status(404).json({message: "User not Found"});
        } else{
            return res.status(200).json(user);
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Delete User by Email
const deleteUserByEmail = async (req, res) => {
    try{
        const { email } = req.params;
        const user = await User.deleteOne({ email: email });

        if(user.deletedCount == 0){
            return res.status(404).json({message: "User not Found"});
        }else{
            return res.status(200).json({message: "Successfully deleted user"});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Update User by Id
const updateUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({message: "User not Found"});
        };
        const updatedUser = await User.findById(id);
        return res.status(200).json(updatedUser);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Save Post
const savePost = async(req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({message: "User not Found"});
        };
        user.favourites = [...user.favourites, ...[req.body.postId]]
        await User.findByIdAndUpdate(req.body.userId, user );
        return res.status(200).json(user.favourites);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    deleteUserByEmail,
    updateUserById,
    savePost
}