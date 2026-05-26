const URLToJSON = "data/crypto-cache.json";
const listContainer = document.querySelector(".main__flex");
import { convertTime } from './convertTime.js';
import { convertNumber } from './convertNumber.js';

async function createHTMLElement() {
  try {
    let response = await fetch(URLToJSON);
    let data = await response.json();
    /* listContainer.innerHTML = ""; */
    for (let index = 0; index < data.length; index++) {
      let listItem = document.createElement("div");
      listItem.className = "list__item";
      listItem.innerHTML = `
                 <p class="coin__name">-</p>
                <p class="coin__price">-</p>
                <p class="coin__1h">-</p>
                <p class="coin__24h">-</p>
                <p class="coin__market-cap">-</p>
                <p class="coin__volume">-</p>
                <p class="coin__dex">-</p>
                <p class="coin__age">-</p>
                <p class="coin__dextxns">-</p>
            `;
      listContainer.append(listItem);
    }
    getCoinData();
    console.log("Список создан");
  } catch (error) {
    console.error(error.message);
  }
}

createHTMLElement();

async function getCoinData() {
  try {
    const coinNames = document.querySelectorAll(".coin__name");
    const coinPrices = document.querySelectorAll(".coin__price");
    const coin1H = document.querySelectorAll(".coin__1h");
    const coin24H = document.querySelectorAll(".coin__24h");
    const coinMC = document.querySelectorAll(".coin__market-cap");
    const coinVolume = document.querySelectorAll(".coin__volume");
    const coinDEX = document.querySelectorAll(".coin__dex");
    const coinAge = document.querySelectorAll(".coin__age");
    const coinDEXTXNS = document.querySelectorAll(".coin__dextxns");
    let response = await fetch(URLToJSON);
    let data = await response.json();
    coinNames.forEach((element, index) => {
      element.innerText = data[index].name;
      if (data[index].symbol === "USDT") {
        element.innerText = data[index].symbol;
      }
    });
    coinPrices.forEach((element, index) => {
      const symbols = data[index].symbol;
      const priceValue = data.find((coin) => coin.symbol === symbols).quote.USD
        .price;
      element.innerText = `$ ${priceValue.toFixed(4)}`;
    });
    coin1H.forEach((element, index)=>{
      const symbols = data[index].symbol;
      const oneHourValue = data.find((coin) => coin.symbol === symbols).quote.USD
        .percent_change_1h;
        element.innerText = `${oneHourValue.toFixed(4)} %`;
    })
    coin24H.forEach((element, index)=>{
      const symbols = data[index].symbol;
      const oneHourValue = data.find((coin) => coin.symbol === symbols).quote.USD
        .percent_change_24h;
        element.innerText = `${oneHourValue.toFixed(4)} %`;
    })
    coinMC.forEach((element, index)=>{
      const symbols = data[index].symbol;
      const MarketCap = data.find((coin) => coin.symbol === symbols).quote.USD
        .market_cap;
        element.innerText = convertNumber(MarketCap);
    })
    coinVolume.forEach((element, index)=>{
      const symbols = data[index].symbol;
      const Volume = data.find((coin) => coin.symbol === symbols).quote.USD
        .volume_24h;
        element.innerText = convertNumber(Volume);
    })
    coinAge.forEach((element, index)=>{
      const symbols = data[index].symbol;
      const date = data.find((coin) => coin.symbol === symbols).date_added
      const oneHourValue = convertTime(date)
        element.innerText = oneHourValue;
    })
    console.log("Данные обновлены в спике");
  } catch (error) {
    console.error(error.message);
  } finally {
    setTimeout(getCoinData, 60000);
  }
}
