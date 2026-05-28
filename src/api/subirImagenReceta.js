const DEFAULT_UPLOAD_ENDPOINT = '/api/imagenes/receta';

function getUploadEndpoint() {
  const fromEnv = import.meta.env.VITE_UPLOAD_IMAGEN_URL?.trim();
  return fromEnv || DEFAULT_UPLOAD_ENDPOINT;
}

/**
 * Sube una imagen a VueFront/public/imagenes y devuelve la ruta para la BD.
 * @param {File} archivo
 * @param {string} [titulo] — usado para nombrar el archivo en disco
 * @returns {Promise<string>} p. ej. `/imagenes/omelette_1716123456789.jpeg`
 */
export async function subirImagenReceta(archivo, titulo = '') {
  if (!archivo) {
    throw new Error('Selecciona una imagen.');
  }

  const body = new FormData();
  body.append('imagen', archivo);
  if (titulo.trim()) {
    body.append('titulo', titulo.trim());
  }

  const res = await fetch(getUploadEndpoint(), {
    method: 'POST',
    body,
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error('Respuesta inválida al subir la imagen.');
  }

  if (!res.ok) {
    throw new Error(json?.error || `Error HTTP ${res.status}`);
  }

  if (!json?.url) {
    throw new Error('El servidor no devolvió la ruta de la imagen.');
  }

  return json.url;
}
