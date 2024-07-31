const Item = require('../models/item.model.js');

// Create new Item
const createItem = async (req, res) => {
    try{
        const item = await Item.create(req.body);
        res.status(200).json(item);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get Item by Id
const getItemById = async (req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item);
    }catch(error){
        res.status(500).json({message: "Item not Found"});
    }
}

// Get all Items
const getAllItems = async (req, res) => {
    try{
        const items = await Item.find({});
        res.status(200).json(items);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get a Range of Items for Pagination
const getItemsRange = async (req, res) => {
    try{
        const { skip, limit } = req.params;
        const items = await Item.find({}).limit(limit).skip(skip);
        res.status(200).json(items);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get Items by Type
const getItemsByType = async (req, res) => {
    try{
        const { type } = req.params;
        const items = await Item.find({type : type});
        if(!items.length){
            res.status(404).json({message: `No Items of Type:${type} Found`});
        } else{
            res.status(200).json(items);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get Items by Condition
const getItemsByCondition = async (req, res) => {
    try{
        const { condition } = req.params;
        const items = await Item.find({condition : condition});
        if(!items.length){
            res.status(404).json({message: `No Items of Condition:${condition} Found`});
        } else{
            res.status(200).json(items);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Update Item
const updateItemById = async(req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findByIdAndUpdate(id, req.body);
        if (!item) {
            return res.status(404).json({message: "Item not Found"});
        };
        const updatedItem = await Item.findById(id);
        res.status(200).json(updatedItem);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Delete Item by Id
const deleteItemById = async (req, res) => {
    try{
        const { id } = req.params;
        console.log("id", id)
        const item = await Item.findByIdAndDelete(id);
        console.log("item", item)


        if(item.deletedCount == 0){
            res.status(404).json({message: "Item not Found"});
        }else{
            res.status(200).json({message: "Successfully deleted Item"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createItem,
    getItemById,
    getAllItems,
    getItemsByType,
    getItemsByCondition,
    updateItemById,
    deleteItemById,
    getItemsRange,
}