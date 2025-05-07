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


//Cliente
let clients = [
  { id: "C00001", nombre: "Juan Pérez", cedula: "0123456789", telefono: "0991234567", email: "juanp@gmail.com", direccion: "Av.Rumiflahui" },
  { id: "C00002", nombre: "Carla Rodríguez", cedula: "0987654321", telefono: "0987654321", email: "carla_r@gmail.com", direccion: "Av.Simon Bolivar" },
  { id: "C00003", nombre: "Marco Vinueza", cedula: "0159753248", telefono: "0975312486", email: "marco12@hotmail.com", direccion: "Av.6 de Diciembre" }
];
  
  let currentClientId = null;
  let deleteClientId = null;
  
  // DOM Elements
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
  
  // Event Listeners
  searchBtn.addEventListener('click', searchClients);
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      searchClients();
    }
  });
  addClientBtn.addEventListener('click', openAddClientModal);
  closeBtn.addEventListener('click', closeModal);
  clientForm.addEventListener('submit', saveClient);
  confirmYes.addEventListener('click', confirmDelete);
  confirmNo.addEventListener('click', closeConfirmModal);
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === clientModal) {
      closeModal();
    }
    if (event.target === confirmModal) {
      closeConfirmModal();
    }
  });
  
  // Functions
  function loadClients(clientsToLoad = clients) {
    clientsTable.innerHTML = '';
    
    if (clientsToLoad.length === 0) {
      noResultsElement.style.display = 'block';
      return;
    }
    
    noResultsElement.style.display = 'none';
    
    clientsToLoad.forEach(client => {
      const row = clientsTable.insertRow();
      
      row.innerHTML = `
        <td>${client.id}</td>
        <td>${client.nombre}</td>
        <td>${client.cedula}</td>
        <td>${client.telefono}</td>
        <td>${client.email}</td>
        <td>${client.direccion}</td>
        <td>
          <button class="action-btn view-btn" data-id="${client.id}">Ver</button>
          <button class="action-btn edit-btn" data-id="${client.id}">Editar</button>
          <button class="action-btn delete-btn" data-id="${client.id}">Eliminar</button>
        </td>
      `;
      
      // Asignar event listeners inmediatamente después de crear los botones
      row.querySelector('.view-btn').addEventListener('click', () => viewClient(client.id));
      row.querySelector('.edit-btn').addEventListener('click', () => editClient(client.id));
      row.querySelector('.delete-btn').addEventListener('click', () => deleteClient(client.id));
    });
  }
  
  function searchClients() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
      loadClients();
      return;
    }
    
    const filteredClients = clients.filter(client => 
      client.nombre.toLowerCase().includes(searchTerm)
    );
    
    loadClients(filteredClients);
  }
  
  function openAddClientModal() {
    currentClientId = null;
    modalTitle.textContent = 'Nuevo Cliente';
    clientForm.reset();
    document.getElementById('client-id').value = '';
    clientModal.style.display = 'block';
  }
  
  function viewClient(id) {
    const client = clients.find(c => c.id === id);
    if (client) {
      modalTitle.textContent = 'Ver Cliente';
      
      // Mostrar el ID de manera destacada
      const idDisplay = document.createElement('div');
      idDisplay.className = 'id-display';
      idDisplay.textContent = `ID: ${client.id}`;
      
      // Limpiar y preparar el formulario
      const form = document.getElementById('client-form');
      form.innerHTML = '';
      form.appendChild(idDisplay);
      
      // Crear campos no editables
      const fields = ['nombre', 'cedula', 'telefono', 'email', 'direccion'];
      fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}:`;
        
        const input = document.createElement('input');
        input.type = field === 'email' ? 'email' : 'text';
        input.id = field;
        input.value = client[field];
        input.disabled = true;
        
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
      });
      
      clientModal.style.display = 'block';
    }
  }
  
  function editClient(id) {
    const client = clients.find(c => c.id === id);
    if (client) {
      modalTitle.textContent = 'Editar Cliente';
      
      // Mostrar el ID de manera destacada
      const idDisplay = document.createElement('div');
      idDisplay.className = 'id-display';
      idDisplay.textContent = `ID: ${client.id}`;
      
      // Limpiar y preparar el formulario
      const form = document.getElementById('client-form');
      form.innerHTML = '';
      form.appendChild(idDisplay);
      
      // Añadir campo oculto para el ID
      const hiddenId = document.createElement('input');
      hiddenId.type = 'hidden';
      hiddenId.id = 'client-id';
      hiddenId.value = client.id;
      form.appendChild(hiddenId);
      
      // Crear campos editables
      const fields = ['nombre', 'cedula', 'telefono', 'email', 'direccion'];
      fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}:`;
        
        const input = document.createElement('input');
        input.type = field === 'email' ? 'email' : 'text';
        input.id = field;
        input.value = client[field];
        input.required = true;
        
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
      });
      
      // Botón de guardar
      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'submit-btn';
      submitBtn.textContent = 'Guardar';
      form.appendChild(submitBtn);
      
      clientModal.style.display = 'block';
    }
  }
  
  function deleteClient(id) {
    deleteClientId = id;
    confirmModal.style.display = 'block';
  }
  
  function confirmDelete() {
    clients = clients.filter(client => client.id !== deleteClientId);
    loadClients();
    closeConfirmModal();
  }
  
  function closeConfirmModal() {
    confirmModal.style.display = 'none';
    deleteClientId = null;
  }
  
  function closeModal() {
    clientModal.style.display = 'none';
    
    // Reset form and enable inputs when closing
    const inputs = clientForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = false;
    });
    
    // Show submit button when closing
    document.querySelector('.submit-btn').style.display = 'block';
  }
  
  function generateNextId() {
    const maxId = clients.reduce((max, client) => {
      const num = parseInt(client.id.substring(1));
      return num > max ? num : max;
    }, 0);
    
    const nextNum = maxId + 1;
    return 'C' + String(nextNum).padStart(5, '0');
  }
  
  function saveClient(e) {
    e.preventDefault();
    
    const idInput = document.getElementById('client-id');
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    
    if (idInput.value) {
      // Actualizar cliente existente
      const index = clients.findIndex(c => c.id === idInput.value);
      if (index !== -1) {
        clients[index] = { 
          id: idInput.value, 
          nombre, 
          cedula, 
          telefono, 
          email, 
          direccion 
        };
      }
    } else {
      // Añadir nuevo cliente
      const newId = generateNextId();
      clients.push({ 
        id: newId, 
        nombre, 
        cedula, 
        telefono, 
        email, 
        direccion 
      });
    }
    loadClients();
    closeModal();
  }
  // Añade estas variables al inicio del JS
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  const noResultsElement = document.getElementById('no-results');
  const recentSearchesElement = document.querySelector('.recent-searches .search-tags');

  // Modifica la función searchClients
  function searchClients() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      loadClients();
      noResultsElement.style.display = 'none';
      return;
    }
    
    // Añadir a búsquedas recientes si no está vacío
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      recentSearches.unshift(searchTerm);
      if (recentSearches.length > 5) {
        recentSearches.pop();
      }
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      updateRecentSearches();
    }
    
    const filteredClients = clients.filter(client => 
      client.nombre.toLowerCase().includes(searchTerm)
    );
    
    loadClients(filteredClients);
    
    // Mostrar mensaje si no hay resultados
    if (filteredClients.length === 0) {
      noResultsElement.style.display = 'block';
    } else {
      noResultsElement.style.display = 'none';
    }
  }

  // Añade esta función para actualizar búsquedas recientes
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

  // Llama a esta función al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('collapsed');
    sidebarToggle.classList.remove('expanded');
    loadClients();
    updateRecentSearches();
  });