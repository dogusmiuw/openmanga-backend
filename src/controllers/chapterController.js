const Chapter = require("../models/Chapter");
const Manga = require("../models/Manga");

exports.createChapter = async (req, res) => {
    try {
        const {mangaId, title, pages} = req.body;

        const manga = await Manga.findById(mangaId);
        if (!manga) return res.status(404).json({message: "Manga not found"});

        const chapter = await Chapter.create({
            manga: mangaId,
            title,
            pages,
            uploadedBy: req.user.id,
        });

        res.status(201).json(chapter);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getChaptersByManga = async (req, res) => {
    try {
        const {mangaId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const total = await Chapter.countDocuments({manga: mangaId});

        const chapters = await Chapter.find({manga: mangaId})
            .sort({createdAt: 1})
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            totalPages: Math.ceil(total / limit),
            totalChapters: total,
            chapters,
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id).populate(
            "manga",
            "title",
        );
        if (!chapter)
            return res.status(404).json({message: "Chapter not found"});

        res.status(200).json(chapter);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter)
            return res.status(404).json({message: "Chapter not found"});

        if (
            chapter.uploadedBy.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        chapter.title = req.body.title || chapter.title;
        chapter.pages = req.body.pages || chapter.pages;

        await chapter.save();
        res.status(200).json(chapter);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter)
            return res.status(404).json({message: "Chapter not found"});

        if (
            chapter.uploadedBy.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        await chapter.deleteOne();
        res.status(200).json({message: "Chapter deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
