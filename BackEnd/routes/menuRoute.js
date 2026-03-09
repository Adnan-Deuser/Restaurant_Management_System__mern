const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { isVerifiedUser } = require("../middleware/tokenVerification");

// We can restrict to Admin using isVerifiedUser and role checking if needed, but for now we'll just require auth
router.post("/category", isVerifiedUser, menuController.addCategory);
router.post("/dish", isVerifiedUser, menuController.addDish);

module.exports = router;
