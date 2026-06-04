# Chefsito — Frontend (VueFront)

Interfaz web de **Chefsito** en **Vue 3** + **Vite**: landing, autenticación (UI), home con feed de recetas, búsqueda por ingredientes, detalle de receta, publicación de recetas e imágenes, y perfil.

## Requisitos

- **Node.js** 18+ (recomendado LTS)
- **npm** 9+
- **VueBack** en ejecución (`http://localhost:4000`) y PostgreSQL con datos (ver `../VueBack/README.md`)

## Instalación

Desde la carpeta del frontend:

```bash
cd VueFront
npm install
npm run dev
```

Abre **http://localhost:5173** (puerto por defecto de Vite).

### Desarrollo con el backend

Vite hace proxy de las peticiones al API:

| Ruta en el front | Destino |
|------------------|---------|
| `/graphql` | `http://localhost:4000/graphql` |
| `/api` | `http://localhost:4000/api` |

Levanta primero el backend:

```bash
cd ../VueBack
npm run dev
```

Si cambias queries o mutaciones en GraphQL y el front muestra errores del tipo *"Cannot query field …"*, reinicia VueBack (suele quedar un proceso viejo en el puerto 4000).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build |

### Producción

Define la URL del GraphQL si no usas el mismo origen:

```env
VITE_GRAPHQL_URL=https://tu-api.ejemplo.com/graphql
```

## Rutas

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | `InicioView` | Landing y presentación |
| `/home` | `HomeView` | Generador de ingredientes + feed de recetas (API) |
| `/busqueda` | `BusquedaView` | Búsqueda por ingredientes |
| `/receta/:id` | `RecetaView` | Detalle de una receta |
| `/perfil` | `PerfilView` | Perfil y recetas publicadas (UI demo + modal) |
| `/login` | `LoginView` | Inicio de sesión (UI) |
| `/registrar` | `RegistroView` | Registro (UI) |

Configuración: `src/router/index.js`.

## Funcionalidades principales

- **Feed en Home**: lista recetas reales con `listarRecetas`; clic en la tarjeta abre `/receta/:id`.
- **Generador** (`GeneradorIngredientes`): chips de ingredientes, sugerencias locales y búsqueda con `buscarRecetas`.
- **Publicar receta** (`PlubiReceta`): modal con ingredientes (catálogo + nuevos), foto y mutación `publicarReceta`.
- **Imágenes de receta**: subida vía `POST /api/imagenes/receta` y URLs normalizadas con `urlImagenReceta()`.
- **Detalle**: instrucciones, consejos, ingredientes y match % cuando aplica.

## Capa API (`src/api/`)

Cliente GraphQL central en `graphql.js` (`graphqlRequest`).

| Módulo | Uso |
|--------|-----|
| `recetas.js` | `listarRecetas`, `buscarRecetas`, `obtenerReceta` |
| `publicaReceta.js` | `publicarReceta` |
| `buscarIngredientes.js` | Autocompletado de ingredientes en el catálogo |
| `subirImagenReceta.js` | Subida de imagen al publicar |

## Estructura del proyecto

```
VueFront/
├── index.html              # Font Awesome (CDN), título Chefsito
├── vite.config.js          # Proxy /graphql y /api
├── src/
│   ├── api/                # Cliente GraphQL y REST de imágenes
│   ├── components/
│   │   ├── generador/      # GeneradorIngredientes
│   │   ├── publicar-receta/# PlubiReceta (modal publicar)
│   │   ├── perfil-config/  # Ajustes de perfil (UI)
│   │   └── footer/
│   ├── data/
│   │   └── ingredientesComunes.js  # Sugerencias locales al escribir
│   ├── utils/
│   │   └── imagenReceta.js # URLs de imágenes de recetas
│   ├── views/
│   │   ├── inicio/
│   │   ├── home/
│   │   ├── busqueda/
│   │   ├── receta/
│   │   ├── perfil/
│   │   ├── login/
│   │   └── registro/
│   ├── router/
│   ├── plugins/vuetify.js
│   ├── App.vue
│   └── main.js
└── package.json
```

Las pantallas viven en **`views/`**; **`components/`** agrupa piezas reutilizables.

## Stack

- [Vue 3](https://vuejs.org/) — Composition API, `<script setup>`
- [Vite 6](https://vite.dev/)
- [Vue Router 4](https://router.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Vuetify 4](https://vuetifyjs.com/) (plugin en `main.js`)
- [Font Awesome 6](https://fontawesome.com/) (CDN en `index.html`)
- Fetch nativo hacia GraphQL (sin Apollo)

## Identidad visual

Paleta principal: fondos claros con degradado verde suave (`#f5f7fa` → `#e8f5e9`), acento `#28a745` / `#2e7d32`, tarjetas blancas con bordes redondeados y sombras suaves. Estilos por vista en carpetas `*.css` junto a cada `*View.vue`.

## Licencia

Proyecto **privado** (`"private": true` en `package.json`). Uso según acuerdo del autor.
