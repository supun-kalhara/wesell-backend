const express = require('express');
const router = express.Router();
const { createItem, getItemById, getAllItems, getItemsByType, updateItemById, getItemsByCondition, deleteItemById, getItemsRange } =   require('../controllers/item.controller')

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.get('/type/:type', getItemsByType);

router.get('/condition/:condition', getItemsByCondition);

router.get('/range/:limit/:skip', getItemsRange);

router.post('/', createItem);

router.put('/:id', updateItemById);

router.delete('/:id', deleteItemById);

module.exports = router;