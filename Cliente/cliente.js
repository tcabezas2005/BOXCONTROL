// Menú lateral
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

// Cliente - Variables globales
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let deleteClientId = null;

// Elementos del DOM
const clientsTable = document.getElementById('clients-table').getElementsByTagName('tbody')[0];
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const addClientBtn = document.getElementById('add-client-btn');
const clientModal = document.getElementById('client-modal');
const confirmModal = document.getElementById('confirm-modal');
const closeBtn = document.querySelector('.close-btn');
const clientForm = document.getElementById('client-form');
const modalTitle = document.getElementById('modal-title');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');
const noResultsElement = document.getElementById('no-results');
const recentSearchesElement = document.querySelector('.recent-searches .search-tags');

// URL base del API
const API_URL = 'http://localhost:3000/api/users'; // Cambia esto si tu API está en otro puerto o dominio

// Funciones de conexión al API
async function fetchClients() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar los clientes');
  return await res.json();
}

async function searchClientsAPI(term) {
  const res = await fetch(`${API_URL}?search=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error('Error al buscar clientes');
  return await res.json();
}

async function getClientById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  return await res.json();
}

async function createClient(client) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return await res.json();
}

async function updateClient(id, client) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  });
  if (!res.ok) throw new Error('Error al actualizar cliente');
  return await res.json();
}

async function deleteClient(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar cliente');
}

// Cargar clientes desde el API
async function loadClients(clientsToLoad = []) {
  clientsTable.innerHTML = '';
  try {
    const data = clientsToLoad.length ? clientsToLoad : await fetchClients();

    if (data.length === 0) {
      noResultsElement.style.display = 'block';
      return;
    }

    noResultsElement.style.display = 'none';

    data.forEach(client => {
      const row = clientsTable.insertRow();
      row.innerHTML = `
        <td>${client.ID}</td>
        <td>${client.nombre}</td>
        <td>${client.cedula}</td>
        <td>${client.telefono}</td>
        <td>${client.email}</td>
        <td>${client.direccion}</td>
        <td>
          <button class="action-btn view-btn" data-id="${client.ID}">Ver</button>
          <button class="action-btn edit-btn" data-id="${client.ID}">Editar</button>
          <button class="action-btn delete-btn" data-id="${client.ID}">Eliminar</button>
        </td>
      `;
      row.querySelector('.view-btn').addEventListener('click', () => viewClient(client.ID));
      row.querySelector('.edit-btn').addEventListener('click', () => editClient(client.ID));
      row.querySelector('.delete-btn').addEventListener('click', () => deleteClientUI(client.ID));
    });
  } catch (error) {
    alert(error.message);
  }
}

function deleteClientUI(id) {
  deleteClientId = id;
  confirmModal.style.display = 'block';
}

async function searchClients() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === '') {
    loadClients();
    return;
  }

  try {
    const results = await searchClientsAPI(searchTerm);
    loadClients(results);

    if (results.length === 0) {
      noResultsElement.style.display = 'block';
    } else {
      noResultsElement.style.display = 'none';
    }

    if (searchTerm && !recentSearches.includes(searchTerm)) {
      recentSearches.unshift(searchTerm);
      if (recentSearches.length > 5) recentSearches.pop();
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      updateRecentSearches();
    }

  } catch (error) {
    alert(error.message);
  }
}

function openAddClientModal() {
  modalTitle.textContent = 'Nuevo Cliente';
  clientForm.innerHTML = `
    <div class="form-group">
      <label>Nombre:</label>
      <input type="text" id="nombre" required />
    </div>
    <div class="form-group">
      <label>Cédula:</label>
      <input type="text" id="cedula" required />
    </div>
    <div class="form-group">
      <label>Teléfono:</label>
      <input type="text" id="telefono" required />
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="email" id="email" required />
    </div>
    <div class="form-group">
      <label>Dirección:</label>
      <input type="text" id="direccion" required />
    </div>
    <button type="submit" class="submit-btn">Guardar</button>
  `;
  clientModal.style.display = 'block';
}

async function viewClient(id) {
  try {
    const client = await getClientById(id);
    modalTitle.textContent = 'Ver Cliente';

    clientForm.innerHTML = `
      <div class="id-display">ID: ${client.ID}</div>
      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" value="${client.nombre}" disabled />
      </div>
      <div class="form-group">
        <label>Cédula:</label>
        <input type="text" value="${client.cedula}" disabled />
      </div>
      <div class="form-group">
        <label>Teléfono:</label>
        <input type="text" value="${client.telefono}" disabled />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" value="${client.email}" disabled />
      </div>
      <div class="form-group">
        <label>Dirección:</label>
        <input type="text" value="${client.direccion}" disabled />
      </div>
    `;

    clientModal.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}

async function editClient(id) {
  try {
    const client = await getClientById(id);
    modalTitle.textContent = 'Editar Cliente';

    clientForm.innerHTML = `
      <div class="id-display">ID: ${client.ID}</div>
      <input type="hidden" id="client-id" value="${client.ID}" />
      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" id="nombre" value="${client.nombre}" required />
      </div>
      <div class="form-group">
        <label>Cédula:</label>
        <input type="text" id="cedula" value="${client.cedula}" required />
      </div>
      <div class="form-group">
        <label>Teléfono:</label>
        <input type="text" id="telefono" value="${client.telefono}" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" id="email" value="${client.email}" required />
      </div>
      <div class="form-group">
        <label>Dirección:</label>
        <input type="text" id="direccion" value="${client.direccion}" required />
      </div>
      <button type="submit" class="submit-btn">Guardar</button>
    `;

    clientModal.style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
}

async function saveClient(e) {
  e.preventDefault();

  const id = document.getElementById('client-id')?.value;
  const nombre = document.getElementById('nombre').value.trim();
  const cedula = document.getElementById('cedula').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();
  const direccion = document.getElementById('direccion').value.trim();

  const clientData = { nombre, cedula, telefono, email, direccion };

  try {
    if (id) {
      await updateClient(id, clientData);
    } else {
      await createClient(clientData);
    }
    closeModal();
    loadClients(); // Recargar desde el API
  } catch (error) {
    alert(error.message);
  }
}

async function confirmDelete() {
  try {
    await deleteClient(deleteClientId);
    closeConfirmModal();
    loadClients(); // Recargar desde el API
  } catch (error) {
    alert(error.message);
  }
}

function closeConfirmModal() {
  confirmModal.style.display = 'none';
  deleteClientId = null;
}

function closeModal() {
  clientModal.style.display = 'none';
}

function updateRecentSearches() {
  recentSearchesElement.innerHTML = '';
  recentSearches.forEach(search => {
    const tag = document.createElement('div');
    tag.className = 'search-tag';
    tag.textContent = search;
    tag.addEventListener('click', () => {
      searchInput.value = search;
      searchClients();
    });
    recentSearchesElement.appendChild(tag);
  });
}

// Event Listeners
searchBtn.addEventListener('click', searchClients);
searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') searchClients();
});
addClientBtn.addEventListener('click', openAddClientModal);
closeBtn.addEventListener('click', closeModal);
clientForm.addEventListener('submit', saveClient);
confirmYes.addEventListener('click', confirmDelete);
confirmNo.addEventListener('click', closeConfirmModal);

window.addEventListener('click', function (event) {
  if (event.target === clientModal) closeModal();
  if (event.target === confirmModal) closeConfirmModal();
});

window.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.add('collapsed');
  sidebarToggle.classList.remove('expanded');
  try {
    await loadClients();
    updateRecentSearches();
  } catch (error) {
    alert('No se pudieron cargar los clientes: ' + error.message);
  }
});
