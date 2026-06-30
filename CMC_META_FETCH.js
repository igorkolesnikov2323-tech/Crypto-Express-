require("dotenv").config();
const key = process.env.CMC_API_KEY;
const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const { verbose } = require("sqlite3");
const db = new Database(path.join(__dirname, "allDB.db"), {
  verbose: console.log,
});

function geiCoinId(){
  const stmt = db.prepare(`SELECT id FROM coins`)
  const result = stmt.all()

  const coinId = result.map(row=>row.id)
  return coinId
}


async function CMC_META_FETCH() {
  try {

    const idArray = await geiCoinId()
    const idString = await idArray.join(',')

    const url = new URL(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"
    );
    url.searchParams.append('id', idString)

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": key,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();

    fs.writeFileSync(
      path.join(__dirname, "public", "data", "crypto-meta.json"),
      JSON.stringify(data.data),
    );
  } catch (error) {
    console.log(error.message);
  }
  finally{
    setTimeout(CMC_META_FETCH, 1000 * 60 * 60 * 5)
  }
}

module.exports = CMC_META_FETCH
