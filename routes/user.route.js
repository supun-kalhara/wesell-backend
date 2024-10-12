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

// Update
router.put('/:id', updateUserById);

// Delete
router.delete('/:email', deleteUserByEmail);

module.exports = router;