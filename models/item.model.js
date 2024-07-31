const mongoose = require('mongoose');
const { PostType, Condition } = require('./constants.js') 

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

        user: [{
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        }],

        expire: {
            type: Number,
            default: 3,
            required: true,
        },

        location: {
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

        mainCategory: {
            type: String,
        },

        subCategory: {
            type: String,
        },

        mileage: {
            type: Number,
        },

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

        jobTitle: {
            type: String,
        },
        
        pay: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;