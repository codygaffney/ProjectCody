import { spendMoney } from './money.js';
//import {updateSeedList} from './game.js';

let plotUpgradeCost = 5;
let unlockCropCost = 10;

export function getPlotUpgradeCost() {
  return plotUpgradeCost;
}

export function upgradePlot() {
  if (spendMoney(plotUpgradeCost)) {
    const lowestLevelPlot = [...document.querySelectorAll('.plot')].find(
      (plot) => parseInt(plot.dataset.level) === 1
    );
    if (lowestLevelPlot) {
      plotUpgradeCost += 5; // Increase cost for the next upgrade
      lowestLevelPlot.dataset.level = 2; // Upgrade plot level
      lowestLevelPlot.style.border = '2px solid gold'; // Indicate upgrade
      alert('Plot upgraded! Crops in this plot sell for more.');
    } else {
      alert('No plots available for upgrade!');
    }
  } else {
    alert('Not enough money to upgrade a plot!');
  }
}

export function getUnlockCropCost() {
  return unlockCropCost;
}

export function unlockNewCrop(unlockedCrops, crops) {
  if (money >= unlockCropCost && unlockedCrops < crops.length) {
    spendMoney(unlockCropCost);
    unlockCropCost *= 5; // Increase cost for the next crop unlock
    unlockedCrops++;
    updateMoney();
    updateSeedList();
    alert(`Unlocked new crop: ${crops[unlockedCrops - 1].name}`);
    return unlockedCrops;
  } else {
    alert('Not enough money to unlock a new crop!');
  }
  return unlockedCrops;
}
