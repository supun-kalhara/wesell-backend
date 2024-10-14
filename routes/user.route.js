const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../authentication') 
const { 
    registerUser, 
    loginUser, 
    getUserById, 
    getAllUsers, 
    getUserByEmail, 
    getUserByUsername,
    deleteUserByEmail,
    updateUserById,
    savePost,
    unSavePost,
} =   require('../controllers/user.controller')


// Login
router.post('/login', loginUser);

// Get by Id
router.get('/:id', getUserById);

// Get by Email
router.get('/email/:email', getUserByEmail);

// Get by Username
router.get('/username/:username', getUserByUsername);

// Get All Users
// router.get('/', authenticateToken, getAllUsers);

// Register
router.post('/register', registerUser);

// Save post
router.post('/save', savePost);

// unSave post
router.post('/unSave', unSavePost);

// Update
router.put('/:id', updateUserById);

// Delete
router.delete('/:email', deleteUserByEmail);

module.exports = router;