const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: { 
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true
        },

        number: {
            type: String
        },

        favourites: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        }],

        posts: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        }],

        drafts: {
            type: String
        },

        isDarkTheme: {
            type: Boolean
        },
    },
    {
        timestamps: true
    },
    {
        collection: 'user-data'
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;