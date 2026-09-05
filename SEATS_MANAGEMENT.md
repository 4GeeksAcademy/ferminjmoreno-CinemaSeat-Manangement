# Gestión de Asientos de Cine (TypeScript)

## Prompts de la sesión

> debo construir una aplicacion en typeScript de reserva de asientos de un cine, solo debo usar una matriz de 8 filas por 10 columnas se deben crear funciones para:
> 1. Inicializar la matriz de asientos,
> 2. Reservar asientos,
> 3. Imprimir los asientos,
> 4. Contar las sillas
> 5. Hallar los dos primeros asientos adyacentes, los asientos diponibles deberan aparecer con un L de libre en la posicion Fila,Columna o una X de ocupado en la posicion Fila,Columna, lo resultados se mostraran por la linea de comando cuando se compile el .ts y se genere el .js correspondiente, el archivo de porgrama se llamara seatsManagement.ts y se creara en el directorio actual, tambien me creara un archivo .md con todo lo que de aqui resulte. Guardame tambien este prompt en el mismo archivo .md

> debe haber una funcion final que me ejecute todas estas funciones que se llame main o demo

> creame todo

> colocame un eje para numerado para las 10 columns y un eje numerado para las 8 filas y en la posicion fila, columna solo coloca la X o L correspondiente

> Cuando imprimas la matriz muestra la posicion 0,0 como 1, 1 y asi hasta 8,10

> recuerda salvar todo lo que vayas ejecutando en el archivo .md correspondiente

> Como podriamos mostrar distintos escenarios de los asientos:
> 1. Sala completamente vacia,
> 2. Sala Parcialmente ocupada
> 3. Sala casi llena con solo asientos sueltos disponibles
> 4. Sala completamente llena, sin asientos disponibles

> Construyamos a partir de aqui una interfaz visual con HTML y tailwind, basandote en el script elaborado en typScript como contexto. Creame un mapa visual de asientos donde las personas a traves de clic puedan reservar. Hazme una distribucion en la pantalla de todos los asientos, usa colores de fondo negro, preferiblemente y las areas de los asientos, en un rojo degrade, con bordes resaltantes; dame una aproximacion que podemos corregir y seguir iterando

## Descripción

Aplicación de consola en TypeScript que gestiona una sala de cine representada
por una matriz de **8 filas × 10 columnas** (80 asientos).

- `L` → asiento **libre**
- `X` → asiento **ocupado**

La sala se imprime como una cuadrícula con **eje numerado de columnas** (`1..10`)
en la cabecera y **eje numerado de filas** (`1..8`) a la izquierda. En cada
posición fila/columna sólo aparece la `L` o la `X` correspondiente.

## Funciones

| Función | Descripción |
|---|---|
| `inicializarAsientos(filas, columnas)` | Crea la matriz 8×10 con todos los asientos en `L`. |
| `reservarAsiento(sala, fila, columna)` | Marca un asiento como `X`. Valida rango y ocupación. Devuelve `boolean`. |
| `imprimirAsientos(sala)` | Muestra por consola la sala completa con ejes numerados en base 1 (filas `1..8`, columnas `1..10`). |
| `contarSillas(sala)` | Devuelve `{ total, libres, ocupadas }`. |
| `buscarDosAdyacentes(sala)` | Devuelve los dos primeros asientos contiguos libres de una misma fila, o `null`. |
| `crearEscenario(tipo)` | Genera una sala preconfigurada según el escenario: `"vacia"`, `"parcial"`, `"casiLlena"` o `"llena"`. |
| `mostrarEscenario(titulo, sala)` | Imprime el informe de una sala: cuadrícula, conteo y asientos adyacentes. |
| `main()` | Función principal. Ejecuta la demo de reservas y los cuatro escenarios. |

## Escenarios

| # | Escenario | `crearEscenario(...)` | Estrategia |
|---|---|---|---|
| 1 | Sala completamente vacía | `"vacia"` | Matriz recién inicializada, todo `L`. |
| 2 | Sala parcialmente ocupada | `"parcial"` | Bloques dispersos ocupados; quedan filas enteras libres. |
| 3 | Sala casi llena, sólo asientos sueltos | `"casiLlena"` | Todo `X` salvo 3 asientos libres **no contiguos**. |
| 4 | Sala completamente llena | `"llena"` | Todos los asientos a `X`. |

Los escenarios 3 y 4 sirven para validar que `buscarDosAdyacentes` devuelve
`null` cuando no existen dos butacas contiguas libres.

## Tipos

```typescript
type Estado = "L" | "X";
type Sala = Estado[][];
type Escenario = "vacia" | "parcial" | "casiLlena" | "llena";
```

## Flujo de `main()`

1. `inicializarAsientos()` → crea la sala 8×10 vacía.
2. `imprimirAsientos()` → estado inicial (todo `L`).
3. `reservarAsiento()` ×6 → incluye un caso ya ocupado y uno fuera de rango.
4. `imprimirAsientos()` → estado tras las reservas.
5. `contarSillas()` → total, libres y ocupadas.
6. `buscarDosAdyacentes()` → primeros dos asientos contiguos libres.
7. `mostrarEscenario()` ×4 → los cuatro escenarios de ocupación.

La invocación `main();` al final del archivo es lo que dispara toda la salida
al ejecutar el `.js` generado.

## Compilación y ejecución

```bash
npx tsc seatsManagement.ts --target ES2020 --module commonjs --strict
node seatsManagement.js
```

> Nota: el `tsconfig.json` del proyecto usa `noEmit: true` e `include: ["src"]`,
> por lo que se compila el archivo con flags explícitos para generar el `.js`.

Alternativa sin generar el `.js`:

```bash
npx tsx seatsManagement.ts
```

## Salida real de la última ejecución

```
### GESTIÓN DE ASIENTOS DE CINE ###

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | L  L  L  L  L  L  L  L  L  L
 2 | L  L  L  L  L  L  L  L  L  L
 3 | L  L  L  L  L  L  L  L  L  L
 4 | L  L  L  L  L  L  L  L  L  L
 5 | L  L  L  L  L  L  L  L  L  L
 6 | L  L  L  L  L  L  L  L  L  L
 7 | L  L  L  L  L  L  L  L  L  L
 8 | L  L  L  L  L  L  L  L  L  L
=========================

--- Reservas ---
Asiento (0,0) reservado correctamente
Asiento (0,1) reservado correctamente
Asiento (0,2) reservado correctamente
Asiento (3,5) reservado correctamente
El asiento (3,5) ya está ocupado
No existe el asiento (9,9)

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | X  X  X  L  L  L  L  L  L  L
 2 | L  L  L  L  L  L  L  L  L  L
 3 | L  L  L  L  L  L  L  L  L  L
 4 | L  L  L  L  L  X  L  L  L  L
 5 | L  L  L  L  L  L  L  L  L  L
 6 | L  L  L  L  L  L  L  L  L  L
 7 | L  L  L  L  L  L  L  L  L  L
 8 | L  L  L  L  L  L  L  L  L  L
=========================

--- Conteo ---
Total de sillas: 80
Libres: 76
Ocupadas: 4

--- Asientos adyacentes ---
Primeros dos asientos adyacentes libres: (0,3) y (0,4)

### FIN ###
```

## Salida de los cuatro escenarios

```
>>> ESCENARIOS <<<

########## 1. SALA COMPLETAMENTE VACÍA ##########

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | L  L  L  L  L  L  L  L  L  L
 2 | L  L  L  L  L  L  L  L  L  L
 3 | L  L  L  L  L  L  L  L  L  L
 4 | L  L  L  L  L  L  L  L  L  L
 5 | L  L  L  L  L  L  L  L  L  L
 6 | L  L  L  L  L  L  L  L  L  L
 7 | L  L  L  L  L  L  L  L  L  L
 8 | L  L  L  L  L  L  L  L  L  L
=========================

Total: 80 | Libres: 80 | Ocupadas: 0
Primeros dos asientos adyacentes libres: fila 1, columnas 1 y 2

########## 2. SALA PARCIALMENTE OCUPADA ##########

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | X  X  X  X  L  L  L  L  L  L
 2 | L  L  L  L  L  L  L  L  L  L
 3 | L  L  L  X  X  X  X  X  L  L
 4 | L  X  L  L  L  L  L  L  L  L
 5 | L  L  L  L  L  L  L  L  L  L
 6 | L  L  L  L  L  L  X  X  X  X
 7 | L  L  L  L  X  L  L  L  L  L
 8 | L  L  L  L  L  L  L  L  L  L
=========================

Total: 80 | Libres: 65 | Ocupadas: 15
Primeros dos asientos adyacentes libres: fila 1, columnas 5 y 6

########## 3. SALA CASI LLENA (ASIENTOS SUELTOS) ##########

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | X  X  X  X  X  X  X  X  X  X
 2 | X  X  L  X  X  X  X  X  X  X
 3 | X  X  X  X  X  X  X  X  X  X
 4 | X  X  X  X  X  X  X  X  X  X
 5 | X  X  X  X  X  X  X  L  X  X
 6 | X  X  X  X  X  X  X  X  X  X
 7 | X  X  X  X  X  X  X  X  X  X
 8 | L  X  X  X  X  X  X  X  X  X
=========================

Total: 80 | Libres: 3 | Ocupadas: 77
No hay dos asientos adyacentes libres

########## 4. SALA COMPLETAMENTE LLENA ##########

=== ESTADO DE LA SALA ===
     1  2  3  4  5  6  7  8  9 10
   ------------------------------
 1 | X  X  X  X  X  X  X  X  X  X
 2 | X  X  X  X  X  X  X  X  X  X
 3 | X  X  X  X  X  X  X  X  X  X
 4 | X  X  X  X  X  X  X  X  X  X
 5 | X  X  X  X  X  X  X  X  X  X
 6 | X  X  X  X  X  X  X  X  X  X
 7 | X  X  X  X  X  X  X  X  X  X
 8 | X  X  X  X  X  X  X  X  X  X
=========================

Total: 80 | Libres: 0 | Ocupadas: 80
No hay dos asientos adyacentes libres

### FIN ###
```

## Decisiones de diseño

- Índices internos en **base 0**: filas `0..7`, columnas `0..9`. La impresión los
  muestra en **base 1** (`1..8` y `1..10`) para que sea más legible.
- La búsqueda de adyacentes se limita a la **misma fila** (asientos contiguos reales).
- `reservarAsiento` no lanza excepciones: informa por consola y devuelve `false`.
- Se usa `type Estado = "L" | "X"` para que TypeScript impida estados inválidos.

## Registro de ejecuciones

Comando ejecutado en cada iteración (siempre con éxito, código de salida `0`):

```bash
cd /workspaces/ferminjmoreno-CinemaSeat-Manangement
npx tsc seatsManagement.ts --target ES2020 --module commonjs --strict
node seatsManagement.js
```

| # | Cambio aplicado | Resultado |
|---|---|---|
| 1 | Versión inicial con las 5 funciones y `main()` | Compiló y ejecutó OK. Salida: 80 sillas, 76 libres, 4 ocupadas, adyacentes `(0,3)` y `(0,4)`. Formato `(f,c)Estado`. |
| 2 | `imprimirAsientos` con ejes numerados en base 0 | Compiló y ejecutó OK. Cuadrícula con cabecera `0..9` y filas `0..7`. |
| 3 | Ejes de impresión pasados a base 1 con `padStart` | Compiló y ejecutó OK. Cabecera `1..10`, filas `1..8`. Conteos sin cambios. |
| 4 | Añadidos `crearEscenario()` y `mostrarEscenario()` con los 4 escenarios | Compiló y ejecutó OK. Vacía: 80 libres. Parcial: 65 libres / 15 ocupadas. Casi llena: 3 libres / 77 ocupadas, sin adyacentes. Llena: 0 libres, sin adyacentes. |
| 5 | Interfaz visual HTML + Tailwind (`index.html`, `src/cinema.ts`, `src/main.ts`) | `npx tsc --noEmit -p tsconfig.json` sin errores. `npm run dev` → Vite en `http://localhost:5173/`. |

## Interfaz visual (HTML + Tailwind)

### Archivos

| Archivo | Rol |
|---|---|
| [index.html](index.html) | Maquetado: cabecera, pantalla, contenedor del mapa, leyenda, panel de estadísticas y botones de escenario. |
| [src/cinema.ts](src/cinema.ts) | Lógica de dominio exportada (misma que `seatsManagement.ts`) más `liberarAsiento()`. |
| [src/main.ts](src/main.ts) | Renderizado del mapa en el DOM y manejo de eventos de clic. |

### Diseño

- Fondo **negro** (`bg-black`) con paneles `bg-neutral-950/60` y bordes `border-red-900/40`.
- Asiento **libre**: degradado rojo tenue `from-red-700/40 to-red-950/60` con borde `border-red-500/50`.
- Asiento **ocupado**: degradado rojo intenso `from-red-500 to-red-800` con borde claro y `box-shadow` rojo.
- Barra de **pantalla** con degradado horizontal y halo rojo.
- Sugerencia de adyacentes resaltada con anillo ámbar.
- Ejes numerados: columnas `1..10` arriba, filas `1..8` a la izquierda (igual que la consola).

### Interacciones

- **Clic en un asiento**: si está libre lo reserva, si está ocupado lo libera.
- **Botones de escenario**: cargan `vacia`, `parcial`, `casiLlena` o `llena`.
- **Buscar 2 asientos adyacentes**: resalta el par encontrado o avisa si no existe.
- El panel de estadísticas se actualiza en cada cambio (total / libres / ocupadas).

### Cómo levantar la interfaz

```bash
npm run dev
# http://localhost:5173/
```

### Pendientes para siguientes iteraciones

- Pasillo central entre columnas.
- Selección múltiple con confirmación de reserva.
- Diferenciar "seleccionado" de "ocupado".
- Persistencia del estado y precios por fila.

### Archivos generados

- `seatsManagement.ts` — código fuente TypeScript.
- `seatsManagement.js` — salida de la compilación con `tsc`.
- `SEATS_MANAGEMENT.md` — este documento.
