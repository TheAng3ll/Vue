import { graphqlRequest } from './graphql.js';

const BUSCAR_RECETAS = `
  query BuscarRecetas($ingredientes: [String]) {
    buscarRecetas(ingredientes: $ingredientes) {
      id
      nombre
      descripcion
      ingredientes
      ingredientesMostrar
      matchPorcentaje
      tiempo_prep
      porciones
      imagen
    }
  }
`;

const RECETA_DETALLE = `
  query RecetaDetalle($id: Int!) {
    receta(id: $id) {
      id
      nombre
      descripcion
      consejos
      instrucciones
      ingredientes
      ingredientesMostrar
      matchPorcentaje
      tiempo_prep
      porciones
      imagen
    }
  }
`;

/**
 * @param {string[]} ingredientes
 */
export async function buscarRecetas(ingredientes) {
  const data = await graphqlRequest(BUSCAR_RECETAS, { ingredientes });
  return data.buscarRecetas ?? [];
}

/**
 * @param {number} id
 */
export async function obtenerReceta(id) {
  const data = await graphqlRequest(RECETA_DETALLE, { id });
  return data.receta ?? null;
}
