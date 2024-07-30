const mongoose = require('mongoose');

const baseOptions = {
	discriminatorKey: "type",
  	collection: "items",
};

const baseItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
        user: [{
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        expire: {
            type: Int,
            default: 3
        },
        
    },
    {
        timestamps: true
    },
    {
        baseOptions
    }
);

// module.exports = Product;