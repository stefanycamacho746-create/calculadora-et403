"use strict";

// ===== Calculadora original (semana 7): sin cambios =====
document.getElementById("calcular").addEventListener("click", function () {
const textoA = document.getElementById("a").value.trim();
const textoB = document.getElementById("b").value.trim();
const operacion = document.getElementById("operacion").value;
const salida = document.getElementById("resultado");

// Validación 1: entrada vacía (se revisa primero, porque Number("") daría 0).
if (textoA === "" || textoB === "") {
salida.textContent = "Complete las dos entradas.";
return;
}

const a = Number(textoA);
const b = Number(textoB);

// Validación 2: texto que no es número (Number("abc") da NaN).
if (!Number.isFinite(a) || !Number.isFinite(b)) {
salida.textContent = "Escriba números válidos en ambas entradas.";
return;
}

// Validación 3: divisor cero, solo cuando la operación es dividir.
if (operacion === "dividir" && b === 0) {
salida.textContent = "No se puede dividir entre cero.";
return;
}

if (operacion === "sumar") {
salida.textContent = "Suma: " + (a + b);
} else {
salida.textContent = "División: " + (a / b);
}
});

// ===== NUEVO (semana 9): conversor de unidades =====
// Lista de objetos: cada uno describe una conversión (los datos).
const CONVERSIONES = [
  { id: "m-cm", etiqueta: "Metros a centímetros (m → cm)", factor: 100,  sentido: "directo", unidad: "cm" },
  { id: "cm-m", etiqueta: "Centímetros a metros (cm → m)", factor: 100,  sentido: "inverso", unidad: "m" },
  { id: "kg-g", etiqueta: "Kilogramos a gramos (kg → g)",  factor: 1000, sentido: "directo", unidad: "g" },
  { id: "g-kg", etiqueta: "Gramos a kilogramos (g → kg)",  factor: 1000, sentido: "inverso", unidad: "kg" }
];

// Valida el texto: rechaza vacío, no finito y negativo.
function validarEntrada(texto) {
  const limpio = String(texto).trim();
  if (limpio === "") {
    return { ok: false, mensaje: "Complete el campo." };
  }
  const valor = Number(limpio);
  if (!Number.isFinite(valor)) {
    return { ok: false, mensaje: "Escriba un número válido." };
  }
  if (valor < 0) {
    return { ok: false, mensaje: "No se permiten valores negativos." };
  }
  return { ok: true, valor: valor };
}

// Función que calcula: busca la conversión por id y aplica el factor.
function convertir(texto, id) {
  const entrada = validarEntrada(texto);
  if (!entrada.ok) {
    return entrada;
  }
  const conv = CONVERSIONES.find(function (c) { return c.id === id; });
  if (!conv) {
    return { ok: false, mensaje: "Conversión no encontrada." };
  }
  const resultado = conv.sentido === "directo" ? entrada.valor * conv.factor : entrada.valor / conv.factor;
  return { ok: true, resultado: resultado, unidad: conv.unidad };
}

// Conexión con la interfaz: llena el selector y atiende el botón.
const selectorConv = document.getElementById("conv-tipo");
CONVERSIONES.forEach(function (c) {
  const opcion = document.createElement("option");
  opcion.value = c.id;
  opcion.textContent = c.etiqueta;
  selectorConv.appendChild(opcion);
});

document.getElementById("conv-calcular").addEventListener("click", function () {
  const r = convertir(document.getElementById("conv-valor").value, selectorConv.value);
  const salida = document.getElementById("conv-resultado");
  salida.textContent = r.ok ? "Resultado: " + r.resultado + " " + r.unidad : r.mensaje;
});
