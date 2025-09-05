const Manga = require("../models/Manga");

exports.createManga = async (req, res) => {
    try {
        const {title, description, author, genres, coverImage} = req.body;

        const manga = await Manga.create({
            title,
            description,
            author,
            genres,
            coverImage,
            uploadedBy: req.user.id,
        });

        res.status(201).json(manga);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getAllMangas = async (req, res) => {
    try {
        const mangas = await Manga.find().populate("uploadedBy", "username");
        res.status(200).json(mangas);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getMangaById = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id).populate(
            "uploadedBy",
            "username",
        );
        if (!manga) return res.status(404).json({message: "Manga not found"});

        res.status(200).json(manga);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.updateManga = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id);
        if (!manga) return res.status(404).json({message: "Manga not found"});

        if (
            manga.uploadedBy.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        manga.title = req.body.title || manga.title;
        manga.description = req.body.description || manga.description;
        manga.author = req.body.author || manga.author;
        manga.genres = req.body.genres || manga.genres;
        manga.coverImage = req.body.coverImage || manga.coverImage;

        await manga.save();
        res.status(200).json(manga);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deleteManga = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id);
        if (!manga) return res.status(404).json({message: "Manga not found"});

        if (
            manga.uploadedBy.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        await manga.deleteOne();
        res.status(200).json({message: "Manga deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
