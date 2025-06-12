document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const userError = document.getElementById('userError');
  const passwordError = document.getElementById('passwordError');
  const togglePassword = document.getElementById('togglePassword');

  // Establecer el ícono inicial (oculto)
  togglePassword.style.backgroundImage = "url('../Imagenes/ver.png')";
  togglePassword.style.backgroundSize = "20px";
  togglePassword.style.backgroundRepeat = "no-repeat";
  togglePassword.style.width = "24px";
  togglePassword.style.height = "24px";
  togglePassword.style.display = "inline-block";

  // Mostrar/Ocultar contraseña
  togglePassword.addEventListener('click', () => {
    const isHidden = password.type === 'password';
    password.type = isHidden ? 'text' : 'password';
    togglePassword.style.backgroundImage = isHidden
      ? "url('../Imagenes/esconder.png')"
      : "url('../Imagenes/ver.png')";
  });

  // Validación de formulario
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

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
      window.location.href = "../Home/home.html";
    }
  });
});
