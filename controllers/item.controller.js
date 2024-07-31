const Item = require('../models/item.model.js');

const createItem = async (req, res) => {
    try{
        const item = await Item.create(req.body);
        res.status(200).json(item);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createItem,
}