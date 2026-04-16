# Chefsito (Vue)

Proyecto front **Chefsito**: interfaz en **Vue 3** con **Vite** y **Vue Router**, pensada para practicar y mostrar un flujo sencillo de inicio, acceso y registro, con una estética tranquila (paleta crema / salvia) en las vistas principales.

## Requisitos

- **Node.js** 18 o superior (recomendado LTS)
- **npm** 9+ (viene con Node)

## Instalación y uso

```bash
git clone https://github.com/TheAng3ll/Vue.git
cd Vue
npm install
npm run dev
```

Abre en el navegador la URL que muestra Vite (por defecto **http://localhost:5173**).

## Scripts

| Comando        | Descripción                          |
|----------------|--------------------------------------|
| `npm run dev`  | Servidor de desarrollo con hot reload |
| `npm run build`| Compilación para producción (`dist/`) |
| `npm run preview` | Sirve localmente el build generado |

## Rutas

| Ruta          | Vista        |
|---------------|--------------|
| `/`           | Inicio       |
| `/login`      | Iniciar sesión |
| `/registrar`  | Crear cuenta |

La configuración está en `src/router/index.js`.

## Estructura del código

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Pantallas por carpeta (inicio, login, registro)
│   ├── inicio_component/
│   ├── login_component/
│   └── registro_component/
├── router/
│   └── index.js     # Rutas de la aplicación
├── App.vue          # Raíz: `<router-view />`
├── main.js          # Entrada: Vue, router, estilos globales
└── style.css        # Estilos globales (si aplica)
```

En ramas más recientes el proyecto puede usar **`src/views/`** para las pantallas enlazadas al router y **`src/components/`** solo para piezas reutilizables; el `README` y las importaciones del router deben coincidir con tu rama.

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/)
- [Vue Router 4](https://router.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/) (CSS/JS desde `main.js`)

## Alias de rutas (opcional)

Si en `vite.config.js` defines el alias `@` → `./src`, puedes importar así:

```js
import algo from '@/assets/imagen.png'
```

En ese caso conviene un `jsconfig.json` con `"paths": { "@/*": ["src/*"] }` para que el editor resuelva bien las rutas.

## Licencia

Repositorio **privado** (`"private": true` en `package.json`). Uso y licencia según acuerdo del autor.
