const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Comment cannot be empty"],
            trim: true,
            minlength: [1, "Comment must be at least 1 character"],
            maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
        manga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Manga",
            default: null,
        },
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            default: null,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("Comment", commentSchema);
