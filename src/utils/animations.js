// Animaciones reutilizables con Tailwind para toda la web

// Aparece subiendo
export function fadeUp(show) {
  return `
    transition-all duration-700
    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
  `;
}

// Aparece bajando
export function fadeDown(show) {
  return `
    transition-all duration-700
    ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
  `;
}

// Aparece desde la izquierda
export function fadeLeft(show) {
  return `
    transition-all duration-700
    ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
  `;
}

// Aparece desde la derecha
export function fadeRight(show) {
  return `
    transition-all duration-700
    ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
  `;
}