# Chefsito — Frontend (Vue 3)

Interfaz web del MVP **Chefsito**: búsqueda y exploración de recetas por ingredientes, landing, autenticación (login/registro) y feed de ejemplo. Cliente **Vue 3** con **Vite**, **Vue Router**, **Bootstrap 5** y **Vuetify**, integrado con un backend GraphQL mediante proxy en desarrollo.

## Descripción corta (para GitHub / About)

**Español:** SPA en Vue 3 + Vite para buscar recetas por ingredientes y navegar el detalle; consume GraphQL (Chefsito / ChefVue).

**English:** Vue 3 + Vite SPA for ingredient-based recipe search and detail views; talks to a GraphQL API.

## Requisitos

- **Node.js** 18 o superior (recomendado LTS)
- **npm** 9+

## Instalación y desarrollo

```bash
cd VueFront
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto **http://localhost:5173**).

### Backend GraphQL

En desarrollo, las peticiones a `/graphql` se reenvían al backend en **http://localhost:4000** (ver `vite.config.js`). Levanta el servidor del proyecto **VueBack** antes de probar búsqueda o detalle de recetas contra datos reales.

### Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_GRAPHQL_URL` | Opcional en **producción**: URL absoluta del endpoint GraphQL (p. ej. `https://api.tudominio.com/graphql`). Si no se define, el cliente usa `/graphql` (misma origen o proxy). |

Crea un archivo `.env` en la raíz de `VueFront` solo si necesitas sobrescribir el endpoint en build de producción.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build estático en `dist/` |
| `npm run preview` | Vista previa local del build |

## Rutas principales

| Ruta | Vista |
|------|--------|
| `/` | Inicio (landing) |
| `/home` | Home / feed y generador |
| `/busqueda` | Búsqueda por ingredientes |
| `/receta/:id` | Detalle de receta |
| `/login` | Iniciar sesión |
| `/registrar` | Registro |

La configuración está en `src/router/index.js`.

## Estructura del código

```
VueFront/
├── src/
│   ├── api/           # Cliente GraphQL (fetch)
│   ├── assets/
│   ├── components/    # Piezas reutilizables (footer, generador, etc.)
│   ├── data/
│   ├── plugins/       # Vuetify
│   ├── views/         # Vistas enlazadas al router
│   ├── App.vue
│   ├── main.js
│   ├── style.css
│   └── dark-mode.css
├── index.html
├── vite.config.js
└── package.json
```

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`)
- [Vite](https://vite.dev/)
- [Vue Router 4](https://router.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Vuetify 4](https://vuetifyjs.com/)
- [@mdi/font](https://pictogrammers.com/library/mdi/) (Material Design Icons)

## Licencia

Proyecto **`"private": true`** en `package.json`. Uso según acuerdo del autor.
