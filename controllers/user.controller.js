const User = require('../models/user.model.js');

//Register User
const registerUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Login User
const loginUser = async (req, res) => {
    try{
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        if(req.body.email){
            data = {
                email: email,
                password: password
            }
        }
        if(req.body.username){
            data = {
                username: username,
                password: password
            }
        }
        const user = await User.findOne(data);
        if(!user){
            res.status(404).json({message: "User not Found"});
        } else{
            res.status(200).json(user);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Get user by Id
const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "User not Found"});
    }
}

//Get all Users
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get user by Email
const getUserByEmail = async (req, res) => {
    try{
        const { email } = req.params;
        const user = await User.find({email : email});
        if(!user.length){
            res.status(404).json({message: "User not Found"});
        } else{
            res.status(200).json(user);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get user by Username
const getUserByUsername = async (req, res) => {
    try{
        const { username } = req.params;
        const user = await User.find({username: username});
        if(!user.length){
            res.status(404).json({message: "User not Found"});
        } else{
            res.status(200).json(user);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Delete User by Email
const deleteUserByEmail = async (req, res) => {
    try{
        const { email } = req.params;
        const user = await User.deleteOne({ email: email });

        if(user.deletedCount == 0){
            res.status(404).json({message: "User not Found"});
        }else{
            res.status(200).json({message: "Successfully deleted user"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Update User by Id
const updateUserById = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({message: "User not Found"});
        };
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message: error.message});
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
}