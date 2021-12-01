const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerUsername: { type: String, required: true },
        likedBy: { type: [String]},
        dislikedBy: { type: [String] },
        views: { type: Number },
        publishedDate: { type: Date },
        isPublished: { type: Boolean, default: false },

    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
