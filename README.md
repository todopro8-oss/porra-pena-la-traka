# 🧨 Porra Peña La Traka · Mundial 2026

La porra del Mundial 2026 para la Peña La Traka. Web estática, sin servidor: pronostica los 72 partidos de la fase de grupos con 1-X-2, pon tu nombre y exporta tu porra en PDF.

## Cómo funciona

1. Abre la web y pon tu nombre.
2. Marca **1**, **X** o **2** en cada uno de los 72 partidos (se guarda solo en tu dispositivo).
3. Si te aburres, el botón 🎲 rellena al azar lo que te falte.
4. Cuando esté todo, pulsa **📄 Exportar PDF** y envía el archivo al organizador.

El PDF incluye un código compacto (`CODIGO: nombre|1X2...`) con los 72 pronósticos en orden, para facilitar el análisis automático de las porras.

## Resultados

La pestaña **Resultados** muestra la clasificación de la peña (1 punto por acierto), un gráfico de evolución punto a punto y el detalle de cada partido jugado con los aciertos de cada porrero.

- Las porras de los participantes están en `porras.js` (`PORRAS`, extraídas de los PDF con `tools/extract_codes.py`).
- Los resultados oficiales se actualizan a mano en `porras.js` (`RESULTS`): id del partido → `{ r: "1"|"X"|"2", score: "2-0" }`.

## Desarrollo

Sin dependencias ni build: HTML + CSS + JS planos. Basta con abrir `index.html` o servir la carpeta con cualquier servidor estático.
