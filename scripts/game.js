import { getMoney, addMoney, spendMoney } from './money.js';
import { initializeFarm, plantSeed } from './farm.js';
import { upgradePlot, unlockNewCrop, getPlotUpgradeCost, getUnlockCropCost } from './upgrades.js';

let crops = [];
let unlockedCrops = 1;

document.addEventListener('DOMContentLoaded', () => {
  // Fetch crops data
  fetch('./data/crops.json')
    .then((response) => response.json())
    .then((data) => {
      crops = data;
      initializeGame();
    })
    .catch((error) => console.error('Error loading crops:', error));
});

function initializeGame() {
  initializeFarm();
  updateButtons();

  // Attach button event listeners
  document.getElementById('buy-seed').addEventListener('click', () => {
    const currentCrop = crops[unlockedCrops - 1];
    const seedCost = currentCrop.buyPrice;

    if (spendMoney(seedCost)) {
      const emptyPlot = [...document.querySelectorAll('.plot')].find(
        (plot) => plot.dataset.status === 'empty'
      );
      if (emptyPlot) {
        plantSeed(emptyPlot, currentCrop, unlockedCrops);
      } else {
        alert('No empty plots available!');
      }
    } else {
      alert('Not enough money to buy a seed!');
    }
  });

  document.getElementById('upgrade-plot').addEventListener('click', () => {
    upgradePlot();
  });

  document.getElementById('unlock-crop').addEventListener('click', () => {
    unlockedCrops = unlockNewCrop(unlockedCrops, crops);
  });
}

function updateButtons() {
  const currentCrop = crops[unlockedCrops - 1];
  const seedCost = currentCrop ? currentCrop.buyPrice : 0;
  const plotUpgradeCost = getPlotUpgradeCost(); // Get the current plot upgrade cost
  const unlockCropCost = getUnlockCropCost(); // Get the current crop unlock cost

  document.getElementById(
    'buy-seed'
  ).textContent = `Buy Seed ($${seedCost})`;
  document.getElementById(
    'upgrade-plot'
  ).textContent = `Upgrade Plot ($${plotUpgradeCost})`;
  document.getElementById(
    'unlock-crop'
  ).textContent = `Unlock New Crop ($${unlockCropCost})`;
}
