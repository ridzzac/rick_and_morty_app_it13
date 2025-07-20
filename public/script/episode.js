import { getAllEpisodesBySeason } from './fetchAPI.js';

const container = document.getElementById('episodes-container');
const seasonButtons = document.querySelectorAll('.page-btn');

const DEFAULT_EPISODE_PAGES = 3;
let episodesBySeason = {};
let currentSeason = 'S01';
let currentPage = 1;

function renderEpisodes(episodes, page = 1) {
  const start = (page - 1) * DEFAULT_EPISODE_PAGES;
  const pagedEpisodes = episodes.slice(start, start + DEFAULT_EPISODE_PAGES);

  container.innerHTML = pagedEpisodes.map(ep => `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition">
      <h2 class="text-lg font-semibold">${ep.name}</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300">Air Date: ${ep.air_date}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">${ep.episode}</p>
    </div>
  `).join('');

  updatePagination(episodes.length);
}

function updatePagination(totalEpisodes) {
  const totalPages = Math.ceil(totalEpisodes / DEFAULT_EPISODE_PAGES);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `mx-1 px-3 py-1 rounded ${i === currentPage ? 'bg-green-600 text-white' : 'bg-gray-300'}`;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderEpisodes(episodesBySeason[currentSeason], currentPage);
    });
    paginationContainer.appendChild(btn);
  }
}


seasonButtons.forEach(button => {
  button.addEventListener('click', () => {
    const seasonKey = `S${button.dataset.season.padStart(2, '0')}`;
    currentSeason = seasonKey;
    currentPage = 1;
    const selectedEpisodes = episodesBySeason[seasonKey] || [];
    renderEpisodes(selectedEpisodes, currentPage);
  });
});


(async () => {
  container.innerHTML = '<p class="text-center col-span-full">Loading episodes...</p>';
  episodesBySeason = await getAllEpisodesBySeason();
  renderEpisodes(episodesBySeason[currentSeason], currentPage);
})();
