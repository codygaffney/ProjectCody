let money = 10;

export function getMoney() {
  return money;
}

export function addMoney(amount) {
  money += amount;
  updateMoneyDisplay();
}

export function spendMoney(amount) {
  if (money >= amount) {
    money -= amount;
    updateMoneyDisplay();
    return true;
  }
  return false;
}

function updateMoneyDisplay() {
  document.getElementById('money').textContent = `$${money}`;
}
