const express = require("express");
const router = express.Router();

const {
    createComment,
    getCommentsByChapter,
    getCommentsByManga, // ✅ eklendi
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get("/chapter/:chapterId", getCommentsByChapter);
router.get("/manga/:mangaId", getCommentsByManga);
router.post("/", isAuthenticated, createComment);
router.put("/:id", isAuthenticated, updateComment);
router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;
