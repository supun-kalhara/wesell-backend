const express = require('express');
const router = express.Router();
const multer = require('multer');
const { maxFileSize } = require('./constants.js')

const { 
    createItem, 
    createReport,
    getItemById, 
    getAllItems, 
    getItemsByType, 
    updateItemById, 
    getItemsByCondition, 
    deleteItemById, 
    getItemsRange, 
    uploadPhoto,
    updateViews,
    getAllReports,
    getItemsByUserId,
    searchItems,
    getTrendingItems,
} =   require('../controllers/item.controller')


const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: maxFileSize * 1000000 /* bytes */ } })

router.post('/upload', upload.single('file'), uploadPhoto);

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.get('/user/:id', getItemsByUserId);

router.get('/type/:type', getItemsByType);

router.get('/condition/:condition', getItemsByCondition);

router.get('/range/:limit/:skip', getItemsRange);

router.post('/', createItem);

router.post('/report', createReport);

router.get('/report/all', getAllReports);

router.get('/trending/views', getTrendingItems);

router.post('/views/:id', updateViews);

router.put('/:id', updateItemById);

router.delete('/:id', deleteItemById);

router.post('/search/:limit/:skip', searchItems);

module.exports = router;