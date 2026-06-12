# 🧨 Porra Peña La Traka · Mundial 2026

La porra del Mundial 2026 de la Peña La Traka. Web estática, sin servidor. Las porras ya están cerradas (72 pronósticos 1-X-2 de la fase de grupos por jugador); ahora la web muestra:

- **🏆 Resultados**: clasificación de la peña (1 punto por acierto), gráfico de evolución punto a punto y detalle de cada partido jugado con los aciertos de cada porrero.
- **🔬 Análisis**: matriz de sinergias (en cuántos pronósticos coincide cada pareja), perfil porrero (reparto de 1/X/2, el más localista/empatador/visitante) y los partidos más polémicos de la peña.

## Datos

- Las porras de los participantes están en `porras.js` (`PORRAS`), extraídas de los PDF que exportó cada jugador con `tools/extract_codes.py` (línea `CODIGO: nombre|72×[1X2]`).
- Los resultados oficiales se actualizan a mano en `porras.js` (`RESULTS`): id del partido (1–72, orden de `data.js`) → `{ r: "1"|"X"|"2", score: "2-0" }`.

## Desarrollo

Sin dependencias ni build: HTML + CSS + JS planos (Chart.js por CDN). Basta con abrir `index.html` o servir la carpeta con cualquier servidor estático.
