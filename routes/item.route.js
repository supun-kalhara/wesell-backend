const express = require('express');
const router = express.Router();
const multer = require('multer');

const { 
    createItem, 
    getItemById, 
    getAllItems, 
    getItemsByType, 
    updateItemById, 
    getItemsByCondition, 
    deleteItemById, 
    getItemsRange, 
    uploadPhoto
} =   require('../controllers/item.controller')


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), uploadPhoto);

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.get('/type/:type', getItemsByType);

router.get('/condition/:condition', getItemsByCondition);

router.get('/range/:limit/:skip', getItemsRange);

router.post('/', createItem);

router.put('/:id', updateItemById);

router.delete('/:id', deleteItemById);

module.exports = router;