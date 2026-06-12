// ===== Pestaña Resultados: clasificación, gráfico y detalle por partido =====

const PALETTE = ["#ff5e3a", "#ffb938", "#34d399", "#60a5fa", "#c084fc", "#f472b6", "#2dd4bf", "#facc15"];

function playedMatches() {
  return MATCHES.filter((m) => RESULTS[m.id]);
}

function pickOf(porra, matchId) {
  return porra.code[matchId - 1];
}

function computeStandings() {
  const played = playedMatches();
  return PORRAS.map((p, i) => {
    let pts = 0;
    const cumulative = [];
    played.forEach((m) => {
      if (pickOf(p, m.id) === RESULTS[m.id].r) pts++;
      cumulative.push(pts);
    });
    return { ...p, color: PALETTE[i % PALETTE.length], pts, cumulative, played: played.length };
  }).sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name, "es"));
}

// Posición con empates (1, 1, 3...)
function withRanks(standings) {
  let lastPts = null, lastRank = 0;
  return standings.map((s, i) => {
    const rank = s.pts === lastPts ? lastRank : i + 1;
    lastPts = s.pts; lastRank = rank;
    return { ...s, rank };
  });
}

function medal(rank) {
  return rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}º`;
}

function renderResults() {
  const root = document.getElementById("results-root");
  const played = playedMatches();

  if (!PORRAS.length || !played.length) {
    root.innerHTML = `<div class="coming-soon"><div class="coming-emoji">⏳</div>
      <h2>Aún no hay resultados</h2><p>En cuanto acabe el primer partido, aquí aparecerá la clasificación.</p></div>`;
    return;
  }

  const standings = withRanks(computeStandings());
  const leaders = standings.filter((s) => s.rank === 1);
  const maxPts = Math.max(1, standings[0].pts);

  // --- Tarjetas resumen ---
  const stats = `
    <div class="stat-cards">
      <div class="stat-card"><span class="stat-num">${played.length}<small>/72</small></span><span class="stat-label">partidos jugados</span></div>
      <div class="stat-card"><span class="stat-num">👑</span><span class="stat-label">${leaders.map((l) => l.name).join(" · ")}</span></div>
      <div class="stat-card"><span class="stat-num">${PORRAS.length}</span><span class="stat-label">porreros en juego</span></div>
    </div>`;

  // --- Ranking con barras ---
  const ranking = `
    <div class="panel">
      <h3>🏆 Clasificación</h3>
      ${standings.map((s) => `
        <div class="rank-row ${s.rank === 1 ? "leader" : ""}">
          <span class="rank-pos">${medal(s.rank)}</span>
          <div class="rank-info">
            <div class="rank-top"><span class="rank-name">${s.name}</span>
            <span class="rank-pts">${s.pts} pt${s.pts === 1 ? "" : "s"} <small>· ${s.played ? Math.round((s.pts / s.played) * 100) : 0}% acierto</small></span></div>
            <div class="rank-track"><div class="rank-fill" style="width:${(s.pts / maxPts) * 100}%; background:${s.color}"></div></div>
          </div>
        </div>`).join("")}
    </div>`;

  // --- Gráfico de evolución ---
  const chart = `
    <div class="panel">
      <h3>📈 Evolución punto a punto</h3>
      <div class="chart-box"><canvas id="evo-chart"></canvas></div>
    </div>`;

  // --- Detalle de partidos jugados ---
  const details = `
    <div class="panel">
      <h3>⚽ Partidos jugados</h3>
      ${[...played].reverse().map((m) => {
        const res = RESULTS[m.id];
        return `
        <div class="match-result">
          <div class="mr-head">
            <span class="mr-meta">#${m.id} · Grupo ${m.group} · ${m.d}</span>
            <span class="mr-score">${m.h} <strong>${res.score}</strong> ${m.a} <span class="mr-sign">(${res.r})</span></span>
          </div>
          <div class="mr-chips">
            ${PORRAS.map((p) => {
              const pick = pickOf(p, m.id);
              const ok = pick === res.r;
              return `<span class="chip ${ok ? "ok" : "ko"}" title="${p.name}: ${pick}">${ok ? "✅" : "❌"} ${p.name} · ${pick}</span>`;
            }).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>`;

  root.innerHTML = stats + ranking + chart + details;
}

// El gráfico se crea al abrir la pestaña por primera vez:
// crearlo con el panel oculto (display:none) deja el canvas a tamaño 0.
let evoChart = null;
function buildChart() {
  const canvas = document.getElementById("evo-chart");
  if (evoChart || !canvas) return;
  const played = playedMatches();
  const labels = played.map((m) => `${m.h.slice(0, 3).toUpperCase()}-${m.a.slice(0, 3).toUpperCase()}`);
  evoChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Inicio", ...labels],
      datasets: computeStandings().map((s) => ({
        label: s.name,
        data: [0, ...s.cumulative],
        borderColor: s.color,
        backgroundColor: s.color,
        tension: 0.25,
        borderWidth: 2.5,
        pointRadius: 3,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, color: "#93a0c4" }, grid: { color: "rgba(147,160,196,0.12)" } },
        x: { ticks: { color: "#93a0c4" }, grid: { display: false } },
      },
      plugins: {
        legend: { position: "bottom", labels: { color: "#eef2ff", usePointStyle: true, pointStyle: "circle", padding: 14 } },
      },
    },
  });
}

renderResults();
document.querySelector('.tab[data-tab="resultados"]').addEventListener("click", () => setTimeout(buildChart, 0));
