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

// reloj en vivo en el foot del monitor
function updateClock() {
  const el = document.getElementById("vjTime");
  if (el) el.textContent = new Date().toLocaleTimeString("es-MX");
}
updateClock();
setInterval(updateClock, 1000);

// Fecha y hora en el código del monitor
function updateDateTime() {
  const el = document.getElementById("vjDateTime");
  if (el) {
    const now = new Date();
    const date = now.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" });
    const time = now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    el.textContent = `// ${date} · ${time}`;
  }
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Fullscreen button functionality
const btnFullscreen = document.getElementById("btnFullscreen");
const iframe = document.getElementById("gameFrame");
const monitorTop = document.getElementById("monitorTop");

btnFullscreen.addEventListener("click", () => {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen().catch(err => {
      console.error(`Error al entrar en pantalla completa: ${err.message}`);
    });
  }
});

// Ocultar el botón cuando se active fullscreen y mostrar la barra en la parte superior
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement === iframe) {
    btnFullscreen.style.display = "none";
    monitorTop.classList.add("fullscreen-visible");
  } else {
    btnFullscreen.style.display = "flex";
    monitorTop.classList.remove("fullscreen-visible");
  }
});