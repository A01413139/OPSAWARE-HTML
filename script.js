const inputUser = document.getElementById("username");
const inputPass = document.getElementById("password");
const btnLogin  = document.getElementById("btnLogin");
const msg       = document.getElementById("msg");

function showMsg(text, type) {
  msg.textContent = text;
  msg.className = "msg " + type;
}

function clearMsg() {
  msg.textContent = "";
  msg.className = "msg";
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

btnLogin.addEventListener("click", async () => {
  const correo = inputUser.value.trim();
  const clave  = inputPass.value;

  if (!correo || !clave) {
    showMsg("Completa todos los campos.", "warn");
    return;
  }

  if (!emailValido(correo)) {
    showMsg("Correo inválido. Ejemplo: operador@empresa.com", "error");
    inputUser.focus();
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, clave })
    });

    const data = await response.json();

    if (data.ok) {
      localStorage.setItem("loggedInUser", data.usuario);
      localStorage.setItem("user_id", data.user_id);
      showMsg("¡Bienvenido! Redirigiendo...", "success");
      setTimeout(() => window.location.href = "dashboard.html", 600);
    } else {
      showMsg(data.mensaje || "Correo o clave incorrectos.", "error");
      inputPass.value = "";
      inputPass.focus();
    }

  } catch (error) {
    showMsg("No se pudo conectar con el servidor.", "error");
  }
});

inputPass.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnLogin.click();
});

[inputUser, inputPass].forEach(el => el.addEventListener("input", clearMsg));