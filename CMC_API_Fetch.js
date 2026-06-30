require("dotenv").config();
const key = process.env.CMC_API_KEY;
const fs = require("fs");
const path = require("path");
const nums = [];

async function run() {
  try {
    const url = new URL(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    );
    url.search = new URLSearchParams({
      start: "1",
      limit: "80",
      convert: "USD",
    }).toString();
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
    //Write data to JSON File
    fs.writeFileSync(
      path.join(__dirname, "public", "data", "crypto-cache.json"),
      JSON.stringify(data.data),
      { encoding: "utf8", flag: "w" },
    );
    console.log("Получены данные из CoinMarketCap и занесены в JSON");
  } catch (error) {
    console.error("Request error:", error.message);
  } finally {
    setTimeout(run, 1800000);
  }
}

module.exports = run;
