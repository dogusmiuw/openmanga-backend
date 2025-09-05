const express = require("express");
const router = express.Router();

const {
    addToFavorite,
    getFavorites,
    removeFavorite,
} = require("../controllers/favoriteMangaController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

router.post("/", isAuthenticated, addToFavorite);
router.get("/", isAuthenticated, getFavorites);
router.delete("/:mangaId", isAuthenticated, removeFavorite);

module.exports = router;
