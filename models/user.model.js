const mongoose = require('mongoose');
const { Role } = require('./constants.js') 

const UserSchema = mongoose.Schema(
    {
        username: { 
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        role: {
            type: String,
            enum: [ Role.ADMIN, Role.SUPERUSER, Role.BASIC],
            required: true,
            default: Role.BASIC,
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
            type: [{}]
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