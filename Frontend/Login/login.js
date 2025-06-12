document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const userError = document.getElementById('userError');
    const passwordError = document.getElementById('passwordError');
  
    let valid = true;
  
    if (username.value.trim() === '') {
      userError.style.display = 'block';
      valid = false;
    } else {
      userError.style.display = 'none';
    }
  
    if (password.value.length < 6) {
      passwordError.style.display = 'block';
      valid = false;
    } else {
      passwordError.style.display = 'none';
    }
  
    if (valid) {
      alert(`¡Bienvenido, ${username.value}!`);
    }
  });
  
  document.getElementById("Iniciar").addEventListener("click", function() {
    window.location.href = "../Home/home.html";
  });