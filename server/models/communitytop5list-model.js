const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityTop5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [{
            itemName: { type: String, required: true },
            votes: { type: Number, required: true }
        }], required: true },
        likedBy: { type: [String], default: [] },
        dislikedBy: { type: [String], default: [] },
        views: { type: Number, default: 0 },
        comments: { type: [{
            comment: { type: String },
            username: { type: String }
        }], default: []  },

    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityTop5List', CommunityTop5ListSchema)
