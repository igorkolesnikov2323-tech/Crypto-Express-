let currentPage = 1;
const limit = 10;

const URLToJSON = "data/crypto-cache.json";
const listContainer = document.querySelector(".main__flex");
import { convertTime } from "./convertTime.js";
import { convertNumber } from "./convertNumber.js";
const array1H = {};
const array24H = {};
const URLToMeta = "data/crypto-meta.json";
let metaDataArr = []

async function loadCoins(page) {
  try {
    let response = await fetch(
      `http://localhost:3000/api/coins?page=${page}&limit=${limit}`,
    );
    const data = await response.json();

    if (data.success) {
      renderHTML(data.data);
      setupPagination(data.meta);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function loadMeta() {
  try {
    let responseMeta = await fetch('data/crypto-meta.json')
    let metaData = await responseMeta.json()

    metaDataArr = Object.values(metaData)

    loadCoins(currentPage);
    
  } catch (error) {
    console.error(error.message)
  }
}

loadMeta()

function renderHTML(data) {
  listContainer.innerHTML = "";

  for (let index = 0; index < data.length; index++) {
    let listItem = document.createElement("div");
    listItem.className = "list__item";
    listItem.innerHTML = `
       <p class="coin__name">${data[index].name}</p>
       <p class="coin__price">$${data[index].price.toFixed(2)}</p>
       <p class="coin__1h">${data[index].percent_change_1h.toFixed(2)} %</p>
       <p class="coin__24h">${data[index].percent_change_24h.toFixed(2)} %</p>
       <p class="coin__market-cap">${convertNumber(data[index].market_cap)}</p>
       <p class="coin__volume">${convertNumber(data[index].volume_24h)}</p>
       <p class="coin__dex">-</p>
       <p class="coin__age">${convertTime(data[index].date_added)}</p>
       <p class="coin__dextxns">-</p>
    `;

    const coin1hElement = listItem.querySelector(".coin__1h");
    if (data[index].percent_change_1h > 0)
      coin1hElement.style.color = "#16C784";
    if (data[index].percent_change_1h < 0)
      coin1hElement.style.color = "#EA3943";

    const coin24hElement = listItem.querySelector(".coin__24h");
    if (data[index].percent_change_24h > 0)
      coin24hElement.style.color = "#16C784";
    if (data[index].percent_change_24h < 0)
      coin24hElement.style.color = "#EA3943";

    listContainer.append(listItem);
  }
  const coinName = document.querySelectorAll(".coin__name");

  coinName.forEach((item) => {
    item.addEventListener("click", (event) => {
      const clickedName = event.target.innerText.toLowerCase().trim()
      const coin = metaDataArr.find(coin => coin.name.toLowerCase() === clickedName)

      window.location.href = `http://localhost:3000/coin-info/${coin.slug}`;
    });
  });
}

function setupPagination(meta) {
  const paginationContainer = document.querySelector(".pages");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("div");
  prevButton.className = "pages__item";
  prevButton.innerText = "<-";

  if (meta.currentPage === 1) {
    prevButton.style.opacity = "0.5";
    prevButton.style.cursor = "not-allowed";
  } else {
    prevButton.addEventListener("click", () => {
      currentPage--;
      loadCoins(currentPage);
    });
  }
  paginationContainer.append(prevButton);

  for (let i = 1; i <= meta.totalPages; i++) {
    const pageButton = document.createElement("div");
    pageButton.className = "pages__item";
    pageButton.innerText = i;

    if (i === meta.currentPage) {
      pageButton.style.backgroundColor = "#3861fb";
      pageButton.style.color = "#ffffff";
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      loadCoins(currentPage);
    });

    paginationContainer.append(pageButton);
  }

  const nextButton = document.createElement("div");
  nextButton.className = "pages__item";
  nextButton.innerText = "->";

  if (meta.currentPage === meta.totalPages) {
    nextButton.style.opacity = "0.5";
    nextButton.style.cursor = "not-allowed";
  } else {
    nextButton.addEventListener("click", () => {
      currentPage++;
      loadCoins(currentPage);
    });
  }
  paginationContainer.append(nextButton);
}