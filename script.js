let coins = 0;
const coinDisplay = document.getElementById("coins");
const clicker = document.getElementById("clicker");
const loginButton = document.getElementById("login");
const usernameSpan = document.getElementById("username");

clicker.addEventListener("click", () => {
  coins += 1;
  coinDisplay.textContent = coins;
});

loginButton.addEventListener("click", async () => {
  try {
    Pi.init({ version: "2.0" });
    const scopes = ["username"];
    const user = await Pi.authenticate(scopes);
    usernameSpan.textContent = user.username;
  } catch (error) {
    alert("Login failed.");
    console.error(error);
  }
});
