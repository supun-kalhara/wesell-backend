const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        // Common fields
        type: {
            type: String,
            enum: ['product', 'housing', 'service', 'job'],
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
            type: String,
        },
        condition: {
            type: [String],
            enum: ["brand new", "like new", "excellent", "good", "okay", "old"],
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
        area: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;