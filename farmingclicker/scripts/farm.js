import { addMoney } from './money.js';

export const numPlots = 9; // Total plots in the grid

export function initializeFarm() {
  const farm = document.getElementById('farm');
  for (let i = 0; i < numPlots; i++) {
    const plot = document.createElement('div');
    plot.classList.add('plot');
    plot.dataset.status = 'empty';
    plot.dataset.level = 1; // Default level is 1
    plot.textContent = 'Empty';
    farm.appendChild(plot);
  }

  // Add click listener for harvesting
  farm.addEventListener('click', (e) => {
    const plot = e.target.closest('.plot');
    if (plot && plot.dataset.status === 'ready') {
      const sellPrice = parseInt(plot.dataset.sellPrice);
      plot.dataset.status = 'empty';
      plot.textContent = 'Empty';
      plot.style.backgroundColor = '#f5f5f5';
      addMoney(sellPrice); // Requires addMoney from money.js
    }
  });
}

export function plantSeed(plot, crop, unlockedCrops) {
    plot.dataset.status = 'growing';
    plot.innerHTML = `
      <img src="${crop.image}" alt="${crop.name}" style="width: 60px; height: 60px;">
      <div class="crop-info">
        ${crop.name}
        <div class="progress-bar">
          <div class="progress" style="width: 0%;"></div>
        </div>
      </div>
    `;
  
    const progressBar = plot.querySelector('.progress');
    const plotLevel = parseInt(plot.dataset.level);
    const adjustedGrowTime = crop.growTime * Math.pow(1.2, plotLevel - 1); // Increase growth time by 20% per level
    const adjustedSellPrice = crop.sellPrice * (1 + 0.2 * (plotLevel - 1));

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 100 / (adjustedGrowTime / 100); // Increment progress over time
      progressBar.style.width = `${progressValue}%`; // Update the progress bar
      if (progressValue >= 100) {
        clearInterval(interval);
        plot.dataset.status = 'ready';
        plot.innerHTML = `
          <img src="${crop.image}" alt="${crop.name}" style="width: 60px; height: 60px;">
          Harvest (${crop.name})
        `;
        plot.dataset.sellPrice = adjustedSellPrice; // Store adjusted sell price in the dataset
        plot.style.backgroundColor = '#c8e6c9'; // Indicate readiness visually
      }
    }, 100);
  }
  