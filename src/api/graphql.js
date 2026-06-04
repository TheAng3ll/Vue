/**
 * Cliente GraphQL ligero (fetch). En desarrollo usa el proxy de Vite (`/graphql`).
 * Producción: definir `VITE_GRAPHQL_URL` (URL absoluta del endpoint).
 */
import { getAuthToken } from './session.js';

const DEFAULT_ENDPOINT = '/graphql';

export function getGraphqlEndpoint() {
  const fromEnv = import.meta.env.VITE_GRAPHQL_URL?.trim();
  return fromEnv || DEFAULT_ENDPOINT;
}

/**
 * @param {string} query
 * @param {Record<string, unknown>} [variables]
 * @returns {Promise<Record<string, unknown>>}
 */
export async function graphqlRequest(query, variables = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(getGraphqlEndpoint(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error('Respuesta inválida del servidor GraphQL');
  }

  if (!res.ok) {
    const msg = json?.errors?.[0]?.message || json?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}
