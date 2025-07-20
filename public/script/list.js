import { getCharactersFromPage, getMaxCharacterPage } from "./fetchAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const container = document.getElementById('location-container');
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  // Menu
  function toggleMenu() {
    menu.classList.toggle('hidden');
  }

  toggleBtn.addEventListener('click', toggleMenu);
  toggleBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    toggleMenu();
  });

  // Search
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('#location-container > div');

    cards.forEach(card => {
      const nameEl = card.querySelector('h2');
      const name = nameEl ? nameEl.textContent : '';
      card.style.display = name.toLowerCase().includes(query) ? 'block' : 'none';
    });
  });

  // Render
  let currentPage = 1;
  const maxPage = getMaxCharacterPage();

  async function renderList(page = 1) {
    try {
      container.innerHTML = "";
      const data = await getCharactersFromPage(page);

      data.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-black text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-xs sm:text-sm md:text-base";

        let html = `<h2 class="text-xl font-semibold mb-2">${item.name}</h2>`;

        html += `
          <img src="${item.image}" alt="${item.name}" class="w-full h-auto object-cover rounded mt-6 mb-2">
          <p><strong>Status:</strong> ${item.status}</p>
          <p><strong>Species:</strong> ${item.species}</p>
          <p><strong>Gender:</strong> ${item.gender}</p>
        `;

        card.innerHTML = html;
        container.appendChild(card);
      });

      pageInfo.textContent = `Page ${page}`;
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === maxPage;
    } catch (error) {
      container.innerHTML = `<p class="text-red-500">Error loading data.</p>`;
      console.error(error);
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderList(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < maxPage) {
      currentPage++;
      renderList(currentPage);
    }
  });

  renderList(currentPage);
});
