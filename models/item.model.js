const mongoose = require('mongoose');
const { PostType, Condition } = require('./constants.js') 
const moment = require('moment')

// Set expiry date to 3 months from now
const expiryDate = (moment().add(3, 'months')).toISOString();

const itemSchema = new mongoose.Schema(
    {
        // Common fields
        type: {
            type: String,
            enum: [PostType.PRODUCT, PostType.HOUSING, PostType.SERVICE, PostType.JOB],
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        user: {
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },

        expire: {
            type: String,
            default: expiryDate,
            required: true,
        },

        views:{
            required: true,
            default: 0,
            type: Number,
        },

        location: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },
        
        // Unique fields
        images: {
            type: [String],
        },

        price: {
            type: Number,
        },

        condition: {
            type: String,
            enum: [
                Condition.BRAND_NEW, 
                Condition.LIKE_NEW, 
                Condition.EXCELLENT, 
                Condition.GOOD, 
                Condition.OK, 
                Condition.OLD],
        },

        category: {
            type: String,
        },

        // subCategory: {
        //     type: String,
        // },

        // mileage: {
        //     type: Number,
        // },

        brand: {
            type: String,
        },

        address: {
            type: String,
        },

        bedrooms: {
            type: Number,
        },

        bathrooms: {
            type: Number,
        },

        landArea: {
            type: Number,
        },

        propertyArea: {
            type: Number,
        },

        jobTitle: {
            type: String,
        },
        
        salary: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;