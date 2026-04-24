const btnRegistrar = document.getElementById("btnRegistrar");
const msg          = document.getElementById("msg");

function showMsg(text, type) {
  msg.textContent = text;
  msg.className = "msg " + type;
}

function emailValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function passwordValido(pass) {
  if (pass.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Z]/.test(pass)) {
    return "Debe incluir al menos una letra mayúscula.";
  }
  if (!/[0-9]/.test(pass)) {
    return "Debe incluir al menos un número.";
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
    return "Debe incluir al menos un símbolo especial (!@#$%...).";
  }
  return null;
}

btnRegistrar.addEventListener("click", async () => {
  const first_name = document.getElementById("first_name").value.trim();
  const last_name  = document.getElementById("last_name").value.trim();
  const correo     = document.getElementById("email").value.trim();
  const role       = document.getElementById("role").value;
  const password   = document.getElementById("password").value;
  const password2  = document.getElementById("password2").value;

  if (!first_name || !last_name || !correo || !password) {
    showMsg("Completa todos los campos.", "warn");
    return;
  }

  if (!emailValido(correo)) {
    showMsg("Correo inválido. Ejemplo: operador@empresa.com", "error");
    document.getElementById("email").focus();
    return;
  }

  const errorPass = passwordValido(password);
  if (errorPass) {
    showMsg(errorPass, "error");
    document.getElementById("password").focus();
    return;
  }

  if (password !== password2) {
    showMsg("Las contraseñas no coinciden.", "error");
    document.getElementById("password2").focus();
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, email: correo, role, password })
    });

    const data = await response.json();

    if (response.ok) {
      showMsg("¡Cuenta creada! Redirigiendo...", "success");
      setTimeout(() => window.location.href = "index.html", 1500);
    } else {
      showMsg(data.error || "Error al crear la cuenta.", "error");
    }

  } catch (error) {
    showMsg("No se pudo conectar con el servidor.", "error");
  }
});