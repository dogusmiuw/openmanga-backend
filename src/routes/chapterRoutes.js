const express = require("express");
const router = express.Router();

const {
    createChapter,
    getChaptersByManga,
    getChapterById,
    updateChapter,
    deleteChapter,
} = require("../controllers/chapterController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get("/:id", getChapterById);
router.get("/manga/:mangaId", getChaptersByManga);
router.post("/", isAuthenticated, createChapter);
router.put("/:id", isAuthenticated, updateChapter);
router.delete("/:id", isAuthenticated, deleteChapter);

module.exports = router;
