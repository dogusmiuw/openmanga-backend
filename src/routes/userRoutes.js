const express = require("express");
const router = express.Router();

const {deactivateUser} = require("../controllers/userController");
const {isAuthenticated} = require("../middlewares/authMiddleware");
const {isModerator} = require("../middlewares/roleMiddleware");

router.patch("/:id/deactivate", isAuthenticated, isModerator, deactivateUser);

module.exports = router;
