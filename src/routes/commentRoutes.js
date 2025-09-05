const express = require("express");
const router = express.Router();

const {
    createComment,
    getCommentsByChapter,
    getCommentsByManga,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

const {isAuthenticated} = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manga and chapter comments management
 */

/**
 * @swagger
 * /api/comments/chapter/{chapterId}:
 *   get:
 *     summary: Get comments for a specific chapter (with pagination)
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The chapter ID
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
 *         description: Number of comments per page
 *     responses:
 *       200:
 *         description: List of comments for the chapter
 *       404:
 *         description: Chapter not found
 */

/**
 * @swagger
 * /api/comments/manga/{mangaId}:
 *   get:
 *     summary: Get comments for a specific manga
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The manga ID
 *     responses:
 *       200:
 *         description: List of comments for the manga
 *       404:
 *         description: Manga not found
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - targetId
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This chapter was amazing!"
 *               targetId:
 *                 type: string
 *                 example: 64e3a22bf3c1f7d123456789
 *               targetType:
 *                 type: string
 *                 enum: [manga, chapter]
 *                 example: chapter
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

router.get("/chapter/:chapterId", getCommentsByChapter);
router.get("/manga/:mangaId", getCommentsByManga);
router.post("/", isAuthenticated, createComment);
router.put("/:id", isAuthenticated, updateComment);
router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;
