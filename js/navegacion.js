// ==========================================================
// NAVEGACION.JS
// Contiene la lógica para cambiar entre las 3 pantallas:
// principal, detalle y alta.
// ==========================================================

const cuadroAlta = document.getElementById('cuadro-alta');
const pantallaPrincipal = document.getElementById('pantalla-principal');
const pantallaAlta = document.getElementById('pantalla-alta');

// Todos los botones "Volver" (puede haber varios, uno por pantalla).
const botonesVolver = document.querySelectorAll('.boton-volver');

// Al hacer clic en "Dar de alta", ocultamos la pantalla principal
// y mostramos la pantalla con el formulario.
cuadroAlta.addEventListener('click', () => {
  pantallaPrincipal.classList.remove('activa');
  pantallaAlta.classList.add('activa');
});

// Regresar a la pantalla principal. Como puede haber varios
// botones "Volver", recorremos todos y les damos el mismo comportamiento.
botonesVolver.forEach((boton) => {
  boton.addEventListener('click', () => {
    const idPantallaDestino = boton.getAttribute('data-volver');

    document.querySelectorAll('.pantalla').forEach((pantalla) => {
      pantalla.classList.remove('activa');
    });

    document.getElementById(idPantallaDestino).classList.add('activa');
  });
});

// Al abrir la app por primera vez, dibujamos la tabla completa.
// (Esta línea va aquí porque es lo último que debe pasar, ya que
// depende de que "registros" y "dibujarTabla" ya existan.)
dibujarTabla(registros); 
