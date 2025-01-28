import { getMoney } from './money.js';

const achievements = [
  { name: "Earn $100", achieved: false, condition: () => getMoney() >= 100 },
  { name: "Harvest 50 Crops", achieved: false, condition: () => totalCropsHarvested >= 50 },
];

export let totalCropsHarvested = 0;

export function checkAchievements() {
  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = ''; // Clear the list

  achievements.forEach(achievement => {
    if (!achievement.achieved && achievement.condition()) {
      achievement.achieved = true;
      alert(`Achievement Unlocked: ${achievement.name}`);
    }

    const li = document.createElement('li');
    li.textContent = achievement.name + (achievement.achieved ? " (Unlocked)" : " (Locked)");
    achievementsList.appendChild(li);
  });
}

// Call this function when a crop is harvested
export function incrementCropsHarvested() {
  totalCropsHarvested++;
  checkAchievements();
}
