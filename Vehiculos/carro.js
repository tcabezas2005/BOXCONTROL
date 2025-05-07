//Menu 
const menuToggle = document.getElementById('menu-toggle');
const sidebarToggle = document.getElementById('sidebar-toggle');

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('collapsed');
  sidebarToggle.classList.remove('expanded');
});

menuToggle.addEventListener('click', () => {
  sidebarToggle.classList.toggle('expanded');
});

document.getElementById('menu-toggle').addEventListener('click', function () {
  document.body.classList.toggle('collapsed');
});

