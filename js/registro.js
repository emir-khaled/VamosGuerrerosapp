// ==========================================================
// REGISTRO.JS
// Define la clase Registro: el "molde" de cada centro de
// acopio guardado. Este archivo debe cargarse ANTES que
// cualquier otro que use "new Registro(...)".
//
// Nota: el "constructor" de una clase NUNCA se escribe como
// arrow function — es una sintaxis especial de las clases,
// no una "function" tradicional, así que no aplica la
// conversión a arrow function aquí.
// ==========================================================

class Registro {
  constructor(encargado, telefono, domicilio, centroAcopio) {
    this.encargado = encargado;
    this.telefono = telefono;
    this.domicilio = domicilio;
    this.centroAcopio = centroAcopio;
  }
}
