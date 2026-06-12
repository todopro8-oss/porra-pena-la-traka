// ===== Pestaña Análisis: sinergias, perfiles y partidos polémicos =====

function abbr(name) {
  return name.split(" ")[0].slice(0, 4);
}

// Coincidencias entre dos porras (0..72)
function agreement(a, b) {
  let n = 0;
  for (let i = 0; i < TOTAL_MATCHES; i++) if (a.code[i] === b.code[i]) n++;
  return n;
}

function renderAnalysis() {
  const root = document.getElementById("analysis-root");
  if (PORRAS.length < 2) {
    root.innerHTML = `<div class="coming-soon"><div class="coming-emoji">🔬</div>
      <h2>Faltan porras</h2><p>Con al menos dos porras enviadas habrá análisis.</p></div>`;
    return;
  }

  // --- Matriz de sinergias ---
  const pairs = [];
  for (let i = 0; i < PORRAS.length; i++)
    for (let j = i + 1; j < PORRAS.length; j++)
      pairs.push({ a: PORRAS[i], b: PORRAS[j], n: agreement(PORRAS[i], PORRAS[j]) });
  const best = pairs.reduce((x, p) => (p.n > x.n ? p : x));
  const worst = pairs.reduce((x, p) => (p.n < x.n ? p : x));
  const min = worst.n, max = best.n;

  const matrixRows = PORRAS.map((p, i) => {
    const cells = PORRAS.map((q, j) => {
      if (i === j) return `<td class="diag">·</td>`;
      const n = agreement(p, q);
      const t = max === min ? 0.5 : (n - min) / (max - min);
      return `<td class="heat" style="background:rgba(255,94,58,${(0.08 + 0.62 * t).toFixed(2)})" title="${p.name} × ${q.name}: coinciden en ${n} de 72">${n}</td>`;
    }).join("");
    return `<tr><th scope="row">${p.name}</th>${cells}</tr>`;
  }).join("");

  const matrix = `
    <div class="panel">
      <h3>🧬 Matriz de sinergias <small class="panel-sub">pronósticos idénticos entre porras (de 72)</small></h3>
      <div class="table-scroll">
        <table class="synergy-table">
          <thead><tr><th></th>${PORRAS.map((p) => `<th>${abbr(p.name)}</th>`).join("")}</tr></thead>
          <tbody>${matrixRows}</tbody>
        </table>
      </div>
    </div>`;

  // --- Consenso por partido ---
  const splits = MATCHES.map((m) => {
    const c = { 1: 0, X: 0, 2: 0 };
    PORRAS.forEach((p) => c[p.code[m.id - 1]]++);
    const top = Math.max(c["1"], c["X"], c["2"]);
    return { m, c, discord: PORRAS.length - top };
  });
  const unanimous = splits.filter((s) => s.discord === 0);
  const divided = [...splits].sort((a, b) => b.discord - a.discord || b.c["X"] - a.c["X"]).slice(0, 8);

  const stats = `
    <div class="stat-cards">
      <div class="stat-card"><span class="stat-num">🤝 ${best.n}<small>/72</small></span><span class="stat-label">almas gemelas: ${best.a.name} & ${best.b.name}</span></div>
      <div class="stat-card"><span class="stat-num">⚔️ ${worst.n}<small>/72</small></span><span class="stat-label">polos opuestos: ${worst.a.name} & ${worst.b.name}</span></div>
      <div class="stat-card"><span class="stat-num">${unanimous.length}</span><span class="stat-label">partidos con pleno acuerdo de la peña</span></div>
    </div>`;

  // --- Perfil porrero (reparto 1/X/2) ---
  const profiles = PORRAS.map((p) => {
    const c = { 1: 0, X: 0, 2: 0 };
    for (const ch of p.code) c[ch]++;
    return { name: p.name, ...{ u: c["1"], x: c["X"], d: c["2"] } };
  });
  const home = profiles.reduce((a, b) => (b.u > a.u ? b : a));
  const draw = profiles.reduce((a, b) => (b.x > a.x ? b : a));
  const away = profiles.reduce((a, b) => (b.d > a.d ? b : a));

  const profile = `
    <div class="panel">
      <h3>🎭 Perfil porrero <small class="panel-sub">reparto de 1 / X / 2 en cada porra</small></h3>
      <div class="superlatives">
        <span class="chip ok">🏠 Más localista: <strong>${home.name}</strong> · ${home.u} unos</span>
        <span class="chip warn">🤝 Más empatador: <strong>${draw.name}</strong> · ${draw.x} equis</span>
        <span class="chip cold">✈️ Más visitante: <strong>${away.name}</strong> · ${away.d} doses</span>
      </div>
      <div class="chart-box"><canvas id="profile-chart"></canvas></div>
    </div>`;

  // --- Partidos más divididos ---
  const dividedList = `
    <div class="panel">
      <h3>🔥 Partidos más polémicos <small class="panel-sub">donde la peña menos se pone de acuerdo</small></h3>
      ${divided.map(({ m, c, discord }) => `
        <div class="divided-row">
          <span class="mr-meta">#${m.id} · Grupo ${m.group} · ${m.d}</span>
          <span class="divided-match">${m.h} – ${m.a}</span>
          <span class="divided-split">
            <span class="split s1" title="${c["1"]} al 1">${c["1"]}×1</span>
            <span class="split sx" title="${c["X"]} a la X">${c["X"]}×X</span>
            <span class="split s2" title="${c["2"]} al 2">${c["2"]}×2</span>
          </span>
        </div>`).join("")}
    </div>`;

  root.innerHTML = stats + matrix + profile + dividedList;
}

// El gráfico se crea al abrir la pestaña por primera vez:
// crearlo con el panel oculto (display:none) deja el canvas a tamaño 0.
let profileChart = null;
function buildProfileChart() {
  const canvas = document.getElementById("profile-chart");
  if (profileChart || !canvas) return;
  const profiles = PORRAS.map((p) => {
    const c = { 1: 0, X: 0, 2: 0 };
    for (const ch of p.code) c[ch]++;
    return c;
  });
  profileChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: PORRAS.map((p) => p.name),
      datasets: [
        { label: "1 (local)", data: profiles.map((c) => c["1"]), backgroundColor: "#ff5e3a" },
        { label: "X (empate)", data: profiles.map((c) => c["X"]), backgroundColor: "#ffb938" },
        { label: "2 (visitante)", data: profiles.map((c) => c["2"]), backgroundColor: "#60a5fa" },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, max: TOTAL_MATCHES, ticks: { color: "#93a0c4" }, grid: { color: "rgba(147,160,196,0.12)" } },
        y: { stacked: true, ticks: { color: "#eef2ff", font: { weight: 700 } }, grid: { display: false } },
      },
      plugins: {
        legend: { position: "bottom", labels: { color: "#eef2ff", usePointStyle: true, pointStyle: "rectRounded", padding: 14 } },
      },
    },
  });
}

renderAnalysis();
document.querySelector('.tab[data-tab="analisis"]').addEventListener("click", () => setTimeout(buildProfileChart, 0));
