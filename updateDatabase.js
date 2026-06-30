const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "allDB.db"), {
  verbose: console.log,
});
const fs = require("fs");

const checkStmt = db.prepare("SELECT COUNT(*) AS total FROM coins");
const hasCoins = checkStmt.get().total > 0;

function updateDatabase(){
    try {
    const pathToFile = path.join(__dirname, "public", "data", "crypto-cache.json");
    const file = fs.readFileSync(pathToFile, { encoding: "utf8", flag: "r" });
    const coinsArray = JSON.parse(file)

    const saveStmt = db.prepare(`INSERT OR REPLACE INTO coins 
        (
            id, name, symbol, price, percent_change_1h, percent_change_24h, market_cap, volume_24h, date_added
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    const saveMany = db.transaction((coins) => {
      for (const coin of coins) {
        saveStmt.run(
          coin.id,
          coin.name,
          coin.symbol,
          coin.quote.USD.price,
          coin.quote.USD.percent_change_1h,
          coin.quote.USD.percent_change_24h,
          coin.quote.USD.market_cap,
          coin.quote.USD.volume_24h,
          coin.date_added
        );
      }
    });

    saveMany(coinsArray);
    console.log(`Data updated!: ${coinsArray.length}`);

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { updateDatabase }