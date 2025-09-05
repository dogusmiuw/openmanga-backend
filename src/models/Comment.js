const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: [true, "Comment cannot be empty"],
            trim: true,
            minlength: [1, "Comment must be at least 1 character"],
            maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
    },
    {timestamps: true},
);

export default mongoose.model("Comment", commentSchema);
