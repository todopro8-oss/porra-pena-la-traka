// ===== Estado =====
const STORE_KEY = "porra-la-traka";

let state = { name: "", picks: {} }; // picks: { matchId: "1" | "X" | "2" }
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY));
  if (saved && typeof saved === "object") state = { name: saved.name || "", picks: saved.picks || {} };
} catch (_) {}

function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

// Lista plana de partidos con id global estable (1..72)
const MATCHES = [];
GROUPS.forEach((g) => {
  g.matches.forEach((m, i) => {
    MATCHES.push({ id: MATCHES.length + 1, group: g.letter, ...m });
  });
});

// ===== Render =====
const groupsEl = document.getElementById("groups");

function flagImg(code, alt) {
  return `<img src="https://flagcdn.com/w40/${code}.png" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
}

function render() {
  groupsEl.innerHTML = GROUPS.map((g) => {
    const rows = MATCHES.filter((m) => m.group === g.letter)
      .map((m) => {
        const pick = state.picks[m.id] || "";
        return `
        <div class="match" data-id="${m.id}">
          <div class="team home ${pick === "1" ? "winner" : ""}">
            <span class="name">${m.h}</span>${flagImg(m.hc, m.h)}
          </div>
          <div class="pick-box">
            <span class="match-date">${m.d}</span>
            <div class="picks">
              <button class="pick ${pick === "1" ? "selected" : ""}" data-pick="1">1</button>
              <button class="pick ${pick === "X" ? "selected" : ""}" data-pick="X">X</button>
              <button class="pick ${pick === "2" ? "selected" : ""}" data-pick="2">2</button>
            </div>
          </div>
          <div class="team away ${pick === "2" ? "winner" : ""}">
            ${flagImg(m.ac, m.a)}<span class="name">${m.a}</span>
          </div>
        </div>`;
      })
      .join("");

    const done = g.matches.length;
    const count = MATCHES.filter((m) => m.group === g.letter && state.picks[m.id]).length;
    return `
    <article class="group-card ${count === done ? "complete" : ""}" id="group-${g.letter}">
      <div class="group-head">
        <h2>Grupo ${g.letter}</h2>
        <span class="group-count">${count === done ? "✔ completo" : `${count}/${done}`}</span>
      </div>
      ${rows}
    </article>`;
  }).join("");

  updateProgress();
}

function updateProgress() {
  const n = Object.keys(state.picks).filter((k) => state.picks[k]).length;
  const fill = document.getElementById("progress-fill");
  fill.style.width = `${(n / TOTAL_MATCHES) * 100}%`;
  fill.classList.toggle("done", n === TOTAL_MATCHES);
  document.getElementById("progress-label").textContent = `${n} / ${TOTAL_MATCHES}`;
  document.getElementById("btn-export").classList.toggle("ready", n === TOTAL_MATCHES && state.name.trim() !== "");
}

// ===== Interacción =====
groupsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".pick");
  if (!btn) return;
  const matchEl = btn.closest(".match");
  const id = matchEl.dataset.id;
  const val = btn.dataset.pick;
  // toggle: volver a pulsar deselecciona
  if (state.picks[id] === val) delete state.picks[id];
  else state.picks[id] = val;
  save();
  render();
});

const nameInput = document.getElementById("player-name");
nameInput.value = state.name;
nameInput.addEventListener("input", () => {
  state.name = nameInput.value;
  save();
  updateProgress();
});

// Tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
  });
});

// Rellenar al azar (solo los vacíos)
document.getElementById("btn-random").addEventListener("click", () => {
  const opts = ["1", "X", "2"];
  let filled = 0;
  MATCHES.forEach((m) => {
    if (!state.picks[m.id]) {
      state.picks[m.id] = opts[Math.floor(Math.random() * 3)];
      filled++;
    }
  });
  save();
  render();
  toast(filled ? `🎲 ${filled} partidos rellenados al azar. ¡Valiente!` : "Ya estaba todo relleno 😉");
});

// Borrar todo
document.getElementById("btn-clear").addEventListener("click", () => {
  if (!Object.keys(state.picks).length) return toast("No hay nada que borrar 🤷");
  if (!confirm("¿Seguro que quieres borrar todos tus pronósticos?")) return;
  state.picks = {};
  save();
  render();
  toast("🗑️ Porra borrada. Empezamos de cero.");
});

// ===== Exportar PDF =====
document.getElementById("btn-export").addEventListener("click", () => {
  const name = state.name.trim();
  if (!name) {
    toast("✏️ Pon tu nombre antes de exportar");
    nameInput.focus();
    return;
  }
  const missing = MATCHES.filter((m) => !state.picks[m.id]).length;
  if (missing > 0) {
    toast(`⚠️ Te faltan ${missing} partidos por pronosticar`);
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 94, 58);
  doc.text("PORRA PEÑA LA TRAKA", 105, 18, { align: "center" });
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text("Mundial 2026 · Fase de grupos", 105, 25, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text(`Jugador: ${name}`, 14, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generado: ${new Date().toLocaleString("es-ES")}`, 14, 42);

  const body = MATCHES.map((m) => {
    const p = state.picks[m.id];
    const detail = p === "1" ? m.h : p === "2" ? m.a : "Empate";
    return [m.id, m.group, m.d, `${m.h} - ${m.a}`, p, detail];
  });

  doc.autoTable({
    startY: 47,
    head: [["#", "Grupo", "Fecha", "Partido", "Pron.", "Detalle"]],
    body,
    theme: "grid",
    styles: { font: "helvetica", fontSize: 8, cellPadding: 1.6 },
    headStyles: { fillColor: [255, 94, 58], textColor: 255, fontStyle: "bold" },
    columnStyles: {
      0: { cellWidth: 9, halign: "center" },
      1: { cellWidth: 14, halign: "center" },
      2: { cellWidth: 16 },
      4: { cellWidth: 13, halign: "center", fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [248, 246, 242] },
  });

  // Código compacto para el análisis posterior (orden de partidos 1..72)
  const code = MATCHES.map((m) => state.picks[m.id]).join("");
  const y = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(`CODIGO: ${name}|${code}`, 14, y > 285 ? 285 : y);

  const slug = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
  doc.save(`porra-la-traka_${slug}.pdf`);
  toast("📄 ¡PDF generado! Envíaselo al organizador 🧨");
});

// ===== Toast =====
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

render();
