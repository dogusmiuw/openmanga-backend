const express = require("express");
const router = express.Router();

const {
    createManga,
    getAllMangas,
    getMangaById,
    updateManga,
    deleteManga,
} = require("../controllers/mangaController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get("/", getAllMangas);
router.get("/:id", getMangaById);
router.post("/", isAuthenticated, createManga);
router.put("/:id", isAuthenticated, updateManga);
router.delete("/:id", isAuthenticated, deleteManga);

module.exports = router;
