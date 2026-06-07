const express = require("express");
const router = express.Router();
const path = require("path");

//path to HTML File
const pathToFile = path.join(__dirname, "..", "public", "html", "login.html");

router.get("/", (req, res) => {
  res.status(200).sendFile(pathToFile);
});

module.exports = router;
