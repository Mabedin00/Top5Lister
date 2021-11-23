const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerUsername: { type: String, required: true },
        likedBy: { type: [String], required: true },
        dislikedBy: { type: [String], required: true },
        views: { type: Number, required: true },

    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
