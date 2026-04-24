const user = localStorage.getItem("loggedInUser");
if (!user) {
  window.location.href = "home.html";
} else {
  document.getElementById("nombreUsuario").textContent = user;
}

document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("user_id");
  window.location.href = "home.html";
});

document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});