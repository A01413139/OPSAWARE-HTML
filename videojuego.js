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

// reloj
function updateClock() {
  const el = document.getElementById("vjDateTime");
  if (el) {
    const now = new Date();
    const date = now.toLocaleDateString("es-MX", { day:"2-digit", month:"2-digit", year:"numeric" });
    const time = now.toLocaleTimeString("es-MX");
    el.textContent = `// ${date} · ${time}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// botón fullscreen
const btnFull = document.getElementById("btnFullscreen");
const monitor = document.querySelector(".vj-monitor");

btnFull.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (monitor.requestFullscreen) monitor.requestFullscreen();
    else if (monitor.webkitRequestFullscreen) monitor.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});

// hacer que el iframe Unity ocupe todo el espacio
const frame = document.getElementById("gameFrame");
frame.addEventListener("load", () => {
  try {
    const doc = frame.contentDocument;
    if (!doc) return;

    // inyectar CSS dentro del iframe para que Unity llene el espacio
    const style = doc.createElement("style");
    style.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
        background: #000 !important;
      }
      #unity-container {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: 100% !important;
        transform: none !important;
      }
      #unity-canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }
      #unity-footer {
        display: none !important;
      }
    `;
    doc.head.appendChild(style);
  } catch (e) {
    console.log("No se pudo ajustar iframe:", e);
  }
});