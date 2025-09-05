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

/**
 * @swagger
 * tags:
 *   name: Mangas
 *   description: Manga management endpoints
 */

/**
 * @swagger
 * /api/mangas:
 *   get:
 *     summary: Get all mangas
 *     tags: [Mangas]
 *     responses:
 *       200:
 *         description: List of mangas
 *   post:
 *     summary: Create a new manga
 *     tags: [Mangas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: Naruto
 *               author:
 *                 type: string
 *                 example: Masashi Kishimoto
 *               description:
 *                 type: string
 *                 example: A story about ninjas
 *               coverImage:
 *                 type: string
 *                 example: https://example.com/naruto.jpg
 *     responses:
 *       201:
 *         description: Manga created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/mangas/{id}:
 *   get:
 *     summary: Get a manga by ID
 *     tags: [Mangas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *     responses:
 *       200:
 *         description: Manga details
 *       404:
 *         description: Manga not found
 *   put:
 *     summary: Update a manga by ID
 *     tags: [Mangas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: One Piece
 *               author:
 *                 type: string
 *                 example: Eiichiro Oda
 *               description:
 *                 type: string
 *                 example: A story about pirates
 *               coverImage:
 *                 type: string
 *                 example: https://example.com/onepiece.jpg
 *     responses:
 *       200:
 *         description: Manga updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Manga not found
 *   delete:
 *     summary: Delete a manga by ID
 *     tags: [Mangas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *     responses:
 *       200:
 *         description: Manga deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Manga not found
 */

router.get("/", getAllMangas);
router.get("/:id", getMangaById);
router.post("/", isAuthenticated, createManga);
router.put("/:id", isAuthenticated, updateManga);
router.delete("/:id", isAuthenticated, deleteManga);

module.exports = router;
