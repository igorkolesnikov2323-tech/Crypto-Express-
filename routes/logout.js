const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({success: true, message: 'Logged out'})
});

module.exports = router;
