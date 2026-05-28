import { graphqlRequest } from './graphql.js';

const LISTAR_RECETAS = `
  query ListarRecetas($limite: Int) {
    listarRecetas(limite: $limite) {
      id
      nombre
      titulo
      descripcion
      ingredientes
      ingredientesMostrar
      tiempo_prep
      porciones
      comensales
      imagen
      autor_username
      created_at
    }
  }
`;

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
 * @param {number} [limite]
 */
export async function listarRecetas(limite) {
  const data = await graphqlRequest(LISTAR_RECETAS, { limite });
  return data.listarRecetas ?? [];
}

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
