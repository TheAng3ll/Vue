const TOKEN_KEY = 'chefsito_token';
const USER_KEY = 'chefsito_user';

export function saveAuthSession({ token, user }, remember = false) {
  const primary = remember ? localStorage : sessionStorage;
  const secondary = remember ? sessionStorage : localStorage;

  primary.setItem(TOKEN_KEY, token);
  primary.setItem(USER_KEY, JSON.stringify(user));
  secondary.removeItem(TOKEN_KEY);
  secondary.removeItem(USER_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getAuthUser() {
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function updateAuthUser(partial) {
  const token = getAuthToken();
  if (!token) return;

  const current = getAuthUser() ?? {};
  const updated = { ...current, ...partial };

  if (localStorage.getItem(TOKEN_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
  } else {
    sessionStorage.setItem(USER_KEY, JSON.stringify(updated));
  }
}
