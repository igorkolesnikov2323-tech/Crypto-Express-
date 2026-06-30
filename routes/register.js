/*  Validate data from frontend and check if user already exists in database */

const express = require("express");
const router = express.Router();
const path = require("path");
const { validateEmail, validatePassword } = require("../validation");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "..", "allDB.db"), {
  verbose: console.log,
});
const sendCode = require('./sendCode')

// POST request
router.post("/", async (req, res) => {
  try {
    // 1 Get and parse data from request
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // 2 Throw an error if fields are empty
    if (
      !username?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return res.status(400).json({ error: "All fields must be filled out" });
    }

    // if email, password and username are ok then...
    if (validateEmail(email.trim()) && validatePassword(password.trim())) {
      // 2.1 check in database if user already exists
      const usernamestmt = db.prepare(
        `SELECT username FROM users WHERE username = ?`,
      );
      const usernameSearch = usernamestmt.get(username);
      const emailstmt = db.prepare(`SELECT email FROM users WHERE email = ?`);
      const emailSearch = emailstmt.get(email);

      // if user exists
      if (usernameSearch !== undefined) {
        return res.status(400).json({ error: "username already exists" });
      } else if (emailSearch !== undefined) {
        return res.status(400).json({ error: "email already exists" });
      }

      // if user not exists
      if (usernameSearch === undefined && emailSearch === undefined) {
        // send the email to sendCode that sends the ver. code to user
        try {
          sendCode(req.app, email, username, password)
          return res
            .status(201)
            .json({ success: true, message: "verification code sent to email" });
        } catch (error) {
          console.error(
            error.message
          );
        }
      }
    } else {
      return res.status(400).json({ error: "invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error: 500" });
  }
});

module.exports = router;
