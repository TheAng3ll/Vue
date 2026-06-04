const PLACEHOLDER =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';

/**
 * URL lista para usar en <img src>.
 * Rutas locales (/imagenes/...) las sirve Vite desde public/.
 */
export function urlImagenReceta(ruta) {
  const valor = ruta?.trim();
  if (!valor) return PLACEHOLDER;
  if (valor.startsWith('/imagenes/')) return valor;
  if (valor.startsWith('imagenes/')) return `/${valor}`;
  if (/^https?:\/\//i.test(valor)) return valor;
  return PLACEHOLDER;
}

export { PLACEHOLDER as PLACEHOLDER_IMAGEN_RECETA };
