const FavoriteManga = require("../models/FavoriteManga");
const Manga = require("../models/Manga");

exports.addToFavorite = async (req, res) => {
    try {
        const {mangaId} = req.body;

        const manga = await Manga.findById(mangaId);
        if (!manga) return res.status(404).json({message: "Manga not found"});

        const existing = await FavoriteManga.findOne({
            user: req.user.id,
            manga: mangaId,
        });

        if (existing) {
            return res
                .status(400)
                .json({message: "Manga already in favorites"});
        }

        const favorite = await FavoriteManga.create({
            user: req.user.id,
            manga: mangaId,
        });

        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteManga.find({
            user: req.user.id,
        }).populate("manga");

        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const {mangaId} = req.params;

        const favorite = await FavoriteManga.findOneAndDelete({
            user: req.user.id,
            manga: mangaId,
        });

        if (!favorite) {
            return res.status(404).json({message: "Favorite not found"});
        }

        res.status(200).json({message: "Removed from favorites"});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
