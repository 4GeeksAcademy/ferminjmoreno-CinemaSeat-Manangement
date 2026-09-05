export const FILAS = 8;
export const COLUMNAS = 10;

export type Estado = "L" | "X";
export type Sala = Estado[][];
export type Escenario = "vacia" | "parcial" | "casiLlena" | "llena";

export function inicializarAsientos(filas: number = FILAS, columnas: number = COLUMNAS): Sala {
  const sala: Sala = [];
  for (let f = 0; f < filas; f++) {
    const fila: Estado[] = [];
    for (let c = 0; c < columnas; c++) {
      fila.push("L");
    }
    sala.push(fila);
  }
  return sala;
}

export function reservarAsiento(sala: Sala, fila: number, columna: number): boolean {
  if (fila < 0 || fila >= sala.length || columna < 0 || columna >= sala[0].length) return false;
  if (sala[fila][columna] === "X") return false;
  sala[fila][columna] = "X";
  return true;
}

export function liberarAsiento(sala: Sala, fila: number, columna: number): boolean {
  if (fila < 0 || fila >= sala.length || columna < 0 || columna >= sala[0].length) return false;
  if (sala[fila][columna] === "L") return false;
  sala[fila][columna] = "L";
  return true;
}

export function contarSillas(sala: Sala): { total: number; libres: number; ocupadas: number } {
  let libres = 0;
  let ocupadas = 0;
  for (const fila of sala) {
    for (const asiento of fila) {
      if (asiento === "L") libres++;
      else ocupadas++;
    }
  }
  return { total: libres + ocupadas, libres, ocupadas };
}

export function buscarDosAdyacentes(sala: Sala): [number, number][] | null {
  for (let f = 0; f < sala.length; f++) {
    for (let c = 0; c < sala[f].length - 1; c++) {
      if (sala[f][c] === "L" && sala[f][c + 1] === "L") {
        return [
          [f, c],
          [f, c + 1],
        ];
      }
    }
  }
  return null;
}

export function crearEscenario(tipo: Escenario): Sala {
  const sala = inicializarAsientos();

  switch (tipo) {
    case "vacia":
      break;

    case "parcial":
      for (let c = 0; c < 4; c++) sala[0][c] = "X";
      for (let c = 3; c < 8; c++) sala[2][c] = "X";
      for (let c = 6; c < COLUMNAS; c++) sala[5][c] = "X";
      sala[3][1] = "X";
      sala[6][4] = "X";
      break;

    case "casiLlena":
      for (let f = 0; f < FILAS; f++) {
        for (let c = 0; c < COLUMNAS; c++) sala[f][c] = "X";
      }
      sala[1][2] = "L";
      sala[4][7] = "L";
      sala[7][0] = "L";
      break;

    case "llena":
      for (let f = 0; f < FILAS; f++) {
        for (let c = 0; c < COLUMNAS; c++) sala[f][c] = "X";
      }
      break;
  }

  return sala;
}
