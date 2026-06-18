"""Actualiza resultados de la porra y publica en GitHub en un solo paso.

Uso:
    python tools/update_results.py 8=2:1-3 13=1:2-0 14=X:1-1
    python tools/update_results.py 8=2:1-3 --no-push        # solo edita el archivo

Cada argumento es  ID=RESULTADO:MARCADOR
  ID        -> número de partido 1..72 (orden de data.js / la pestaña Resultados)
  RESULTADO -> 1 (gana local) | X (empate) | 2 (gana visitante)
  MARCADOR  -> "golesLocal-golesVisitante", p. ej. 2-0

El script:
  1. Lee el calendario de data.js (no hay que duplicar equipos/fechas aquí).
  2. Fusiona los resultados nuevos con los que ya había en porras.js.
  3. Regenera el bloque RESULTS de porras.js (ordenado, con comentarios).
  4. git add + commit + push (salvo --no-push).
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data.js"
PORRAS = ROOT / "porras.js"

MATCH_RE = re.compile(
    r'\{\s*d:\s*"([^"]+)",\s*h:\s*"([^"]+)",\s*hc:\s*"[^"]+",\s*a:\s*"([^"]+)",\s*ac:\s*"[^"]+"\s*\}'
)
RESULT_RE = re.compile(r'(\d+):\s*\{\s*r:\s*"([1X2])",\s*score:\s*"([^"]*)"')
BLOCK_RE = re.compile(r"const RESULTS = \{.*?\n\};", re.DOTALL)


def load_schedule():
    """id (1..72) -> (fecha, local, visitante) leyendo data.js."""
    matches = MATCH_RE.findall(DATA.read_text(encoding="utf-8"))
    return {i + 1: m for i, m in enumerate(matches)}


def load_existing():
    """Resultados ya guardados en porras.js: id -> (r, score)."""
    text = PORRAS.read_text(encoding="utf-8")
    block = BLOCK_RE.search(text)
    if not block:
        sys.exit("No se encontró el bloque RESULTS en porras.js")
    return {int(mid): (r, score) for mid, r, score in RESULT_RE.findall(block.group(0))}


def parse_args(argv):
    """ID=R:score -> (id, r, score)."""
    out = []
    for a in argv:
        m = re.fullmatch(r"(\d+)=([1X2xX]):(\d+-\d+)", a)
        if not m:
            sys.exit(f"Formato inválido: '{a}'. Usa  ID=R:score  (p. ej. 8=2:1-3)")
        out.append((int(m.group(1)), m.group(2).upper(), m.group(3)))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    push = "--no-push" not in sys.argv
    if not args:
        sys.exit(__doc__)

    schedule = load_schedule()
    results = load_existing()
    updated = []
    for mid, r, score in parse_args(args):
        if mid not in schedule:
            sys.exit(f"El partido {mid} no existe (1..{len(schedule)})")
        results[mid] = (r, score)
        updated.append(mid)

    # Regenerar bloque ordenado por id
    lines = ["const RESULTS = {"]
    for mid in sorted(results):
        r, score = results[mid]
        d, home, away = schedule[mid]
        lines.append(f'  {mid}: {{ r: "{r}", score: "{score}" }}, // {d} · {home} {score} {away}')
    lines.append("};")
    new_block = "\n".join(lines)

    text = PORRAS.read_text(encoding="utf-8")
    PORRAS.write_text(BLOCK_RE.sub(new_block, text), encoding="utf-8")

    detail = ", ".join(
        f"{schedule[m][1]} {results[m][1]} {schedule[m][2]} ({results[m][0]})" for m in updated
    )
    print(f"OK · {len(results)} partidos con resultado. Nuevos: {detail}")

    if push:
        subprocess.run(["git", "add", "porras.js"], cwd=ROOT, check=True)
        msg = f"Resultados: {detail}\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
        subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)
        subprocess.run(["git", "push"], cwd=ROOT, check=True)
        print("Publicado en GitHub. Pages se redespliega solo en ~1-2 min.")


if __name__ == "__main__":
    main()
