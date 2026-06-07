const express = require("express");
const router = express.Router();
const path = require("path");
const { validateEmail, validatePassword } = require("../validation");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "..", "allDB.db"), {
  verbose: console.log,
});

// POST request
router.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (
      username?.trim() === "" ||
      email?.trim() === "" ||
      password?.trim() === ""
    ) {
      return res.status(400).json({ error: "All fields must be filled out" });
    }

    if (validateEmail(email.trim()) && validatePassword(password.trim())) {
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);

      const usernamestmt = db.prepare(
        `SELECT username FROM users WHERE username = ?`,
      );
      const usernameSearch = usernamestmt.get(username);
      const emailstmt = db.prepare(`SELECT email FROM users WHERE email = ?`);
      const emailSearch = emailstmt.get(email);

      if (usernameSearch === undefined && emailSearch === undefined) {
        const now = new Date();
        const createdAt = now.toISOString();
        const stmt = db.prepare(
          `INSERT INTO users (username, email, password, created_at, roles) VALUES (?, ?, ?, ?, ?)`,
        );
        stmt.run(username, email, hashedPassword, createdAt, 'user');
      }
      if (usernameSearch !== undefined) {
        return res.status(400).json({ error: "username already exists" });
      } else if (emailSearch !== undefined) {
        return res.status(400).json({ error: "email already exists" });
      }

      console.log("User registered");
      return res
        .status(201)
        .json({ success: true, message: "User registered" });
    } else {
      return res.status(400).json({ error: "invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error: 500" });
  }
});

module.exports = router;
