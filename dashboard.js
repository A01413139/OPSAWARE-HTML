// Verifica sesión
const user = localStorage.getItem("loggedInUser");
if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("nombreUsuario").textContent = user;
}

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// Ir a la página del videojuego
document.getElementById("btnGame").addEventListener("click", () => {
  window.location.href = "videojuego.html";
});

// Gráfica 1 — Tipos de usuarios
new Chart(document.getElementById("pieChart"), {
  type: "doughnut",
  data: {
    labels: ["Empleados", "Externos"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#E8590C", "#FAEEDA"],
        borderWidth: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }
});

// Gráfica 2 — Puntaje promedio
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Puntaje",
        data: [1200, 1400, 1100, 1600, 1500, 1800],
        borderColor: "#E8590C",
        backgroundColor: "rgba(232,89,12,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        borderWidth: 2
      },
      {
        label: "Meta",
        data: [1300, 1300, 1300, 1500, 1500, 1700],
        borderColor: "#378ADD",
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        borderWidth: 2,
        borderDash: [4, 4]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      },
      y: {
        ticks: { font: { size: 10 } },
        grid: { color: "rgba(0,0,0,0.05)" }
      }
    }
  }
});

// Gráfica 3 — Desempeño por categoría
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Cat A", "Cat B", "Cat C", "Cat D", "Cat E"],
    datasets: [
      {
        label: "Actual",
        data: [80, 65, 90, 70, 85],
        backgroundColor: "#378ADD",
        borderRadius: 4
      },
      {
        label: "Esperado",
        data: [75, 80, 75, 80, 75],
        backgroundColor: "#FAEEDA",
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      },
      y: {
        ticks: { font: { size: 10 } },
        grid: { color: "rgba(0,0,0,0.05)" }
      }
    }
  }
});

// Gráfica 4 — Desempeño por nivel
new Chart(document.getElementById("lineChart2"), {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Móvil",
        data: [8, 12, 15, 17, 20],
        borderColor: "#378ADD",
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        borderWidth: 2
      },
      {
        label: "Computadora",
        data: [10, 14, 16, 18, 21],
        borderColor: "#E8590C",
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        borderWidth: 2
      },
      {
        label: "Tablet",
        data: [5, 8, 10, 13, 16],
        borderColor: "#639922",
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      },
      y: {
        min: 0,
        max: 25,
        ticks: { font: { size: 10 } },
        grid: { color: "rgba(0,0,0,0.05)" }
      }
    }
  }
});