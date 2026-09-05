import "./style.css";
import {
  COLUMNAS,
  buscarDosAdyacentes,
  contarSillas,
  crearEscenario,
  inicializarAsientos,
  liberarAsiento,
  reservarAsiento,
  type Escenario,
  type Sala,
} from "./cinema";

const SEAT_BASE =
  "flex h-9 w-9 items-center justify-center rounded-t-lg rounded-b-sm text-xs font-bold transition duration-150 focus:outline-none focus:ring-2 focus:ring-amber-300";
const SEAT_LIBRE =
  "border border-red-500/50 bg-gradient-to-b from-red-700/40 to-red-950/60 text-red-300/70 hover:from-red-600/70 hover:to-red-900/80 hover:scale-110";
const SEAT_OCUPADO =
  "border border-red-300 bg-gradient-to-b from-red-500 to-red-800 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] hover:scale-110";
const SEAT_SUGERIDO = "ring-2 ring-amber-300 ring-offset-2 ring-offset-black";

const seatMap = document.querySelector<HTMLDivElement>("#seatMap")!;
const stats = document.querySelector<HTMLDListElement>("#stats")!;
const suggestion = document.querySelector<HTMLParagraphElement>("#suggestion")!;
const scenarios = document.querySelector<HTMLDivElement>("#scenarios")!;
const btnAdyacentes = document.querySelector<HTMLButtonElement>("#btnAdyacentes")!;
const log = document.querySelector<HTMLParagraphElement>("#log")!;

let sala: Sala = inicializarAsientos();
let sugeridos: string[] = [];

function renderSeatMap(): void {
  seatMap.replaceChildren();

  const grid = document.createElement("div");
  grid.className = "mx-auto w-max";

  const header = document.createElement("div");
  header.className = "mb-2 flex gap-2 pl-10";
  for (let c = 0; c < COLUMNAS; c++) {
    const label = document.createElement("span");
    label.className = "w-9 text-center text-xs font-semibold text-neutral-500";
    label.textContent = String(c + 1);
    header.append(label);
  }
  grid.append(header);

  for (let f = 0; f < sala.length; f++) {
    const row = document.createElement("div");
    row.className = "mb-2 flex items-center gap-2";

    const rowLabel = document.createElement("span");
    rowLabel.className = "w-8 text-right text-xs font-semibold text-neutral-500";
    rowLabel.textContent = String(f + 1);
    row.append(rowLabel);

    for (let c = 0; c < sala[f].length; c++) {
      const ocupado = sala[f][c] === "X";
      const seat = document.createElement("button");
      seat.type = "button";
      seat.className = `${SEAT_BASE} ${ocupado ? SEAT_OCUPADO : SEAT_LIBRE} ${
        sugeridos.includes(`${f}-${c}`) ? SEAT_SUGERIDO : ""
      }`;
      seat.textContent = sala[f][c];
      seat.title = `Fila ${f + 1}, Columna ${c + 1} — ${ocupado ? "Ocupado" : "Libre"}`;
      seat.addEventListener("click", () => toggleSeat(f, c));
      row.append(seat);
    }

    grid.append(row);
  }

  seatMap.append(grid);
}

function toggleSeat(fila: number, columna: number): void {
  sugeridos = [];
  const reservado = reservarAsiento(sala, fila, columna);
  if (reservado) {
    log.textContent = `Asiento reservado en fila ${fila + 1}, columna ${columna + 1}`;
  } else {
    liberarAsiento(sala, fila, columna);
    log.textContent = `Asiento liberado en fila ${fila + 1}, columna ${columna + 1}`;
  }
  render();
}

function renderStats(): void {
  const { total, libres, ocupadas } = contarSillas(sala);
  const items: [string, number, string][] = [
    ["Total", total, "text-neutral-200"],
    ["Libres", libres, "text-emerald-400"],
    ["Ocupadas", ocupadas, "text-red-400"],
  ];

  stats.replaceChildren();
  for (const [label, value, color] of items) {
    const wrapper = document.createElement("div");
    wrapper.className = "rounded-lg border border-neutral-800 bg-black/40 p-3";

    const dt = document.createElement("dt");
    dt.className = "text-xs uppercase tracking-widest text-neutral-500";
    dt.textContent = label;

    const dd = document.createElement("dd");
    dd.className = `text-2xl font-bold ${color}`;
    dd.textContent = String(value);

    wrapper.append(dt, dd);
    stats.append(wrapper);
  }
}

function renderScenarios(): void {
  const opciones: [Escenario, string][] = [
    ["vacia", "Vacía"],
    ["parcial", "Parcial"],
    ["casiLlena", "Casi llena"],
    ["llena", "Llena"],
  ];

  scenarios.replaceChildren();
  for (const [tipo, etiqueta] of opciones) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "rounded-lg border border-red-800/60 bg-gradient-to-b from-red-900/40 to-black px-4 py-2 text-sm font-semibold text-red-200 transition hover:from-red-800/60 hover:to-red-950";
    btn.textContent = etiqueta;
    btn.addEventListener("click", () => {
      sala = crearEscenario(tipo);
      sugeridos = [];
      log.textContent = `Escenario cargado: ${etiqueta}`;
      render();
    });
    scenarios.append(btn);
  }
}

function mostrarAdyacentes(): void {
  const par = buscarDosAdyacentes(sala);
  if (par) {
    const [a, b] = par;
    sugeridos = [`${a[0]}-${a[1]}`, `${b[0]}-${b[1]}`];
    suggestion.textContent = `Sugerencia: fila ${a[0] + 1}, columnas ${a[1] + 1} y ${b[1] + 1}`;
  } else {
    sugeridos = [];
    suggestion.textContent = "No hay dos asientos adyacentes libres";
  }
  renderSeatMap();
}

function render(): void {
  renderSeatMap();
  renderStats();
}

btnAdyacentes.addEventListener("click", mostrarAdyacentes);
renderScenarios();
render();
