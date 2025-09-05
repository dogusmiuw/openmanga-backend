const express = require("express");
const router = express.Router();

const {deactivateUser} = require("../controllers/userController");
const {isAuthenticated} = require("../middlewares/authMiddleware");
const {isModerator} = require("../middlewares/roleMiddleware");
const {
    getMyProfile,
    updateMyProfile,
} = require("../controllers/userController");

// user
router.get("/", isAuthenticated, getAllUsers);
router.get("/me", isAuthenticated, getMyProfile);
router.put("/me", isAuthenticated, updateMyProfile);
router.delete("/me", isAuthenticated, deleteMyAccount);

// moderator
router.patch("/:id/deactivate", isAuthenticated, isModerator, deactivateUser);

module.exports = router;
