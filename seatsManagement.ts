// Gestión de asientos de cine: matriz 8x10 (L = libre, X = ocupado)

const FILAS = 8;
const COLUMNAS = 10;

type Estado = "L" | "X";
type Sala = Estado[][];
type Escenario = "vacia" | "parcial" | "casiLlena" | "llena";

/** 1. Inicializar la matriz de asientos */
function inicializarAsientos(filas: number = FILAS, columnas: number = COLUMNAS): Sala {
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

/** 2. Reservar un asiento concreto (índices base 0). Devuelve true si se pudo reservar */
function reservarAsiento(sala: Sala, fila: number, columna: number): boolean {
  if (fila < 0 || fila >= sala.length || columna < 0 || columna >= sala[0].length) {
    console.log(`No existe el asiento (${fila},${columna})`);
    return false;
  }
  if (sala[fila][columna] === "X") {
    console.log(`El asiento (${fila},${columna}) ya está ocupado`);
    return false;
  }
  sala[fila][columna] = "X";
  console.log(`Asiento (${fila},${columna}) reservado correctamente`);
  return true;
}

/** 3. Imprimir los asientos con ejes numerados de filas y columnas (base 1) */
function imprimirAsientos(sala: Sala): void {
  console.log("\n=== ESTADO DE LA SALA ===");

  let cabecera = "    ";
  for (let c = 0; c < sala[0].length; c++) {
    cabecera += `${String(c + 1).padStart(2, " ")} `;
  }
  console.log(cabecera);
  console.log("   " + "---".repeat(sala[0].length));

  for (let f = 0; f < sala.length; f++) {
    let linea = `${String(f + 1).padStart(2, " ")} | `;
    for (let c = 0; c < sala[f].length; c++) {
      linea += `${sala[f][c]}  `;
    }
    console.log(linea);
  }
  console.log("=========================\n");
}

/** 4. Contar sillas: totales, libres y ocupadas */
function contarSillas(sala: Sala): { total: number; libres: number; ocupadas: number } {
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

/** 5. Hallar los dos primeros asientos adyacentes libres en la misma fila */
function buscarDosAdyacentes(sala: Sala): [number, number][] | null {
  for (let f = 0; f < sala.length; f++) {
    for (let c = 0; c < sala[f].length - 1; c++) {
      if (sala[f][c] === "L" && sala[f][c + 1] === "L") {
        return [[f, c], [f, c + 1]];
      }
    }
  }
  return null;
}

/** Genera la sala del escenario indicado */
function crearEscenario(tipo: Escenario): Sala {
  const sala = inicializarAsientos();

  switch (tipo) {
    case "vacia":
      break;

    case "parcial":
      // Bloques dispersos ocupados, dejando filas enteras libres
      for (let c = 0; c < 4; c++) sala[0][c] = "X";
      for (let c = 3; c < 8; c++) sala[2][c] = "X";
      for (let c = 6; c < COLUMNAS; c++) sala[5][c] = "X";
      sala[3][1] = "X";
      sala[6][4] = "X";
      break;

    case "casiLlena":
      // Todo ocupado salvo asientos sueltos no contiguos
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

/** Imprime el informe completo de una sala: cuadrícula, conteo y adyacentes */
function mostrarEscenario(titulo: string, sala: Sala): void {
  console.log(`\n########## ${titulo} ##########`);
  imprimirAsientos(sala);

  const conteo = contarSillas(sala);
  console.log(`Total: ${conteo.total} | Libres: ${conteo.libres} | Ocupadas: ${conteo.ocupadas}`);

  const adyacentes = buscarDosAdyacentes(sala);
  if (adyacentes) {
    const [a, b] = adyacentes;
    console.log(
      `Primeros dos asientos adyacentes libres: fila ${a[0] + 1}, columnas ${a[1] + 1} y ${b[1] + 1}`
    );
  } else {
    console.log("No hay dos asientos adyacentes libres");
  }
}

/** 6. Función principal: ejecuta la demostración completa */
function main(): void {
  console.log("### GESTIÓN DE ASIENTOS DE CINE ###");

  console.log("\n>>> DEMO DE RESERVAS <<<");
  const sala: Sala = inicializarAsientos();
  imprimirAsientos(sala);

  console.log("--- Reservas ---");
  reservarAsiento(sala, 0, 0);
  reservarAsiento(sala, 0, 1);
  reservarAsiento(sala, 0, 2);
  reservarAsiento(sala, 3, 5);
  reservarAsiento(sala, 3, 5); // ya ocupado
  reservarAsiento(sala, 9, 9); // fuera de rango

  imprimirAsientos(sala);

  console.log("--- Conteo ---");
  const conteo = contarSillas(sala);
  console.log(`Total de sillas: ${conteo.total}`);
  console.log(`Libres: ${conteo.libres}`);
  console.log(`Ocupadas: ${conteo.ocupadas}`);

  console.log("\n--- Asientos adyacentes ---");
  const adyacentes = buscarDosAdyacentes(sala);
  if (adyacentes) {
    const [a, b] = adyacentes;
    console.log(`Primeros dos asientos adyacentes libres: (${a[0]},${a[1]}) y (${b[0]},${b[1]})`);
  } else {
    console.log("No hay dos asientos adyacentes libres");
  }

  console.log("\n>>> ESCENARIOS <<<");
  mostrarEscenario("1. SALA COMPLETAMENTE VACÍA", crearEscenario("vacia"));
  mostrarEscenario("2. SALA PARCIALMENTE OCUPADA", crearEscenario("parcial"));
  mostrarEscenario("3. SALA CASI LLENA (ASIENTOS SUELTOS)", crearEscenario("casiLlena"));
  mostrarEscenario("4. SALA COMPLETAMENTE LLENA", crearEscenario("llena"));

  console.log("\n### FIN ###");
}

main();
