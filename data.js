// Mundial 2026 — Fase de grupos (72 partidos)
// hc/ac = códigos de bandera (flagcdn.com)
const GROUPS = [
  {
    letter: "A",
    matches: [
      { d: "11 jun", h: "México", hc: "mx", a: "Sudáfrica", ac: "za" },
      { d: "11 jun", h: "Corea del Sur", hc: "kr", a: "Chequia", ac: "cz" },
      { d: "18 jun", h: "Chequia", hc: "cz", a: "Sudáfrica", ac: "za" },
      { d: "18 jun", h: "México", hc: "mx", a: "Corea del Sur", ac: "kr" },
      { d: "24 jun", h: "Chequia", hc: "cz", a: "México", ac: "mx" },
      { d: "24 jun", h: "Sudáfrica", hc: "za", a: "Corea del Sur", ac: "kr" },
    ],
  },
  {
    letter: "B",
    matches: [
      { d: "12 jun", h: "Canadá", hc: "ca", a: "Bosnia", ac: "ba" },
      { d: "13 jun", h: "Catar", hc: "qa", a: "Suiza", ac: "ch" },
      { d: "18 jun", h: "Suiza", hc: "ch", a: "Bosnia", ac: "ba" },
      { d: "18 jun", h: "Canadá", hc: "ca", a: "Catar", ac: "qa" },
      { d: "24 jun", h: "Suiza", hc: "ch", a: "Canadá", ac: "ca" },
      { d: "24 jun", h: "Bosnia", hc: "ba", a: "Catar", ac: "qa" },
    ],
  },
  {
    letter: "C",
    matches: [
      { d: "13 jun", h: "Brasil", hc: "br", a: "Marruecos", ac: "ma" },
      { d: "13 jun", h: "Haití", hc: "ht", a: "Escocia", ac: "gb-sct" },
      { d: "19 jun", h: "Escocia", hc: "gb-sct", a: "Marruecos", ac: "ma" },
      { d: "19 jun", h: "Brasil", hc: "br", a: "Haití", ac: "ht" },
      { d: "24 jun", h: "Escocia", hc: "gb-sct", a: "Brasil", ac: "br" },
      { d: "24 jun", h: "Marruecos", hc: "ma", a: "Haití", ac: "ht" },
    ],
  },
  {
    letter: "D",
    matches: [
      { d: "12 jun", h: "Estados Unidos", hc: "us", a: "Paraguay", ac: "py" },
      { d: "13 jun", h: "Australia", hc: "au", a: "Turquía", ac: "tr" },
      { d: "19 jun", h: "Estados Unidos", hc: "us", a: "Australia", ac: "au" },
      { d: "19 jun", h: "Turquía", hc: "tr", a: "Paraguay", ac: "py" },
      { d: "25 jun", h: "Turquía", hc: "tr", a: "Estados Unidos", ac: "us" },
      { d: "25 jun", h: "Paraguay", hc: "py", a: "Australia", ac: "au" },
    ],
  },
  {
    letter: "E",
    matches: [
      { d: "14 jun", h: "Alemania", hc: "de", a: "Curazao", ac: "cw" },
      { d: "14 jun", h: "Costa de Marfil", hc: "ci", a: "Ecuador", ac: "ec" },
      { d: "20 jun", h: "Alemania", hc: "de", a: "Costa de Marfil", ac: "ci" },
      { d: "20 jun", h: "Ecuador", hc: "ec", a: "Curazao", ac: "cw" },
      { d: "25 jun", h: "Ecuador", hc: "ec", a: "Alemania", ac: "de" },
      { d: "25 jun", h: "Curazao", hc: "cw", a: "Costa de Marfil", ac: "ci" },
    ],
  },
  {
    letter: "F",
    matches: [
      { d: "14 jun", h: "Países Bajos", hc: "nl", a: "Japón", ac: "jp" },
      { d: "14 jun", h: "Suecia", hc: "se", a: "Túnez", ac: "tn" },
      { d: "20 jun", h: "Países Bajos", hc: "nl", a: "Suecia", ac: "se" },
      { d: "20 jun", h: "Túnez", hc: "tn", a: "Japón", ac: "jp" },
      { d: "25 jun", h: "Japón", hc: "jp", a: "Suecia", ac: "se" },
      { d: "25 jun", h: "Túnez", hc: "tn", a: "Países Bajos", ac: "nl" },
    ],
  },
  {
    letter: "G",
    matches: [
      { d: "15 jun", h: "Bélgica", hc: "be", a: "Egipto", ac: "eg" },
      { d: "15 jun", h: "Irán", hc: "ir", a: "Nueva Zelanda", ac: "nz" },
      { d: "21 jun", h: "Bélgica", hc: "be", a: "Irán", ac: "ir" },
      { d: "21 jun", h: "Nueva Zelanda", hc: "nz", a: "Egipto", ac: "eg" },
      { d: "26 jun", h: "Egipto", hc: "eg", a: "Irán", ac: "ir" },
      { d: "26 jun", h: "Nueva Zelanda", hc: "nz", a: "Bélgica", ac: "be" },
    ],
  },
  {
    letter: "H",
    matches: [
      { d: "15 jun", h: "España", hc: "es", a: "Cabo Verde", ac: "cv" },
      { d: "15 jun", h: "Arabia Saudí", hc: "sa", a: "Uruguay", ac: "uy" },
      { d: "21 jun", h: "España", hc: "es", a: "Arabia Saudí", ac: "sa" },
      { d: "21 jun", h: "Uruguay", hc: "uy", a: "Cabo Verde", ac: "cv" },
      { d: "26 jun", h: "Cabo Verde", hc: "cv", a: "Arabia Saudí", ac: "sa" },
      { d: "26 jun", h: "Uruguay", hc: "uy", a: "España", ac: "es" },
    ],
  },
  {
    letter: "I",
    matches: [
      { d: "16 jun", h: "Francia", hc: "fr", a: "Senegal", ac: "sn" },
      { d: "16 jun", h: "Irak", hc: "iq", a: "Noruega", ac: "no" },
      { d: "22 jun", h: "Francia", hc: "fr", a: "Irak", ac: "iq" },
      { d: "22 jun", h: "Noruega", hc: "no", a: "Senegal", ac: "sn" },
      { d: "26 jun", h: "Noruega", hc: "no", a: "Francia", ac: "fr" },
      { d: "26 jun", h: "Senegal", hc: "sn", a: "Irak", ac: "iq" },
    ],
  },
  {
    letter: "J",
    matches: [
      { d: "16 jun", h: "Argentina", hc: "ar", a: "Argelia", ac: "dz" },
      { d: "16 jun", h: "Austria", hc: "at", a: "Jordania", ac: "jo" },
      { d: "22 jun", h: "Argentina", hc: "ar", a: "Austria", ac: "at" },
      { d: "22 jun", h: "Jordania", hc: "jo", a: "Argelia", ac: "dz" },
      { d: "27 jun", h: "Argelia", hc: "dz", a: "Austria", ac: "at" },
      { d: "27 jun", h: "Jordania", hc: "jo", a: "Argentina", ac: "ar" },
    ],
  },
  {
    letter: "K",
    matches: [
      { d: "17 jun", h: "Portugal", hc: "pt", a: "RD Congo", ac: "cd" },
      { d: "17 jun", h: "Uzbekistán", hc: "uz", a: "Colombia", ac: "co" },
      { d: "23 jun", h: "Portugal", hc: "pt", a: "Uzbekistán", ac: "uz" },
      { d: "23 jun", h: "Colombia", hc: "co", a: "RD Congo", ac: "cd" },
      { d: "27 jun", h: "Colombia", hc: "co", a: "Portugal", ac: "pt" },
      { d: "27 jun", h: "RD Congo", hc: "cd", a: "Uzbekistán", ac: "uz" },
    ],
  },
  {
    letter: "L",
    matches: [
      { d: "17 jun", h: "Inglaterra", hc: "gb-eng", a: "Croacia", ac: "hr" },
      { d: "17 jun", h: "Ghana", hc: "gh", a: "Panamá", ac: "pa" },
      { d: "23 jun", h: "Inglaterra", hc: "gb-eng", a: "Ghana", ac: "gh" },
      { d: "23 jun", h: "Panamá", hc: "pa", a: "Croacia", ac: "hr" },
      { d: "27 jun", h: "Panamá", hc: "pa", a: "Inglaterra", ac: "gb-eng" },
      { d: "27 jun", h: "Croacia", hc: "hr", a: "Ghana", ac: "gh" },
    ],
  },
];

const TOTAL_MATCHES = GROUPS.reduce((n, g) => n + g.matches.length, 0);
