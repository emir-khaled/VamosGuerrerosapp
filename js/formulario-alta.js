// FORMULARIO-ALTA.JS
// Contiene la validación y el guardado del formulario de
// "Dar de alta" un nuevo centro. Depende de la clase Registro
// (registro.js), el arreglo "registros" (datos.js), la función
// "dibujarTabla" (tabla.js) y las pantallas (navegacion.js).

const formularioAltaCentro = document.getElementById('formulario-alta-centro');

// Muestra un mensaje de error específico en un campo.
const mostrarError = (input, idMensaje, texto) => {
  input.classList.add('campo-invalido');
  const mensaje = document.getElementById(idMensaje);
  mensaje.textContent = texto;
  mensaje.classList.add('mostrar');
};

// Quita cualquier error previo de un campo.
const limpiarError = (input, idMensaje) => {
  input.classList.remove('campo-invalido');
  const mensaje = document.getElementById(idMensaje);
  mensaje.textContent = '';
  mensaje.classList.remove('mostrar');
};

// Revisa cada campo del formulario. Devuelve "true" si todo
// está correcto, o "false" si algo falla (mostrando el error).
const validarFormularioAlta = () => {

  let formularioValido = true;

  const inputEncargado = document.getElementById('alta-encargado');
  const inputTelefono = document.getElementById('alta-telefono');
  const inputDomicilio = document.getElementById('alta-domicilio');
  const inputCentro = document.getElementById('alta-centro-acopio');

  const valorEncargado = inputEncargado.value.trim();
  const valorTelefono = inputTelefono.value.trim();
  const valorDomicilio = inputDomicilio.value.trim();
  const valorCentro = inputCentro.value.trim();

  const patronNombre = /^[A-Za-zÀ-ÿ\s]{3,}$/;

  // --- Validar Encargado ---
  if (!patronNombre.test(valorEncargado)) {
    mostrarError(inputEncargado, 'error-alta-encargado', 'Escribe un nombre válido (solo letras, mínimo 3 caracteres).');
    formularioValido = false;
  } else {
    limpiarError(inputEncargado, 'error-alta-encargado');
  }

  // --- Validar Teléfono ---
  const soloNumerosTelefono = valorTelefono.replace(/\s/g, '');
  const patronTelefono = /^\d{10}$/;
  if (!patronTelefono.test(soloNumerosTelefono)) {
    mostrarError(inputTelefono, 'error-alta-telefono', 'El teléfono debe tener 10 dígitos (solo números).');
    formularioValido = false;
  } else {
    limpiarError(inputTelefono, 'error-alta-telefono');
  }

  // --- Validar Domicilio ---
  if (valorDomicilio.length < 5) {
    mostrarError(inputDomicilio, 'error-alta-domicilio', 'Escribe un domicilio más completo (mínimo 5 caracteres).');
    formularioValido = false;
  } else {
    limpiarError(inputDomicilio, 'error-alta-domicilio');
  }

  // --- Validar Centro de acopio ---
  if (!patronNombre.test(valorCentro)) {
    mostrarError(inputCentro, 'error-alta-centro-acopio', 'Escribe un nombre de centro válido (solo letras, mínimo 3 caracteres).');
    formularioValido = false;
  } else {
    limpiarError(inputCentro, 'error-alta-centro-acopio');
  }

  return formularioValido;
};

// Cuando se envía el formulario de dar de alta...
formularioAltaCentro.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!validarFormularioAlta()) {
    return;
  }

  const nuevoRegistro = new Registro(
    document.getElementById('alta-encargado').value.trim(),
    document.getElementById('alta-telefono').value.trim(),
    document.getElementById('alta-domicilio').value.trim(),
    document.getElementById('alta-centro-acopio').value.trim()
  );

  registros.push(nuevoRegistro);
  dibujarTabla(registros);
  formularioAltaCentro.reset();

  pantallaAlta.classList.remove('activa');
  pantallaPrincipal.classList.add('activa');
});
