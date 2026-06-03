const express = require("express");
const router = express.Router();
const path = require("path");
/* import { validateEmail, validatePassword } from '../public/js/validateDataFromForm' */

// POST request
router.post("/", (req, res) => {
  res.status(200).sendFile(pathToFile);
});

module.exports = router