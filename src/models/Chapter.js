const mongoose = require("../../database");

const chapterSchema = new mongoose.Schema(
    {
        manga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Manga",
            required: true,
        },
        title: {
            type: String,
            trim: true,
            maxlength: [200, "Chapter title cannot exceed 200 characters"],
        },
        chapterNumber: {
            type: Number,
            required: [true, "Chapter number is required"],
            min: [1, "Chapter number must be at least 1"],
        },
        images: [
            {
                type: String,
                required: true,
                match: [
                    /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/,
                    "Invalid image URL",
                ],
            },
        ],
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true},
);

chapterSchema.index({manga: 1, chapterNumber: 1}, {unique: true});

export default mongoose.model("Chapter", chapterSchema);
