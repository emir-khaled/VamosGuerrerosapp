// ==========================================================
// BUSQUEDA.JS
// Contiene la lógica de la barra de búsqueda.
// Depende de "registros" (datos.js) y "dibujarTabla" (tabla.js),
// usadas dentro de un evento, por lo que el orden no es crítico.
// ==========================================================

const buscador = document.getElementById('buscador');

// Escuchamos cada vez que el usuario escribe en el buscador.
buscador.addEventListener('input', () => {

  const textoBusqueda = buscador.value.trim().toLowerCase();

  // Filtramos los registros por encargado, domicilio o centro.
  const registrosFiltrados = registros.filter((registro) => {
    return (
      registro.encargado.toLowerCase().includes(textoBusqueda) ||
      registro.domicilio.toLowerCase().includes(textoBusqueda) ||
      registro.centroAcopio.toLowerCase().includes(textoBusqueda)
    );
  });

  dibujarTabla(registrosFiltrados);
}); 