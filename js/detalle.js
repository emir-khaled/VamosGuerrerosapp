// ==========================================================
// DETALLE.JS
// Contiene todo lo relacionado a la pantalla de detalle:
// mostrarla, y manejar sus pestañas y sub-pestañas.
// ==========================================================

// Guardamos aquí el registro que el usuario seleccionó,
// por si se necesita más adelante (por ejemplo, al modificar).
let registroSeleccionado = null;

const pantallaDetalle = document.getElementById('pantalla-detalle');
const nombreCentroDetalle = document.getElementById('nombre-centro-detalle');

// Pestañas principales (Historial / Realizar captura nueva / Gestionar datos).
const botonesPestana = document.querySelectorAll('.boton-pestana');
const contenidosPestana = document.querySelectorAll('.contenido-pestana');

// Sub-pestañas (dentro de "Gestionar datos": Modificar datos / Dar de baja).
const botonesSubpestana = document.querySelectorAll('.boton-subpestana');
const contenidosSubpestana = document.querySelectorAll('.contenido-subpestana');

// Muestra la pantalla de detalle para un registro específico.
const mostrarDetalle = (registro) => {
  registroSeleccionado = registro;

  nombreCentroDetalle.textContent = registro.centroAcopio;

  document.getElementById('pantalla-principal').classList.remove('activa');
  pantallaDetalle.classList.add('activa');

  // Cada vez que entramos al detalle, reiniciamos las pestañas
  // para que siempre abra en "Historial de entregas" por defecto.
  activarPestana('historial');

  // Dibujamos la tabla de historial de entregas.
  // (Por ahora son datos de prueba, iguales para cualquier centro.)
  dibujarHistorial(historialEntregas);

  // Rellenamos el formulario de "Modificar datos" con la
  // información actual de este centro (definida en gestionar-datos.js).
  precargarFormularioModificar(registro);
};

// Activa una pestaña principal específica (y desactiva las demás).
const activarPestana = (nombrePestana) => {
  botonesPestana.forEach((boton) => {
    boton.classList.remove('activa');
  });

  contenidosPestana.forEach((contenido) => {
    contenido.classList.remove('activa');
  });

  document.querySelector(`[data-pestana="${nombrePestana}"]`).classList.add('activa');
  document.getElementById(`contenido-${nombrePestana}`).classList.add('activa');

  // Si entramos a "Gestionar datos", reiniciamos también
  // la sub-pestaña para que siempre abra en "Modificar datos".
  if (nombrePestana === 'gestionar') {
    activarSubpestana('modificar');
  }
};

// Activa una sub-pestaña específica (dentro de "Gestionar datos").
const activarSubpestana = (nombreSubpestana) => {
  botonesSubpestana.forEach((boton) => {
    boton.classList.remove('activa');
  });

  contenidosSubpestana.forEach((contenido) => {
    contenido.classList.remove('activa');
  });

  document.querySelector(`[data-subpestana="${nombreSubpestana}"]`).classList.add('activa');
  document.getElementById(`subcontenido-${nombreSubpestana}`).classList.add('activa');
};

// Conectamos cada botón de pestaña principal con su función.
botonesPestana.forEach((boton) => {
  boton.addEventListener('click', () => {
    const nombrePestana = boton.getAttribute('data-pestana');
    activarPestana(nombrePestana);
  });
});

// Conectamos cada botón de sub-pestaña con su función.
botonesSubpestana.forEach((boton) => {
  boton.addEventListener('click', () => {
    const nombreSubpestana = boton.getAttribute('data-subpestana');
    activarSubpestana(nombreSubpestana);
  });
});
