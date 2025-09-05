const Comment = require("../models/Comment");
const Manga = require("../models/Manga");
const Chapter = require("../models/Chapter");

exports.createComment = async (req, res) => {
    try {
        const {mangaId, chapterId, text} = req.body;

        if (!mangaId && !chapterId) {
            return res.status(400).json({
                message: "You must provide either mangaId or chapterId",
            });
        }

        let commentData = {text, author: req.user.id};

        if (chapterId) {
            const chapter = await Chapter.findById(chapterId);
            if (!chapter)
                return res.status(404).json({message: "Chapter not found"});
            commentData.chapter = chapterId;
            commentData.manga = chapter.manga;
        } else if (mangaId) {
            const manga = await Manga.findById(mangaId);
            if (!manga)
                return res.status(404).json({message: "Manga not found"});
            commentData.manga = mangaId;
        }

        const comment = await Comment.create(commentData);

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getCommentsByManga = async (req, res) => {
    try {
        const {mangaId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const chapters = await Chapter.find({manga: mangaId}).select("_id");
        const chapterIds = chapters.map(c => c._id);

        const total = await Comment.countDocuments({
            chapter: {$in: chapterIds},
        });

        const comments = await Comment.find({chapter: {$in: chapterIds}})
            .populate("author", "username")
            .populate("chapter", "title")
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            totalPages: Math.ceil(total / limit),
            totalComments: total,
            comments,
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getCommentsByChapter = async (req, res) => {
    try {
        const {chapterId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const total = await Comment.countDocuments({chapter: chapterId});

        const comments = await Comment.find({chapter: chapterId})
            .populate("author", "username")
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            totalPages: Math.ceil(total / limit),
            totalComments: total,
            comments,
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment)
            return res.status(404).json({message: "Comment not found"});

        if (
            comment.author.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        comment.text = req.body.text || comment.text;
        await comment.save();

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment)
            return res.status(404).json({message: "Comment not found"});

        if (
            comment.author.toString() !== req.user.id &&
            req.user.role === "user"
        ) {
            return res.status(403).json({message: "Access denied"});
        }

        await comment.deleteOne();
        res.status(200).json({message: "Comment deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
