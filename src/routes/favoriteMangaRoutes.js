const express = require("express");
const router = express.Router();

const {
    addToFavorite,
    getFavorites,
    removeFavorite,
} = require("../controllers/favoriteMangaController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorite mangas management
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a manga to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mangaId
 *             properties:
 *               mangaId:
 *                 type: string
 *                 example: 64e3a22bf3c1f7d123456789
 *     responses:
 *       201:
 *         description: Manga added to favorites
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all favorite mangas of the logged-in user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite mangas
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/favorites/{mangaId}:
 *   delete:
 *     summary: Remove a manga from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *     responses:
 *       200:
 *         description: Manga removed from favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Manga not found in favorites
 */

router.post("/", isAuthenticated, addToFavorite);
router.get("/", isAuthenticated, getFavorites);
router.delete("/:mangaId", isAuthenticated, removeFavorite);

module.exports = router;
