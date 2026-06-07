const express = require("express");
const router = express.Router();
const path = require("path");

// path ot html file
const pathToFile = path.join(__dirname, "..", "public", "html", "about.html");

// GET About Page
router.get("/", (req, res) => {
  res.status(200).sendFile(pathToFile);
});

module.exports = router;
