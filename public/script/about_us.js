document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  // Menu
  function toggleMenu() {
    menu.classList.toggle('hidden');
  }

  toggleBtn.addEventListener('click', toggleMenu);
  toggleBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMenu();
  });
});
