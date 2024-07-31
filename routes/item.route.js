const express = require('express');
const router = express.Router();
const { createItem } =   require('../controllers/item.controller')

// router.get('/', getProducts);

// router.get('/:id', getProduct);

router.post('/', createItem);

// router.put('/:id', updateProduct);

// router.delete('/:id', deleteProduct);

module.exports = router;