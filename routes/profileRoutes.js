const express = require("express");

const router = express.Router();

const {
    create,
    getProfile,
    update
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, create);

router.get("/", authMiddleware, getProfile);

router.put("/update", authMiddleware, update);

module.exports = router;