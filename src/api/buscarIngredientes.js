import { graphqlRequest } from './graphql.js';

const BUSCAR_INGREDIENTES = `
  query BuscarIngredientes($termino: String) {
    buscarIngredientes(termino: $termino) {
      id
      nombre
      descripcion
    }
  }
`;

/**
 * @param {string} termino
 * @returns {Promise<Array<{ id: number, nombre: string, descripcion: string|null }>>}
 */
export async function buscarIngredientes(termino) {
  const data = await graphqlRequest(BUSCAR_INGREDIENTES, { termino });
  return data.buscarIngredientes ?? [];
}
