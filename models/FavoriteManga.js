const mongoose = require("../database");

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        manga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Manga",
            required: true,
        },
    },
    {timestamps: true},
);

favoriteSchema.index({user: 1, manga: 1}, {unique: true});

export default mongoose.model("Favorite", favoriteSchema);
