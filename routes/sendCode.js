/*------ Get users email from register.js and send the verification code -------- */

const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendCode(app, email, username, password) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodes = app.get("verificationCodes");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  verificationCodes[email] = {
    code: code,
    expiresAt: Date.now() + 5 * 60 * 1000,
    username: username,
    password: password,
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification code",
    text: `Your verification code ${code}`,
  };

  await transporter.sendMail(mailOptions);
  return true;
}

module.exports = sendCode;
