const user = localStorage.getItem("loggedInUser");
if (!user) {
  window.location.href = "home.html";
} else {
  const initials = user.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
  document.getElementById("nombreUsuario").textContent = user;
  document.getElementById("heroName").textContent      = user.toUpperCase();
  document.getElementById("rankMeAv").textContent      = initials;
}

document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("user_id");
  window.location.href = "home.html";
});

document.getElementById("btnGame").addEventListener("click", () => {
  window.location.href = "videojuego.html";
});

document.getElementById("tabBasic").addEventListener("click", () => {
  document.getElementById("panelBasic").classList.add("active");
  document.getElementById("panelAdvanced").classList.remove("active");
  document.getElementById("tabBasic").classList.add("active");
  document.getElementById("tabAdvanced").classList.remove("active");
});

document.getElementById("tabAdvanced").addEventListener("click", () => {
  document.getElementById("panelAdvanced").classList.add("active");
  document.getElementById("panelBasic").classList.remove("active");
  document.getElementById("tabAdvanced").classList.add("active");
  document.getElementById("tabBasic").classList.remove("active");
});

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

function animarCounter(el, valor) {
  const target = Number(valor) || 0;
  const inicio = Number(el.textContent) || 0;
  const duracion = 900;
  const t0 = performance.now();
  function step(t) {
    const p = Math.min((t - t0) / duracion, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(inicio + (target - inicio) * eased);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

let graficas = {};

const DUMMY = {
  nivelMax: 5, correctas: 342, jugadores: 52,
  porNivel: [
    { nivel_alcanzado: 1, partidas: 18, tasa_acierto: 82 },
    { nivel_alcanzado: 2, partidas: 24, tasa_acierto: 75 },
    { nivel_alcanzado: 3, partidas: 31, tasa_acierto: 68 },
    { nivel_alcanzado: 4, partidas: 20, tasa_acierto: 61 },
    { nivel_alcanzado: 5, partidas: 12, tasa_acierto: 54 }
  ],
  porDificultad: [
    { dificultad: 'facil',   correctas: 145, incorrectas: 38 },
    { dificultad: 'medio',   correctas: 112, incorrectas: 64 },
    { dificultad: 'dificil', correctas: 85,  incorrectas: 91 }
  ],
  ranking: [
    { first_name: 'Regina',   last_name: 'Elizabeth', nivel: 5, total: 2000 },
    { first_name: 'Daniella', last_name: 'Vazquez',   nivel: 4, total: 1900 },
    { first_name: 'Hector',   last_name: 'Fernandez', nivel: 4, total: 1800 },
    { first_name: 'Daniel',   last_name: 'Gonzalez',  nivel: 3, total: 1500 },
    { first_name: 'Fernando', last_name: 'Robles',    nivel: 3, total: 1350 }
  ],
  historial: [
    { first_name: 'Regina',   last_name: 'Elizabeth', nivel_alcanzado: 5, puntaje: 950, fecha: '2026-04-20' },
    { first_name: 'Daniella', last_name: 'Vazquez',   nivel_alcanzado: 4, puntaje: 870, fecha: '2026-04-19' },
    { first_name: 'Hector',   last_name: 'Fernandez', nivel_alcanzado: 4, puntaje: 850, fecha: '2026-04-18' }
  ]
};

async function cargarEstadisticas() {
  let data = DUMMY;
  try {
    const res  = await fetch("http://localhost:8080/estadisticas");
    const real = await res.json();
    if (real && real.jugadores > 0) data = real;
  } catch (e) {}

  animarCounter(document.getElementById("metricNivel"),     data.nivelMax  || DUMMY.nivelMax);
  animarCounter(document.getElementById("metricCorrectas"), data.correctas || DUMMY.correctas);
  animarCounter(document.getElementById("metricJugadores"), data.jugadores || DUMMY.jugadores);

  const cardRanking = document.getElementById("cardRanking");
  const rankingData = data.ranking?.length > 0 ? data.ranking : DUMMY.ranking;
  const maxPts = Math.max(...rankingData.map(j => j.total));

  cardRanking.innerHTML = '<div class="gcard-title">TOP AGENTES</div>';
  rankingData.forEach((j, i) => {
    const cls = i===0?'gold':i===1?'silver':i===2?'bronze':'';
    const ini = (j.first_name[0]+j.last_name[0]).toUpperCase();
    const pct = Math.round((j.total / maxPts) * 100);
    cardRanking.innerHTML += `
      <div class="rank-row ${cls}">
        <div class="rank-pos">${i+1}</div>
        <div class="rank-av">${ini}</div>
        <div class="rank-info">
          <div class="rank-n">${j.first_name} ${j.last_name}</div>
          <div class="rank-bar"><span style="width:${pct}%"></span></div>
        </div>
        <div class="rank-pts">${j.total}</div>
      </div>`;
  });

  const cardHistorial = document.getElementById("cardHistorial");
  const historialData = data.historial?.length > 0 ? data.historial : DUMMY.historial;
  cardHistorial.innerHTML = '<div class="gcard-title">ACTIVIDAD RECIENTE</div>';
  historialData.forEach(s => {
    const ini   = (s.first_name[0]+s.last_name[0]).toUpperCase();
    const fecha = new Date(s.fecha).toLocaleDateString("es-MX",{day:"2-digit",month:"2-digit",year:"2-digit"});
    cardHistorial.innerHTML += `
      <div class="rank-row">
        <div class="rank-av">${ini}</div>
        <div class="rank-info">
          <div class="rank-n">${s.first_name} ${s.last_name}</div>
          <div class="rank-l">Nv. ${s.nivel_alcanzado||1} — ${fecha}</div>
        </div>
        <div class="rank-pts">${s.puntaje}</div>
      </div>`;
  });

  actualizarGraficas(data);
}

function actualizarGraficas(data) {
  const pd = data.porNivel?.length>0?data.porNivel:DUMMY.porNivel;
  const niveles  = [1,2,3,4,5].map(n=>Number(pd.find(x=>x.nivel_alcanzado==n)?.partidas||0));
  const aciertos = [1,2,3,4,5].map(n=>Number(pd.find(x=>x.nivel_alcanzado==n)?.tasa_acierto||0));
  const dd = data.porDificultad?.length>0?data.porDificultad:DUMMY.porDificultad;
  const facil=dd.find(x=>x.dificultad==='facil'), medio=dd.find(x=>x.dificultad==='medio'), dificil=dd.find(x=>x.dificultad==='dificil');

  if(graficas.pie)  {graficas.pie.data.datasets[0].data=niveles; graficas.pie.update();}
  if(graficas.line) {graficas.line.data.datasets[0].data=aciertos; graficas.line.update();}
  if(graficas.bar)  {
    graficas.bar.data.datasets[0].data=[Number(facil?.correctas||0),Number(medio?.correctas||0),Number(dificil?.correctas||0)];
    graficas.bar.data.datasets[1].data=[Number(facil?.incorrectas||0),Number(medio?.incorrectas||0),Number(dificil?.incorrectas||0)];
    graficas.bar.update();
  }
  if(graficas.line2){graficas.line2.data.datasets[0].data=niveles; graficas.line2.update();}
}

function iniciarGraficas() {
  const sc = {
    x: {
      ticks: { color: '#c8d4e4', font: { size: 10, family: "'Rajdhani'", weight: 600 } },
      grid:  { color: 'rgba(103,184,207,0.08)', drawBorder: false }
    },
    y: {
      ticks: { color: '#c8d4e4', font: { size: 10, family: "'Rajdhani'", weight: 600 } },
      grid:  { color: 'rgba(103,184,207,0.08)', drawBorder: false }
    }
  };

  const glowPlugin = {
    id: 'glow',
    beforeDatasetDraw(chart, args) {
      const { ctx } = chart;
      const ds = chart.data.datasets[args.index];
      if (ds.glow) {
        ctx.save();
        ctx.shadowBlur = 14;
        ctx.shadowColor = ds.borderColor || ds.backgroundColor;
      }
    },
    afterDatasetDraw(chart) { chart.ctx.restore(); }
  };

  Chart.register(glowPlugin);

  graficas.pie = new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: {
      labels: ['LV1','LV2','LV3','LV4','LV5'],
      datasets: [{
        data: [18,24,31,20,12],
        backgroundColor: ['rgba(250,238,218,0.75)','#EF9F27','#E8590C','#A8380A','#6b1f03'],
        borderWidth: 2,
        borderColor: '#0e1525',
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      cutout: '55%',
      animation: { animateRotate: true, duration: 1200 }
    }
  });

  graficas.line = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['LV1','LV2','LV3','LV4','LV5'],
      datasets: [{
        data: [82,75,68,61,54],
        borderColor: '#e07b2a',
        backgroundColor: 'rgba(224,123,42,0.15)',
        tension: 0.4, fill: true,
        pointRadius: 5, pointHoverRadius: 8,
        borderWidth: 2.5,
        pointBackgroundColor: '#e07b2a',
        pointBorderColor: '#0e1525',
        pointBorderWidth: 2,
        glow: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: sc.x, y: { ...sc.y, min: 0, max: 100 } }
    }
  });

  graficas.bar = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: ['FÁCIL','MEDIO','DIFÍCIL'],
      datasets: [
        { label: 'Neutralizadas', data: [145,112,85], backgroundColor: 'rgba(61,158,140,0.85)', borderRadius: 3, borderColor: 'rgba(93,202,144,0.5)', borderWidth: 1 },
        { label: 'Brechas',       data: [38,64,91],   backgroundColor: 'rgba(192,64,64,0.85)',  borderRadius: 3, borderColor: 'rgba(239,85,85,0.5)',   borderWidth: 1 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: sc
    }
  });

  graficas.line2 = new Chart(document.getElementById('lineChart2'), {
    type: 'line',
    data: {
      labels: ['LV1','LV2','LV3','LV4','LV5'],
      datasets: [{
        data: [18,24,31,20,12],
        borderColor: '#67b8cf',
        backgroundColor: 'rgba(103,184,207,0.15)',
        tension: 0.4, fill: true,
        pointRadius: 5, pointHoverRadius: 8,
        borderWidth: 2.5,
        pointBackgroundColor: '#67b8cf',
        pointBorderColor: '#0e1525',
        pointBorderWidth: 2,
        glow: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: sc
    }
  });
}

iniciarGraficas();
cargarEstadisticas();
setInterval(cargarEstadisticas, 5000);