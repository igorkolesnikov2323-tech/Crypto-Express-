const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "allDB.db"), {
  verbose: console.log,
});

function createTable(){
  try {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)
  } catch (error) {
    console.log(error.message)
  }
}
createTable()

