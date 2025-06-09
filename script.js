
let coins = parseFloat(localStorage.getItem("coins")) || 0;
let cps = parseFloat(localStorage.getItem("cps")) || 0;
let upgrades = [
    { name: "Node v1", cost: 10, value: 0.2 },
    { name: "Node v2", cost: 50, value: 1 },
    { name: "Node Cluster", cost: 200, value: 4 },
];

const coinCount = document.getElementById("coin-count");
const cpsDisplay = document.getElementById("cps");
const upgradesDiv = document.getElementById("upgrades");
const coin = document.getElementById("coin");

const clickSound = new Audio("assets/sounds/click.mp3");

function updateUI() {
    coinCount.textContent = coins.toFixed(1);
    cpsDisplay.textContent = cps.toFixed(1);
    upgradesDiv.innerHTML = "";
    upgrades.forEach((upg, i) => {
        const btn = document.createElement("button");
        btn.textContent = `${upg.name} (${upg.cost} 🪙)`;
        btn.onclick = () => buyUpgrade(i);
        upgradesDiv.appendChild(btn);
    });
}

function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (coins >= upgrade.cost) {
        coins -= upgrade.cost;
        cps += upgrade.value;
        upgrade.cost = Math.ceil(upgrade.cost * 1.4);
        saveGame();
        updateUI();
    }
}

coin.onclick = () => {
    coins += 1;
    clickSound.play();
    saveGame();
    updateUI();
};

function passiveGain() {
    coins += cps / 10;
    saveGame();
    updateUI();
}

function saveGame() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("cps", cps);
}

setInterval(passiveGain, 100);
updateUI();
