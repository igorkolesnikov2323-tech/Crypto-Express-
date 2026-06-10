/* ----------- Check verification code and add user to Database ---------------- */

const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "..", "allDB.db"), {
  verbose: console.log,
});

router.post('/', async (req, res)=>{
    const email = req.body.email
    const code = req.body.code
    const verificationCodes = req.app.get("verificationCodes");

    const record = verificationCodes[email]

    if(!record){
        return res.status(400).json({error: 'Код не запрашивался или уже устарел'})
    }

    if(Date.now()>record.expiresAt){
        delete verificationCodes[email]
        return res.status(400).json({error: 'Срок записи уже истёк'})
    }

    if(code !== record.code){
        return res.status(400).json({error: 'Неверный код'})
    }

    try {

        const username = record.username
        const password = record.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const now = new Date();
        const createdAt = now.toISOString();
        const stmt = db.prepare(
          `INSERT INTO users (username, email, password, created_at, roles) VALUES (?, ?, ?, ?, ?)`,
        );
        stmt.run(username, email, hashedPassword, createdAt, "user");
        console.log("User registered");

        delete verificationCodes[email]
        return res.status(201).json({success: true, message: 'Пользователь успешно зарегистрирован'})

    } catch (error) {
        console.error('Ошибка регистрации пользователя')
        return res.status(400).json({error: 'Ошибка регистрации пользователя'})
    }
})

module.exports = router