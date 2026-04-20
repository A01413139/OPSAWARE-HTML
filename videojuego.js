// Verifica sesión
const user = localStorage.getItem("loggedInUser");
if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("nombreUsuario").textContent = user;
}

// Volver al dashboard
document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});