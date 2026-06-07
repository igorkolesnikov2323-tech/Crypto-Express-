const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SEKRET = process.env.JWT_SEKRET;
const path = require("path");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "..", "allDB.db"), {
  verbose: console.log,
});

router.post("/", async (req, res) => {
  try {
    // Get and parse data from loginData.js
    const email = req.body.email;
    const password = req.body.password;

    // Validate the data
    if (email === "" || password === "") {
      return res.status(400).json({ error: "All fields must be allowed" });
    }

    // Check if user exists in Database 
    const userStmt = db.prepare(
      `SELECT *, password FROM users WHERE email = ?`,
    );
    const user = userStmt.get(email);

    // If user not found in Database send the error
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    // Hash the password
    const result = await bcrypt.compare(password, user.password);

    // Check if password is right
    if (!result) {
      console.log("Invalid Email or Pasword");
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Create the token 
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.roles },
      JWT_SEKRET,
      { expiresIn: "24h" },
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    })
    return res
      .status(200)
      .json({ success: true, message: "Login Successful"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
