const express = require("express");
const multer = require("multer");
const upload = multer({
    storage:multer.memoryStorage()
})
const musicController = require("../controllers/music.controller")
const router = express.Router();
router.post("/upload", upload.single("music"),  musicController.createMusic)
module.exports = router;