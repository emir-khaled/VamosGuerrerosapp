// ==========================================================
// TABLA.JS
// Contiene la función que dibuja la tabla de registros.
// Depende de "registros" (datos.js) y de "mostrarDetalle"
// (definida en detalle.js, pero usada aquí dentro de un
// evento, así que el orden de carga no es un problema).
// ==========================================================

const cuerpoTabla = document.getElementById('cuerpo-tabla');
const sinResultados = document.getElementById('sin-resultados');

// Dibuja la tabla en pantalla, a partir de una lista de registros.
const dibujarTabla = (listaRegistros) => {

  // Vaciamos la tabla (borramos cualquier fila anterior).
  cuerpoTabla.innerHTML = '';

  // Si la lista está vacía, mostramos el mensaje de "sin resultados".
  if (listaRegistros.length === 0) {
    sinResultados.style.display = 'block';
    return;
  } else {
    sinResultados.style.display = 'none';
  }

  // Creamos una fila por cada registro.
  listaRegistros.forEach((registro) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${registro.encargado}</td>
      <td>${registro.telefono}</td>
      <td>${registro.domicilio}</td>
      <td>${registro.centroAcopio}</td>
    `;

    // Al hacer clic en la fila, mostramos el detalle de ESTE registro.
    fila.addEventListener('click', () => {
      mostrarDetalle(registro);
    });

    cuerpoTabla.appendChild(fila);
  });
};
