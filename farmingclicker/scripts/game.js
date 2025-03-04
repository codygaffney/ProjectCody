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
  populateSeedList();
  updateButtons();
  updateSeedList();

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
        updateButtons();
      } else {
        alert('No empty plots available!');
      }
    } else {
      alert('Not enough money to buy a seed!');
    }
  });

  document.getElementById('upgrade-plot').addEventListener('click', () => {
    upgradePlot();
    updateButtons();
  });

  document.getElementById('unlock-crop').addEventListener('click', () => {
    unlockedCrops = unlockNewCrop(unlockedCrops, crops);
    updateButtons();
    updateSeedList();
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

function populateSeedList() {
  const seedList = document.getElementById('seed-list');
  seedList.innerHTML = ''; // Clear existing content

  crops.forEach((crop, index) => {
    const seedButton = document.createElement('button');
    seedButton.classList.add('seed-item');
    seedButton.dataset.index = index;
    seedButton.disabled = index >= unlockedCrops; // Disable button if seed is locked
    seedButton.innerHTML = `
      <span>${crop.name}</span>
      <span>$${crop.buyPrice}</span>
    `;
    seedButton.addEventListener('click', () => {
      selectSeed(index); // Handle seed selection
    });
    seedList.appendChild(seedButton);
  });
  updateSeedList();
}


function updateSeedList() {
  const seedButtons = document.querySelectorAll('.seed-item');
  seedButtons.forEach((button, index) => {
    if (index < unlockedCrops) {
      button.disabled = false; // Enable button
      button.classList.add('unlocked');
    } else {
      button.disabled = true; // Disable button
      button.classList.remove('unlocked');
    }
  });
}


function selectSeed(index) {
  if (index < unlockedCrops) {
    const selectedSeed = crops[index]; // Get the selected crop
    const seedCost = selectedSeed.buyPrice;

    if (spendMoney(seedCost)) {
      const emptyPlot = [...document.querySelectorAll('.plot')].find(
        (plot) => plot.dataset.status === 'empty'
      );

      if (emptyPlot) {
        plantSeed(emptyPlot, selectedSeed, unlockedCrops); // Plant the seed
        updateButtons(); // Update button prices
      } else {
        alert('No empty plots available!');
        addMoney(seedCost); // Refund the seed cost
      }
    } else {
      alert('Not enough money to plant this seed!');
    }
  }
}
