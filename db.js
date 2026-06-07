const path = require('path')
const Database = require('better-sqlite3')
const db = new Database(path.join(__dirname, 'allDB.db'), {verbose: console.log})

const rolesStmt = db.prepare(`ALTER TABLE users ADD COLUMN roles TEXT DEFAULT 'user'`)
rolesStmt.run()