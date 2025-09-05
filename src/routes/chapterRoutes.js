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

/**
 * @swagger
 * tags:
 *   name: Chapters
 *   description: Manga chapters management
 */

/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Get a chapter by ID
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The chapter ID
 *     responses:
 *       200:
 *         description: Chapter data
 *       404:
 *         description: Chapter not found
 */

/**
 * @swagger
 * /api/chapters/manga/{mangaId}:
 *   get:
 *     summary: Get all chapters of a manga (with pagination)
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of chapters per page
 *     responses:
 *       200:
 *         description: List of chapters for the manga
 *       404:
 *         description: Manga not found
 */

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Create a new chapter
 *     tags: [Chapters]
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
 *               - manga
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Chapter 1 - The Beginning"
 *               manga:
 *                 type: string
 *                 example: 64e3a22bf3c1f7d123456789
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/chapters/{id}:
 *   put:
 *     summary: Update a chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Chapter Title"
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chapter not found
 *   delete:
 *     summary: Delete a chapter
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chapter not found
 */

router.get("/:id", getChapterById);
router.get("/manga/:mangaId", getChaptersByManga);
router.post("/", isAuthenticated, createChapter);
router.put("/:id", isAuthenticated, updateChapter);
router.delete("/:id", isAuthenticated, deleteChapter);

module.exports = router;
