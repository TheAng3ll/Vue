import { graphqlRequest } from './graphql.js';
import { saveAuthSession } from './session.js';
const REGISTRAR_USUARIO = `
  mutation RegistrarUsuario($username: String!, $email: String!, $password: String!) {
    registrarUsuario(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const INICIAR_SESION = `
  mutation IniciarSesion($email: String!, $password: String!) {
    iniciarSesion(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export async function registrarUsuario(username, email, password) {
  const data = await graphqlRequest(REGISTRAR_USUARIO, { username, email, password });
  return data.registrarUsuario;
}

export async function iniciarSesion(email, password, remember = false) {
  const data = await graphqlRequest(INICIAR_SESION, {
    email: email.trim().toLowerCase(),
    password,
  });
  const payload = data.iniciarSesion;
  saveAuthSession(payload, remember);
  return payload;
}
