const menu = document.querySelector(".menu");
const menuHeaders = document.querySelectorAll(".menu__heading");

const shop = document.querySelector(".shop");
const shopBack = document.querySelector(".shop__btn");

const skins = [];

let level1 = 1;
let level2 = 2;
let level3 = 4;
let level4 = 5;
let level5 = 10;
let difficult = level3;

const playBtn = document.querySelector(".menu__btn_play");
const shopBtn = document.querySelector(".menu__btn_shop");
const score = document.querySelector(".scoreboard__score");
const scoreCoins = document.querySelector(".coinboard__coin");
const record = document.querySelector(".recordboard__score");
let currentRecord;
let currentCoins;
let scoreForPost;

let verticalPlace = true;

let mul = 1;

const road = document.querySelector(".road__container");
const roadAnim = document.querySelector(".road__img");
const turn = document.querySelector(".turn__container");
const qte = document.querySelector(".qte");
const multyTimer = document.querySelector(".multy__container");
const multyTimerBar = document.querySelector(".multy__bar_time");

const defeat = document.querySelector(".defeat");
let car = document.createElement("div");
car.classList.add("main-car");
car.classList.add("skin");
let carPosition = 50;

let allSkins;
let skin = "my-car";

let spawnFlag = true;
let objSpawned = true;

const EMPTY_TABLE = JSON.stringify([
  { score: 0 },
  { score: 0 },
  { score: 0 },
  { score: 0 },
  { score: 0 },
]);

let test = document.querySelector(".testClass");

let reload = document.querySelector(".defeat__btn");
test.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (+currentRecord > +score.textContent) {
    scoreForPost = currentRecord;
  } else scoreForPost = score.textContent;

  if (!localStorage.getItem("recordTable")) {
    localStorage.setItem("recordTable", EMPTY_TABLE);
  }
  if (
    +score.textContent >
    +JSON.parse(localStorage.getItem("recordTable"))[4].score
  ) {
    const newRecordContainer = document.querySelector(".new-record");
    const newRecordInput = document.querySelector(".new-record__input");
    const newRecordBtn = document.querySelector(".new-record__btn");
    let recordName;
    newRecordContainer.style.display = "block";
    newRecordBtn.addEventListener("click", () => {
      recordName = newRecordInput.value;
      let currentTable = JSON.parse(localStorage.getItem("recordTable"));

      currentTable.push({ name: recordName, score: +score.textContent });

      currentTable.sort((a, b) => {
        return b.score - a.score;
      });

      currentTable = currentTable.slice(0, 5);
      localStorage.setItem("recordTable", JSON.stringify(currentTable));

      location.reload();
    });
  } else {
    localStorage.setItem("coins", +currentCoins + +scoreCoins.textContent);
    // localStorage.setItem("record", +scoreForPost);
    location.reload();
  }
});

let box = document.createElement("div");
box.classList.add("box");
let coin = document.createElement("div");

playBtn.addEventListener("click", function () {
  startRace();
  animate();
  menu.remove();
});

getInfo();
function startRace() {
  switch (localStorage.getItem("diff")) {
    case "easy":
      speed = 2;
      roadAnim.style = `background: url(img/road.png) repeat-y; background-position: 50%; animation: slide ${9}s linear infinite; height: 2160px;`;
      break;
    case "normal":
      speed = 6;
      roadAnim.style = `background: url(img/road.png) repeat-y; background-position: 50%; animation: slide ${3}s linear infinite; height: 2160px;`;
      break;
    case "hard":
      speed = 12;
      roadAnim.style = `background: url(img/road.png) repeat-y; background-position: 50%; animation: slide ${1.5}s linear infinite; height: 2160px;`;
      break;
    default:
      break;
  }
  document.body.append(car);

  carPosition = 50;
  car.style = `left: ${carPosition}%; background: url(img/${skin}.png)`;

  spawnFlag = true;
  window.onkeyup = function (event) {
    if (event.key == "a" || event.key == "ф") moveOnLeft();
    if (event.key == "d" || event.key == "в") moveOnRight();
  };
}

function moveOnLeft() {
  switch (carPosition) {
    case 50:
      carPosition = 37;
      car.style = `left: calc(50% - ${160 * 1
        }px); background: url(img/${skin}.png)`;
      break;
    case 63:
      carPosition = 50;
      car.style = `left: calc(50% - ${160 * 0
        }px); background: url(img/${skin}.png)`;
    default:
      break;
  }
}

function moveOnRight() {
  switch (carPosition) {
    case 50:
      carPosition = 63;
      car.style = `left: calc(50% - ${160 * -1
        }px); background: url(img/${skin}.png)`;
      break;
    case 37:
      carPosition = 50;
      car.style = `left: calc(50% - ${160 * 0
        }px); background: url(img/${skin}.png)`;

    default:
      break;
  }
}

let speed = 4;
let gameFrame = 0;

const boxArray = [];
const boxArrayX = [];
const boxArrayY = [];

const coinArray = [];
const coinArrayX = [];
const coinArrayY = [];

const multyArray = [];
const multyArrayX = [];
const multyArrayY = [];

function spawnBox() {
  let box = document.createElement("div");
  box.classList.add("box");
  if (gameFrame % (300 / speed) == 0 && spawnFlag && objSpawned) {
    let place = Math.floor(Math.random() * 4);

    switch (place) {
      case 0:
        break;
      case 1:
        place = 37;
        objSpawned = false;
        box.style = `left: calc(50% - 160px)`;

        break;
      case 2:
        objSpawned = false;
        box.style = `left: calc(50%)`;

        place = 50;
        break;
      case 3:
        objSpawned = false;
        box.style = `left: calc(50% + 160px)`;

        place = 63;
        break;
      default:
        break;
    }
    if (place != 0) {
      boxArray.push(box);
      boxArrayX.push(place);
      boxArrayY.push(850);
      document.body.append(box);
    }
  }
  for (let i = 0; i < boxArray.length; i++) {
    boxArray[i].style.cssText += `bottom: ${(boxArrayY[i] =
      boxArrayY[i] - speed)}px`;
    if (boxArrayY[i] < 0) {
      boxArray[i].remove();
      boxArray.splice(i, 1);
      boxArrayX.splice(i, 1);
      boxArrayY.splice(i, 1);
    }
    if (
      boxArrayY[i] <= 260 &&
      boxArrayY[i] >= 20 &&
      boxArrayX[i] == carPosition
    ) {
      defeat.style = "display: block";
      speed = 0;
      spawnFlag = false;
      roadAnim.style = "animation: none";
      car.remove();
    }
  }
}

function spawnCoin() {
  let coin = document.createElement("div");
  if (gameFrame % 100 == 0 && spawnFlag && objSpawned) {
    let place = Math.floor(Math.random() * 4);
    switch (place) {
      case 0:
        break;
      case 1:
        place = 37;
        objSpawned = false;
        coin.style = `left: calc(50% - 160px)`;
        break;
      case 2:
        place = 50;
        objSpawned = false;
        coin.style = `left: calc(50%)`;
        break;
      case 3:
        place = 63;
        objSpawned = false;
        coin.style = `left: calc(50% + 160px)`;
        break;
      default:
        break;
    }
    if (place != 0) {
      coin.classList.add("coin");
      coinArray.push(coin);
      coinArrayX.push(place);
      coinArrayY.push(850);
      document.body.append(coin);
    }
  }
  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i].style.cssText += `bottom: ${(coinArrayY[i] =
      coinArrayY[i] - speed)}px`;
    if (coinArrayY[i] < 0) {
      coinArray[i].remove();
      coinArray.splice(i, 1);
      coinArrayX.splice(i, 1);
      coinArrayY.splice(i, 1);
    }
    if (
      coinArrayY[i] <= 260 &&
      coinArrayY[i] >= 20 &&
      coinArrayX[i] == carPosition
    ) {
      coinArray[i].remove();
      coinArray.splice(i, 1);
      coinArrayX.splice(i, 1);
      coinArrayY.splice(i, 1);
      scoreCoins.textContent = +scoreCoins.textContent + 1;
    }
  }
}

function spawnMulty() {
  if (gameFrame % 1000 == 0 && spawnFlag && objSpawned) {
    let multy = document.createElement("div");
    multy.classList.add("multy");
    let place = Math.floor(Math.random() * 4);
    switch (place) {
      case 0:
        break;
      case 1:
        place = 37;
        objSpawned = false;
        multy.style = `left: calc(50% - 160px)`;
        break;
      case 2:
        place = 50;
        objSpawned = false;
        multy.style = `left: calc(50%)`;
        break;
      case 3:
        place = 63;
        multy.style = `left:calc(50% + 160px)`;
        objSpawned = false;
        break;
      default:
        break;
    }
    if (place != 0) {
      multyArray.push(multy);
      multyArrayX.push(place);
      multyArrayY.push(850);
      document.body.append(multy);
    }
  }
  for (let i = 0; i < multyArray.length; i++) {
    multyArray[i].style.cssText += `bottom: ${(multyArrayY[i] =
      multyArrayY[i] - speed)}px`;
    if (multyArrayY[i] < 0) {
      multyArray[i].remove();
      multyArray.splice(i, 1);
      multyArrayX.splice(i, 1);
      multyArrayY.splice(i, 1);
    }
    if (
      multyArrayY[i] <= 260 &&
      multyArrayY[i] >= 20 &&
      multyArrayX[i] == carPosition
    ) {
      multyArray[i].remove();
      multyArray.splice(i, 1);
      multyArrayX.splice(i, 1);
      multyArrayY.splice(i, 1);
      let time = 100;
      let timerId = setInterval(() => {
        multyTimerBar.style = `width: ${(time -= 1)}%`;
      }, 100);
      setTimeout(() => {
        mul = 1;
        multyTimer.style = "display: none";
        clearInterval(timerId);
      }, 10000);

      multyTimer.style = "display: flex";
      mul = 2;
    }
  }
}

function scoreInc() {
  if (gameFrame % (Math.ceil(25 / speed) * 5) == 0 && spawnFlag) {
    score.textContent = +score.textContent + 1 * mul;
  }
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function animate() {
  gameFrame++;
  spawnBox();
  spawnMulty();
  spawnCoin();
  scoreInc();

  objSpawned = true;
  requestAnimationFrame(animate);
}

async function getInfo() {
  // record.textContent = localStorage.getItem("record");

  // currentRecord = localStorage.getItem("record");
  menuHeaders[2].textContent = `Balance : ${localStorage.getItem("coins")}`;
  currentCoins = localStorage.getItem("coins");
  menuHeaders[1].textContent = `${localStorage.getItem("diff")}`;
}

var audio = document.getElementById("audio");
let isMuted = false;
let controlsVolume = document.querySelector(".music");
let volume = document.querySelector(".music__img");
controlsVolume.addEventListener("click", () => {
  if (isMuted) {
    audio.volume = 0.02;
    isMuted = false;
    volume.style = "background-image: url(img/logoForMusic.png);";
  } else {
    audio.volume = 0;
    isMuted = true;
    volume.style = "background-image: url(img/logoForMusicOff.png);";
  }
});

shopBtn.addEventListener("click", function () {
  menu.style = "display: none";
  shop.style = "display: flex";

  shopBack.addEventListener("click", () => {
    shop.style = "display: none";
    menu.style = "display: flex";
  });

  const shopItems = document.querySelectorAll(".shop__item");
  shopItems.forEach((el) =>
    el.addEventListener("click", () => {
      el.innerHTML = "<div class='marked'></div>";
      for (let item of shopItems) {
        if (el != item) item.innerHTML = "";
        else el.innerHTML = "<div class='marked'></div>";
      }

      let skinId = el.id;
      switch (skinId) {
        case "skin0":
          break;
        case "skin1":
          skin = "skin1";
          break;
        case "skin2":
          skin = "skin2";
          break;
        case "skin3":
          skin = "skin3";
          break;
        default:
          break;
      }
    })
  );
});

// DIFFICULT

const difficultMenu = document.querySelector(".difficult__container");
const difficultBtn = document.querySelector(".menu__difficult");
difficultBtn.addEventListener("click", () => {
  difficultMenu.style.display = "block";
});

const difficults = document.querySelectorAll(".difficult__item");
difficults.forEach((item) => {
  console.log(item.dataset.diff);
  item.addEventListener("click", () => {
    localStorage.setItem("diff", item.dataset.diff);
    menuHeaders[1].textContent = `${localStorage.getItem("diff")}`;
    difficultMenu.style.display = "none";
  });
});

// RECORD

const recordMenu = document.querySelector(".record__container");
const recordBtn = document.querySelector(".menu__btn_recordTable");
const recordBtnBack = document.querySelector(".record__btn");

const recordScoreColums = document.querySelectorAll(".col-score");
const recordNameColumns = document.querySelectorAll(".col-name");

if (localStorage.getItem("recordTable")) {
  const recordTable = JSON.parse(localStorage.getItem("recordTable"));
  recordScoreColums.forEach((item, i) => {
    item.textContent = recordTable[i].score;
  });
  recordNameColumns.forEach((item, i) => {
    item.textContent = recordTable[i].name;
  });
}

recordBtn.addEventListener("click", () => {
  recordMenu.style.display = "block";
  menu.style = "display: none";
});

recordBtnBack.addEventListener("click", () => {
  recordMenu.style = "display: none";
  menu.style = "display: flex";
});
