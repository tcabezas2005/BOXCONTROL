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
    <span class="task-input" contenteditable="true"></span>
  `;

  taskList.appendChild(newTaskItem);
});

taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const li = e.target.closest('li');
    const span = li.querySelector('.task-input');

    if (e.target.checked) {
      span.textContent = 'Por fin uno menos :3';
      span.style.textDecoration = 'line-through';
      span.style.color = '#888';
    } else {
      span.textContent = ''; 
      span.style.textDecoration = 'none';
      span.style.color = '#000';
    }
  }
});
;