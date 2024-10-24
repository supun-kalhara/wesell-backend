const Item = require('../models/item.model.js');
const Report = require('../models/report.model.js');
const moment = require('moment')

require('dotenv').config()
const { S3Client, PutObjectCommand } =  require('@aws-sdk/client-s3');
const crypto = require('crypto')

const s3 = new S3Client({ 
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION
});

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex')
}

// Upload Photo
const uploadPhoto = async (req, res) => {
    try{
        const imageName = req.file.originalname + randomImageName();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        const command = new PutObjectCommand(params);
        s3Res = await s3.send(command);
        // Return name of file and uri here
        return res.status(200).json({ imageName });
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Create new Item
const createItem = async (req, res) => {
    try{
        const item = await Item.create(req.body);
        return res.status(200).json(item);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Create new Report
const createReport = async (req, res) => {
    try{
        const report = await Report.create(req.body);
        return res.status(200).json(report);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get All Reports
const getAllReports = async (req, res) => {
    try{
        const result = await Report.find({});
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get Item by Id
const getItemById = async (req, res) => {
    try{
        const { id } = req.params;
        // Yes, it's a valid ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const item = await Item.findById(id);
            if(!item){
                return res.status(404).json({message: "Item not Found"});
            }
            return res.status(200).json(item);
        }
        return res.status(400).json({message: "Invalid Item Id"});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get all Items
const getAllItems = async (req, res) => {
    try{
        const items = await Item.find({});
        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get a Range of Items for Pagination
const getItemsRange = async (req, res) => {
    try{
        const { skip, limit } = req.params;
        const items = await Item.find({}).limit(limit).skip(skip);
        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get Items by Type
const getItemsByType = async (req, res) => {
    try{
        const { type } = req.params;
        const items = await Item.find({type : type});
        if(!items.length){
            return res.status(404).json({message: `No Items of Type:${type} Found`});
        } else{
            return res.status(200).json(items);
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get Items by Condition
const getItemsByCondition = async (req, res) => {
    try{
        const { condition } = req.params;
        const items = await Item.find({condition : condition});
        if(!items.length){
            return res.status(404).json({message: `No Items of Condition:${condition} Found`});
        } else{
            return res.status(200).json(items);
        }
    }catch(error){
        return res.status(500).json({message: error.message});
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
        return res.status(200).json(updatedItem);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Update Views
const updateViews = async(req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({message: "Item not Found"});
        };
        item.views += 1
        await Item.findByIdAndUpdate(id, item );
        
        return res.status(200).json(item.views);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get Items By UserId
const getItemsByUserId = async(req, res) => {
    try{
        const { id } = req.params;
        const items = await Item.find({user: id});
        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Delete Item by Id
const deleteItemById = async (req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);

        if(item.deletedCount == 0){
            return res.status(404).json({message: "Item not Found"});
        }else{
            return res.status(200).json({message: "Successfully deleted Item"});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Get Trending Items
const getTrendingItems = async(req, res) => {
    try{
        // Sort by views
        const sortBy = { 
            "views": -1,
        }

        const facet = {
            "totalData": [
                { "$match": { 
                    createdAt: {
                        // GTE = Greater than or equals to
                        $gte: new Date(moment().subtract(1, 'months').toISOString())  // Created within the last month
                    } 
                }},
                { "$sort": sortBy },
                { "$limit": 30 },
                
            ]
        }
        const items = await Item.aggregate([
            { "$facet": facet }
        ])
        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

// Search Items
const searchItems = async(req, res) => {
    try{
        const { limit, skip } = req.params;
        const search = req.body.search;
        const sort = req.body.sort;
        var type = req.body?.category;
        var location = req.body?.location;

        // Default sort by newest
        var sortBy = { "createdAt": -1 }

        // Set Sort
        if(sort == "oldest"){ 
            sortBy = { "createdAt": 1 }
        }
        if(sort == "low"){ 
            sortBy = { "price": 1 }
        }
        if(sort == "high"){ 
            sortBy = { "price": -1 }
        }

        const requireType = {
            "text": {
                "query": type,
                "path": "type"
            }
        }

        const requireLocation = {
            "text": {
                "query": location,
                "path": "location"
            }
        }

        const facet = {
            "totalData": [
                { "$match": { }},
                { "$sort": sortBy },
                { "$skip": parseInt(skip) },
                { "$limit": parseInt(limit) },
                
            ],
            "totalCount": [
                { "$count": "count" }
            ]
        }

        // Gotta be a better way to do this
        //Handle each scenario for possible null values
        if(search == "" && type && location){
            const items = await Item.aggregate([
                {
                    "$search": {
                        index: "default",
                        "compound": {
                            "must": [requireType, requireLocation]
                        }
                    }
                },
                { 
                    "$facet": facet
                }
              ])
            return res.status(200).json(items);
        }

        if(search == "" && !type && location){
            const items = await Item.aggregate([
                {
                    "$search": {
                        index: "default",
                        "compound": {
                            "must": [requireLocation]
                        }
                    }
                },
                { 
                    "$facet": facet
                }
              ])
            return res.status(200).json(items);
        }

        if(search == "" && type && !location){
            const items = await Item.aggregate([
                {
                    "$search": {
                        index: "default",
                        "compound": {
                            "must": [requireType]
                        }
                    }
                },
                { 
                    "$facet": facet
                }
              ])
            return res.status(200).json(items);
        }

        if(search == "" && !type && !location){
            const items = await Item.aggregate([
                { "$facet": facet }
              ])
            return res.status(200).json(items);
        }

        if(search.length > 0 && type && location){
            const items = await Item.aggregate([
                {
                    $search: {
                        
                        index: "default",
                        "compound": {
                            "filter": [{
                                "text": {
                                    query: search,
                                    path: {
                                        wildcard: "*"
                                    },
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 2
                                    }
                                },
                            }],
                            "must": [requireType, requireLocation]
                        }
                        
                    }
                },
                { 
                    "$facet": facet
                }
            ]);
            return res.status(200).json(items);
        }

        if(search.length > 0 && !type && location){
            const items = await Item.aggregate([
                {
                    $search: {
                        
                        index: "default",
                        "compound": {
                            "filter": [{
                                "text": {
                                    query: search,
                                    path: {
                                        wildcard: "*"
                                    },
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 2
                                    }
                                },
                            }],
                            "must": [requireLocation]
                        }
                        
                    }
                },
                { 
                    "$facet": facet
                }
            ]);
            return res.status(200).json(items);
        }

        if(search.length > 0 && type && !location){
            const items = await Item.aggregate([
                {
                    $search: {
                        
                        index: "default",
                        "compound": {
                            "filter": [{
                                "text": {
                                    query: search,
                                    path: {
                                        wildcard: "*"
                                    },
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 2
                                    }
                                },
                            }],
                            "must": [requireType]
                        }
                        
                    }
                },
                { 
                    "$facet": facet
                }
            ]);
            return res.status(200).json(items);
        }

        if(search.length > 0 && !type && !location){
            const items = await Item.aggregate([
                {
                    $search: {
                        
                        index: "default",
                        "compound": {
                            "filter": [{
                                "text": {
                                    query: search,
                                    path: {
                                        wildcard: "*"
                                    },
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 2
                                    }
                                },
                            }],
                        }
                        
                    }
                },
                { 
                    "$facet": facet
                }
            ]);
            return res.status(200).json(items);
        }
        // Query
        const response = await Item.aggregate([
            {
                $search: {
                    
                    index: "default",
                    "compound": {
                        "filter": [{
                            "text": {
                                query: search,
                                path: {
                                    wildcard: "*"
                                },
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            },
                        }],
                        "must": [requireType, requireLocation]
                    }
                    
                }
            },
            { 
                "$facet": facet
            }
        ]);
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    createItem,
    createReport,
    getItemById,
    getAllItems,
    getItemsByType,
    getItemsByCondition,
    updateItemById,
    deleteItemById,
    getItemsRange,
    uploadPhoto,
    updateViews,
    getAllReports,
    getItemsByUserId,
    searchItems,
    getTrendingItems,
}