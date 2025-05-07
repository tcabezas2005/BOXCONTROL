// Menu
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

//Pendientes
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task');

addTaskBtn.addEventListener('click', () => {
  const newTaskItem = document.createElement('li');

  newTaskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox" />
    <input type="text" class="task-input" placeholder="Escribe tu tarea..." />
  `;

  taskList.appendChild(newTaskItem);

  taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      const input = e.target.nextElementSibling;
      if (e.target.checked) {
        input.style.textDecoration = 'line-through';
        input.style.color = '#888';
      } else {
        input.style.textDecoration = 'none';
        input.style.color = '#000';
      }
    }
  });
});
