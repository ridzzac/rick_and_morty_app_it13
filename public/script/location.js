import {
  getLocationsFromPage,
  getMaxLocationPage,
  getAllLocations
} from "./fetchAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const container = document.getElementById('container');
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  let allLocations = [];

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
    container.innerHTML = "";

    const filtered = allLocations.filter(location =>
      location.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      container.innerHTML = "<p class='text-red-500 text-5xl font-bold pt-44'>No locations found.</p>";
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = "bg-black text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-xs sm:text-sm md:text-base";

      let html = `<h2 class="text-xl font-semibold mb-2">${item.name}</h2>`;
      html += `
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Dimension:</strong> ${item.dimension}</p>
        <p><strong>Residents:</strong> ${item.residents.length}</p>
      `;

      card.innerHTML = html;
      container.appendChild(card);
    });
  });

  // Render
  let currentPage = 1;
  let maxPage = 1;

  async function renderList(page = 1) {
    try {
      container.innerHTML = "";
      const data = await getLocationsFromPage(page);
      maxPage = await getMaxLocationPage();

      data.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-black text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-xs sm:text-sm md:text-base";

        let html = `<h2 class="text-xl font-semibold mb-2">${item.name}</h2>`;
        html += `
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Dimension:</strong> ${item.dimension}</p>
          <p><strong>Residents:</strong> ${item.residents.length}</p>
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

  // Page controls
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

  getAllLocations().then(data => {
    allLocations = data.output;
  });
});
