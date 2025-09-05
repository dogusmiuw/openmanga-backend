const Comment = require("../models/Comment");
const Manga = require("../models/Manga");

exports.createComment = async (req, res) => {
    try {
        const {mangaId, text} = req.body;

        const manga = await Manga.findById(mangaId);
        if (!manga) return res.status(404).json({message: "Manga not found"});

        const comment = await Comment.create({
            text,
            manga: mangaId,
            author: req.user.id,
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getCommentsByManga = async (req, res) => {
    try {
        const comments = await Comment.find({manga: req.params.mangaId})
            .populate("author", "username")
            .sort({createdAt: -1});

        res.status(200).json(comments);
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
