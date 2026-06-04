import { graphqlRequest } from './graphql.js';

const OBTENER_USUARIO_INFO = `
  query ObtenerUsuarioInfo($id: Int!) {
    obtenerUsuarioInfo(id: $id) {
      id
      username
      email
      biografia
      created_at
    }
  }
`;

const ACTUALIZAR_USUARIO = `
  mutation ActualizarUsuario($id: Int!, $username: String!, $email: String!, $biografia: String!) {
    actualizarUsuario(id: $id, username: $username, email: $email, biografia: $biografia) {
      id
      username
      email
      biografia
    }
  }
`;

export async function obtenerUsuarioInfo(id) {
  const data = await graphqlRequest(OBTENER_USUARIO_INFO, { id });
  return data.obtenerUsuarioInfo;
}

export async function actualizarUsuario(id, username, email, biografia) {
  const data = await graphqlRequest(ACTUALIZAR_USUARIO, {
    id,
    username: username.trim(),
    email: email.trim().toLowerCase(),
    biografia: biografia?.trim() ?? '',
  });
  return data.actualizarUsuario;
}
