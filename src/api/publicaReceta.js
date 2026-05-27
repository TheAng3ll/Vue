import { graphqlRequest } from './graphql.js';

const PUBLICAR_RECETA = `
  mutation PublicarReceta(
    $titulo: String!
    $instrucciones: String!
    $autorId: Int!
    $nombre: String
    $descripcion: String
    $consejos: String
    $tiempoPrep: Int
    $comensales: Int
    $porciones: Int
    $dificultad: String
    $ingredientes: [IngredienteRecetaInput!]!
    $imagenUrl: String
  ) {
    publicarReceta(
      titulo: $titulo
      instrucciones: $instrucciones
      autorId: $autorId
      nombre: $nombre
      descripcion: $descripcion
      consejos: $consejos
      tiempoPrep: $tiempoPrep
      comensales: $comensales
      porciones: $porciones
      dificultad: $dificultad
      ingredientes: $ingredientes
      imagenUrl: $imagenUrl
    ) {
      id
      nombre
      titulo
      descripcion
      consejos
      instrucciones
      ingredientes
      ingredientesMostrar
      tiempo_prep
      comensales
      porciones
      dificultad
      imagen
      autor_id
      created_at
    }
  }
`;

/**
 * @param {object} datos
 * @param {Array<{ nombre: string, descripcion: string }>} datos.ingredientes
 */
export async function publicarReceta(datos) {
  const data = await graphqlRequest(PUBLICAR_RECETA, datos);
  return data.publicarReceta ?? null;
}
