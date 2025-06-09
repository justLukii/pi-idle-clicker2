
let coins = parseFloat(localStorage.getItem('coins')) || 0;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [
  { name: "Node v1", cost: 10, value: 1, owned: 0, img: "node1.png" },
  { name: "Node v2", cost: 100, value: 10, owned: 0, img: "node2.png" },
  { name: "Cluster", cost: 1000, value: 50, owned: 0, img: "cluster.png" },
  { name: "Mega Cluster", cost: 5000, value: 200, owned: 0, img: "megacluster.png" }
];

let clickSound = document.getElementById("clickSound");

function updateDisplay() {
  document.getElementById("coins").textContent = Math.floor(coins);
  document.getElementById("cps").textContent = cps.toFixed(1);
  localStorage.setItem("coins", coins);
  localStorage.setItem("cps", cps);
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

function createUpgradeButtons() {
  let container = document.getElementById("upgrades");
  container.innerHTML = "";
  upgrades.forEach((upg, index) => {
    let btn = document.createElement("button");
    btn.innerHTML = `<img class="icon" src="${upg.img}" /> ${upg.name}<br>Owned: ${upg.owned} | Cost: ${Math.floor(upg.cost)}`;
    btn.onclick = () => {
      if (coins >= upg.cost) {
        coins -= upg.cost;
        upg.owned += 1;
        cps += upg.value;
        upg.cost = Math.floor(upg.cost * 1.5);
        updateDisplay();
        createUpgradeButtons();
      }
    };
    container.appendChild(btn);
  });
}

document.getElementById("coin").onclick = () => {
  coins += 1;
  clickSound.currentTime = 0;
  clickSound.play();
  updateDisplay();
  saveHighscore();
};

setInterval(() => {
  coins += cps / 10;
  updateDisplay();
}, 100);

// Rangliste (lokal, 5 Einträge)
function saveHighscore() {
  let scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  let name = localStorage.getItem("username");
  if (!name) {
    name = prompt("Enter your name:");
    localStorage.setItem("username", name);
  }
  scores = scores.filter(entry => entry.name !== name);
  scores.push({ name, coins: Math.floor(coins) });
  scores.sort((a, b) => b.coins - a.coins);
  scores = scores.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(scores));
  renderLeaderboard(scores);
}

function renderLeaderboard(scores) {
  let container = document.getElementById("leaderboard");
  container.innerHTML = "";
  scores.forEach((entry, idx) => {
    container.innerHTML += `<p>${idx + 1}. ${entry.name} - ${entry.coins} Coins</p>`;
  });
}

createUpgradeButtons();
updateDisplay();
renderLeaderboard(JSON.parse(localStorage.getItem("leaderboard") || "[]"));
