import { 
  fetchLocationsFromPage,
  fetchCharactersFromPage,
  fetchEpisodesFromPage
} from './fetch_api.js';

import { ENTITY_TYPE } from './entity_type.js';

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const container = document.getElementById('location-container');
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  //Menu
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  let currentEntityType = ENTITY_TYPE.CHARACTER;

  //Search
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('#location-container > div');

    cards.forEach(card => {
      const nameEl = card.querySelector('h2');
      const name = nameEl ? nameEl.textContent.toLowerCase() : '';

      if (currentEntityType === ENTITY_TYPE.CHARACTER) {
        card.style.display = name.includes(query) ? 'block' : 'none';

      } else if (currentEntityType === ENTITY_TYPE.LOCATION) {
        card.style.display = name.includes(query) ? 'block' : 'none';

      }
      //  else if (currentEntityType === ENTITY_TYPE.EPISODE) {
      //   card.style.display = name.includes(query) ? 'block' : 'none';
      // }
    });
  });

  document.getElementById('btn-character').addEventListener('click', () => {
    currentEntityType = ENTITY_TYPE.CHARACTER;
    renderList();
  });

  document.getElementById('btn-location').addEventListener('click', () => {
    currentEntityType = ENTITY_TYPE.LOCATION;
    renderList();
  });

  //Episode
  // document.getElementById('btn-episode').addEventListener('click', () => {
  //   currentEntityType = ENTITY_TYPE.EPISODE;
  //   renderList();
  // });

  async function renderList() {
    try {
      container.innerHTML = "";
      let data = [];

      switch (currentEntityType) {
        case ENTITY_TYPE.CHARACTER:
          data = await fetchCharactersFromPage(1);
          break;
        case ENTITY_TYPE.LOCATION:
          data = await fetchLocationsFromPage(1);
          break;
        // case ENTITY_TYPE.EPISODE:
        //   data = await fetchEpisodesFromPage(1);
        //   break;
      }

      //Card
      data.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-black text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-xs sm:text-sm md:text-base";

        let html = `<h2 class="text-xl font-semibold mb-2">${item.name}</h2>`;

        if (currentEntityType === ENTITY_TYPE.CHARACTER) {
          html += `
            <img src="${item.image}" alt="${item.name}" class="w-full h-auto object-cover rounded mb-2">
            <p><strong>Status:</strong> ${item.status}</p>
            <p><strong>Species:</strong> ${item.species}</p>
            <p><strong>Gender:</strong> ${item.gender}</p>
          `;
        } else if (currentEntityType === ENTITY_TYPE.LOCATION) {
          html += `
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Dimension:</strong> ${item.dimension}</p>
            <p><strong>Residents:</strong> ${item.residents.length}</p>
          `;
        } 
        // else if (currentEntityType === ENTITY_TYPE.EPISODE) {
        //   html += `
        //     <p><strong>Air Date:</strong> ${item.air_date}</p>
        //     <p><strong>Episode:</strong> ${item.episode}</p>
        //     <p><strong>Characters:</strong> ${item.characters.length}</p>
        //   `;
        // }

        card.innerHTML = html;
        container.appendChild(card);
      });

    } catch (error) {
      container.innerHTML = `<p class="text-red-500">Error loading data.</p>`;
      console.error(error);
    }
  }

  renderList();
});
