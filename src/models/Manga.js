const mongoose = require("../database");

const mangaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Manga title is required"],
            trim: true,
            minlength: [1, "Title cannot be empty"],
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        description: {
            type: String,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        author: {
            type: String,
            trim: true,
            maxlength: [100, "Author name cannot exceed 100 characters"],
        },
        coverImage: {
            type: String,
            required: [true, "Cover image is required"],
            match: [
                /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/,
                "Invalid image URL",
            ],
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["ongoing", "completed"],
            default: "ongoing",
        },
        genres: [
            {
                type: String,
                trim: true,
                maxlength: 30,
            },
        ],
    },
    {timestamps: true},
);

export default mongoose.model("Manga", mangaSchema);
