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
  3: { r: "X", score: "1-1" }, // 18 jun · Chequia 1-1 Sudáfrica
  4: { r: "1", score: "1-0" }, // 18 jun · México 1-0 Corea del Sur
  7: { r: "X", score: "1-1" }, // 12 jun · Canadá 1-1 Bosnia
  8: { r: "X", score: "1-1" }, // 13 jun · Catar 1-1 Suiza
  9: { r: "1", score: "4-1" }, // 18 jun · Suiza 4-1 Bosnia
  10: { r: "1", score: "6-0" }, // 18 jun · Canadá 6-0 Catar
  13: { r: "X", score: "1-1" }, // 13 jun · Brasil 1-1 Marruecos
  14: { r: "2", score: "0-1" }, // 13 jun · Haití 0-1 Escocia
  15: { r: "2", score: "0-1" }, // 19 jun · Escocia 0-1 Marruecos
  16: { r: "1", score: "3-0" }, // 19 jun · Brasil 3-0 Haití
  19: { r: "1", score: "4-1" }, // 12 jun · Estados Unidos 4-1 Paraguay
  20: { r: "1", score: "2-0" }, // 13 jun · Australia 2-0 Turquía
  21: { r: "1", score: "2-0" }, // 19 jun · Estados Unidos 2-0 Australia
  22: { r: "2", score: "0-1" }, // 19 jun · Turquía 0-1 Paraguay
  25: { r: "1", score: "7-1" }, // 14 jun · Alemania 7-1 Curazao
  26: { r: "1", score: "1-0" }, // 14 jun · Costa de Marfil 1-0 Ecuador
  27: { r: "1", score: "2-1" }, // 20 jun · Alemania 2-1 Costa de Marfil
  28: { r: "X", score: "0-0" }, // 20 jun · Ecuador 0-0 Curazao
  31: { r: "X", score: "2-2" }, // 14 jun · Países Bajos 2-2 Japón
  32: { r: "1", score: "5-1" }, // 14 jun · Suecia 5-1 Túnez
  33: { r: "1", score: "5-1" }, // 20 jun · Países Bajos 5-1 Suecia
  34: { r: "2", score: "0-4" }, // 20 jun · Túnez 0-4 Japón
  37: { r: "X", score: "1-1" }, // 15 jun · Bélgica 1-1 Egipto
  38: { r: "X", score: "2-2" }, // 15 jun · Irán 2-2 Nueva Zelanda
  39: { r: "X", score: "0-0" }, // 21 jun · Bélgica 0-0 Irán
  40: { r: "2", score: "1-3" }, // 21 jun · Nueva Zelanda 1-3 Egipto
  43: { r: "X", score: "0-0" }, // 15 jun · España 0-0 Cabo Verde
  44: { r: "X", score: "1-1" }, // 15 jun · Arabia Saudí 1-1 Uruguay
  45: { r: "1", score: "4-0" }, // 21 jun · España 4-0 Arabia Saudí
  46: { r: "X", score: "2-2" }, // 21 jun · Uruguay 2-2 Cabo Verde
  49: { r: "1", score: "3-1" }, // 16 jun · Francia 3-1 Senegal
  50: { r: "2", score: "1-4" }, // 16 jun · Irak 1-4 Noruega
  55: { r: "1", score: "3-0" }, // 16 jun · Argentina 3-0 Argelia
  56: { r: "1", score: "3-1" }, // 16 jun · Austria 3-1 Jordania
  57: { r: "1", score: "2-0" }, // 22 jun · Argentina 2-0 Austria
  61: { r: "X", score: "1-1" }, // 17 jun · Portugal 1-1 RD Congo
  62: { r: "2", score: "1-3" }, // 17 jun · Uzbekistán 1-3 Colombia
  67: { r: "1", score: "4-2" }, // 17 jun · Inglaterra 4-2 Croacia
  68: { r: "1", score: "1-0" }, // 17 jun · Ghana 1-0 Panamá
};
