/*------ Get users email from register.js and send the verification code -------- */

const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require('nodemailer')
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username
  const password = req.body.password
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodes = req.app.get("verificationCodes");

  verificationCodes[email] = {
    code: code,
    expiresAt: Date.now() + 5 * 60 * 1000,
    username: username,
    password: password
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Код подтверждения',
    text: `Ваш код подтверждения ${code}`
  }

   await transporter.sendMail(mailOptions)

  res.status(200).json({success: true, message: `Code sent ${code}`})
});

module.exports = router;
