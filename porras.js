// ===== Porras de la peña (extraídas de los PDF enviados) =====
// code: 72 caracteres 1/X/2 en el orden de partidos de data.js (ids 1..72)
const PORRAS = [
  { name: "Blanca", code: "1111X2121X12X221211211X11211X21112121112X2121122121221111X22121X22XX1221" },
  { name: "Diego Sandía", code: "111222221221222121221111121122112222211212121122221111121212121121111221" },
  { name: "Eli", code: "11112212111212212112111X121112X112121X1212121122121221111222121122111221" },
  { name: "Marco", code: "1XX122XX12X2X2212122X11X12112X2X1212XX121212X12212X12X1X1XX212112XX21221" },
  { name: "Pablo", code: "111112121121122121121111121122111212121212121122121121111222121121111221" },
  { name: "Pece", code: "1X1122X211X1122121121X211X11X2X112121X1212121112121X211112X21211211X1221" },
  { name: "TalisPicks", code: "1X1122121111X221211211X11X11X21112121112X21211221211211112X2121121X1122X" },
];

// ===== Resultados oficiales (los va actualizando el organizador) =====
// matchId -> { r: "1" | "X" | "2", score: "goles local-goles visitante" }
const RESULTS = {
  1: { r: "1", score: "2-0" }, // 11 jun · México 2-0 Sudáfrica
  2: { r: "1", score: "2-1" }, // 11 jun · Corea del Sur 2-1 Chequia
  7: { r: "X", score: "1-1" }, // 12 jun · Canadá 1-1 Bosnia
  8: { r: "X", score: "1-1" }, // 13 jun · Catar 1-1 Suiza
  13: { r: "X", score: "1-1" }, // 13 jun · Brasil 1-1 Marruecos
  14: { r: "2", score: "0-1" }, // 13 jun · Haití 0-1 Escocia
  19: { r: "1", score: "4-1" }, // 12 jun · Estados Unidos 4-1 Paraguay
  20: { r: "1", score: "2-0" }, // 13 jun · Australia 2-0 Turquía
  25: { r: "1", score: "7-1" }, // 14 jun · Alemania 7-1 Curazao
  26: { r: "1", score: "1-0" }, // 14 jun · Costa de Marfil 1-0 Ecuador
  31: { r: "X", score: "2-2" }, // 14 jun · Países Bajos 2-2 Japón
  32: { r: "1", score: "5-1" }, // 14 jun · Suecia 5-1 Túnez
  37: { r: "X", score: "1-1" }, // 15 jun · Bélgica 1-1 Egipto
  38: { r: "X", score: "2-2" }, // 15 jun · Irán 2-2 Nueva Zelanda
  43: { r: "X", score: "0-0" }, // 15 jun · España 0-0 Cabo Verde
  44: { r: "X", score: "1-1" }, // 15 jun · Arabia Saudí 1-1 Uruguay
  49: { r: "1", score: "3-1" }, // 16 jun · Francia 3-1 Senegal
  50: { r: "2", score: "1-4" }, // 16 jun · Irak 1-4 Noruega
  55: { r: "1", score: "3-0" }, // 16 jun · Argentina 3-0 Argelia
  56: { r: "1", score: "3-1" }, // 16 jun · Austria 3-1 Jordania
  61: { r: "X", score: "1-1" }, // 17 jun · Portugal 1-1 RD Congo
  62: { r: "2", score: "1-3" }, // 17 jun · Uzbekistán 1-3 Colombia
  67: { r: "1", score: "4-2" }, // 17 jun · Inglaterra 4-2 Croacia
  68: { r: "1", score: "1-0" }, // 17 jun · Ghana 1-0 Panamá
};
