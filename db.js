const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "allDB.db"), {
  verbose: console.log,
});
const fs = require("fs");

/* const rolesStmt = db.prepare(`ALTER TABLE users ADD COLUMN roles TEXT DEFAULT 'user'`)
rolesStmt.run() */

const deleteStml = db.prepare(`DELETE FROM users WHERE id = 26`)
deleteStml.run()

/* const stmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS coins (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    price REAL,
    percent_change_1h REAL,
    percent_change_24h REAL,
    market_cap REAL,
    volume_24h REAL,
    date_added TEXT
  )
`);
stmt.run(); */