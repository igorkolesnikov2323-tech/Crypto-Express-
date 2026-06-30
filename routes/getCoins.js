const express = require("express");
const router = express.Router();
const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, '..', "allDB.db"), {
  verbose: console.log,
});

router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const countStmt = db.prepare(`SELECT COUNT(*) AS total FROM coins`);
    const totalCoins = countStmt.get().total;

    const coinsStmt = db.prepare(`SELECT * FROM coins LIMIT ? OFFSET ?`);
    const coins = coinsStmt.all(limit, offset);

    const totalPages = Math.ceil(totalCoins / limit);

    return res.status(200).json({
      success: true,
      data: coins,
      meta: {
        currentPage: page,
        limit: limit,
        totalCoins: totalCoins,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
