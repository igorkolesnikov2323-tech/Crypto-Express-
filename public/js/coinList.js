const URLToJSON = "data/crypto-cache.json";
const listContainer = document.querySelector(".main__flex");

async function createHTMLElement() {
  try {
    let response = await fetch(URLToJSON);
    let data = await response.json();
    listContainer.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
      let listItem = document.createElement("div");
      listItem.className = "list__item";
      listItem.innerHTML = `
                 <p class="coin__name">-</p>
                <p class="coin__price">-</p>
            `;
      listContainer.append(listItem);
    }
    getCoinData();
    console.log('Список создан')
  } catch (error) {
    console.error(error.message);
  }
}

createHTMLElement();

async function getCoinData() {
  try {
    const coinNames = document.querySelectorAll(".coin__name");
    const coinPrices = document.querySelectorAll(".coin__price");
    let response = await fetch(URLToJSON);
    let data = await response.json();
    coinNames.forEach((element, index) => {
      element.innerText = data[index].symbol + "/USDT";
      if (data[index].symbol === "USDT") {
        element.innerText = data[index].symbol;
      }
    });
    coinPrices.forEach((element, index) => {
      const symbols = data[index].symbol;
      const priceValue = data.find((coin) => coin.symbol === symbols).quote.USD
        .price;
      element.innerText = `${priceValue.toFixed(2)} $`;
    });
    console.log('Данные обновлены в спике')
  } catch (error) {
    console.error(error.message);
  } finally {
    setTimeout(getCoinData, 5000);
  }
}
