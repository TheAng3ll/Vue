<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import { obtenerReceta } from '../../api/recetas.js';
import '../home/home.css';
import './perfil.css';
import FooterComponent from '../../components/footer/FooterComponent.vue';
import PerfilConfig from '../../components/perfil-config/PerfilConfig.vue';
import PlubiReceta from '../../components/publicar-receta/PlubiReceta.vue';
import { urlImagenReceta } from '../../utils/imagenReceta.js';
import { obtenerUsuarioInfo } from '../../api/usuarioInfo.js';
import { getAuthUser, clearAuthSession, updateAuthUser } from '../../api/session.js';


const router = useRouter();
const modalRecetaEl = ref(null);
let modalReceta = null;

const recetaPublicacion = ref(null);
const cargandoRecetaModal = ref(false);
const errorRecetaModal = ref(null);
const comentariosModal = ref([]);
const nuevoComentario = ref('');
const comentariosVisibles = ref(false);
const modalComentariosPanelEl = ref(null);

const comentariosDemoIniciales = [
  {
    id: 1,
    autor: 'Ana Saludable',
    avatar: 'https://ui-avatars.com/api/?name=Ana+Saludable&background=ffc107&color=000',
    texto: '¡Se ve riquísima! ¿La hiciste con mantequilla o aceite de oliva?',
    tiempo: 'Hace 2 h',
  },
  {
    id: 2,
    autor: 'Chef Carlos',
    avatar: 'https://ui-avatars.com/api/?name=Chef+Carlos&background=17a2b8&color=fff',
    texto: 'Buen tip con las hierbas frescas al final.',
    tiempo: 'Hace 5 h',
  },
  {
    id: 3,
    autor: 'Pedro Postres',
    avatar: 'https://ui-avatars.com/api/?name=Pedro+Postres&background=6f42c1&color=fff',
    texto: 'La voy a probar este fin de semana con mi familia.',
    tiempo: 'Ayer',
  },
];

const guardando = ref(false);
const cargandoUsuario = ref(true);
const errorUsuario = ref(null);

const usuario = ref({
  id: null,
  nombre: '',
  email: '',
  bio: '',
  fotoPerfil: '',
  miembroDesde: '',
});

const stats = ref({
  recetasGuardadas: 12,
  seguidores: 48,
  meGusta: 156,
});
const perfilConfigRef = ref(null);
const publicarRecetaRef = ref(null);

const misRecetas = ref([
  {
    id: 1,
    nombre: 'Omelette de hierbas',
    descripcion: 'Huevos esponjosos con perejil y cebollín, lista en minutos.',
    imagen:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    tiempo: '15 min',
    porciones: 2,
    likes: 42,
    ingredientes: ['huevos', 'perejil', 'cebollín', 'mantequilla'],
  },
  {
    id: 4,
    nombre: 'Pasta al pesto',
    descripcion: 'Albahaca fresca, piñones y queso parmesano.',
    imagen:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
    tiempo: '25 min',
    porciones: 4,
    likes: 78,
    ingredientes: ['pasta', 'albahaca', 'piñones', 'parmesano', 'ajo'],
  },
  {
    id: 6,
    nombre: 'Ensalada griega',
    descripcion: 'Tomate, pepino, aceitunas y feta con orégano.',
    imagen:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    tiempo: '12 min',
    porciones: 3,
    likes: 31,
    ingredientes: ['tomate', 'pepino', 'feta', 'aceitunas', 'orégano'],
  },
]);

function avatarDesdeUsername(username = '') {
  const name = username.trim() || 'Chef';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=28a745&color=fff&size=256`;
}

function formatearMiembroDesde(createdAt) {
  if (!createdAt) return '—';
  const fecha = new Date(createdAt);
  if (Number.isNaN(fecha.getTime())) return '—';
  const texto = fecha.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function mapUsuarioApi(data) {
  return {
    id: data.id,
    nombre: data.username ?? '',
    email: data.email ?? '',
    bio: data.biografia?.trim() || 'Sin biografía por ahora.',
    fotoPerfil: avatarDesdeUsername(data.username),
    miembroDesde: formatearMiembroDesde(data.created_at),
  };
}

async function cargarPerfil() {
  cargandoUsuario.value = true;
  errorUsuario.value = null;

  const auth = getAuthUser();
  if (!auth?.id) {
    cargandoUsuario.value = false;
    router.push('/login');
    return;
  }

  try {
    const data = await obtenerUsuarioInfo(auth.id);
    usuario.value = mapUsuarioApi(data);
  } catch (err) {
    errorUsuario.value = err?.message || 'No se pudo cargar tu perfil';
  } finally {
    cargandoUsuario.value = false;
  }
}

onMounted(async () => {
  if (modalRecetaEl.value) {
    modalReceta = new Modal(modalRecetaEl.value, { focus: true });
  }
  await cargarPerfil();
});

onBeforeUnmount(() => {
  modalReceta?.dispose();
  modalReceta = null;
});

function publicacionDesdeMini(r) {
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion,
    imagen: r.imagen,
    tiempo_prep: r.tiempo,
    porciones: r.porciones,
    likes: r.likes,
    ingredientes: r.ingredientes ?? [],
    ingredientesMostrar: r.ingredientes ?? [],
  };
}

function publicacionDesdeApi(data) {
  return {
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: urlImagenReceta(data.imagen),
    instrucciones: data.instrucciones,
    consejos: data.consejos,
    tiempo_prep:
      data.tiempo_prep != null ? `${data.tiempo_prep} min` : null,
    porciones: data.porciones,
    ingredientes: data.ingredientes ?? [],
    ingredientesMostrar:
      data.ingredientesMostrar ?? data.ingredientes ?? [],
  };
}

function etiquetasIngredientes(rec) {
  const mostrar = rec.ingredientesMostrar ?? rec.ingredientes;
  return Array.isArray(mostrar) ? mostrar : [];
}

function irHome() {
  router.push('/home');
}

function irBusqueda() {
  router.push('/busqueda');
}

function cerrarSesion() {
  clearAuthSession();
  router.push('/login');
}
function abrirConfiguracion() {
  perfilConfigRef.value?.abrir();
}

function abrirPublicarReceta() {
  publicarRecetaRef.value?.abrir();
}

function onRecetaPublicada(receta) {
  misRecetas.value.unshift({
    id: receta.id,
    nombre: receta.nombre ?? receta.titulo,
    descripcion: receta.descripcion ?? '',
    imagen: urlImagenReceta(receta.imagen),
    tiempo: receta.tiempo_prep != null ? `${receta.tiempo_prep} min` : '—',
    porciones: receta.porciones ?? receta.comensales ?? 1,
    likes: 0,
    ingredientes: receta.ingredientes ?? [],
  });
}
async function onGuardarConfig(actualizado) {
  usuario.value = mapUsuarioApi(actualizado);
  updateAuthUser({
    id: actualizado.id,
    username: actualizado.username,
    email: actualizado.email,
  });
}

async function guardarPerfil() {
  guardando.value = true;
  await new Promise((r) => setTimeout(r, 700));
  guardando.value = false;
  alert('Cambios guardados (demo). Conecta aquí tu mutación GraphQL cuando esté lista.');
}

function reiniciarComentariosModal() {
  comentariosModal.value = comentariosDemoIniciales.map((c) => ({ ...c }));
  nuevoComentario.value = '';
  comentariosVisibles.value = false;
}

async function toggleComentarios() {
  comentariosVisibles.value = !comentariosVisibles.value;
  if (comentariosVisibles.value) {
    await nextTick();
    modalComentariosPanelEl.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function enviarComentario() {
  const texto = nuevoComentario.value.trim();
  if (!texto) return;

  comentariosModal.value.push({
    id: Date.now(),
    autor: usuario.value.nombre,
    avatar: usuario.value.fotoPerfil,
    texto,
    tiempo: 'Ahora',
  });
  nuevoComentario.value = '';
}

async function abrirReceta(r) {
  errorRecetaModal.value = null;
  reiniciarComentariosModal();
  recetaPublicacion.value = publicacionDesdeMini(r);
  cargandoRecetaModal.value = true;
  modalReceta?.show();

  try {
    const data = await obtenerReceta(r.id);
    if (data) {
      recetaPublicacion.value = publicacionDesdeApi(data);
    }
  } catch (err) {
    errorRecetaModal.value =
      err?.message ||
      'No se pudo cargar el detalle. Mostrando vista previa.';
  } finally {
    cargandoRecetaModal.value = false;
  }
}

</script>

<template>
  <div class="home-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand brand-title" href="#" @click.prevent="irHome">
          <strong class="titulo">Chefsito</strong>
        </a>
        <div class="button-group">
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="irBusqueda">
            <i class="fas fa-search"></i> Buscar recetas
          </button>
          <button
            class="btn btn-success my-2 my-sm-0"
            type="button"
            disabled
            title="Estás en tu perfil"
          >
            <i class="fas fa-user"></i> Mi perfil
          </button>
          <button class="btn btn-outline-secondary my-2 my-sm-0" type="button" @click="cerrarSesion">
            <i class="fas fa-sign-out-alt"></i> Salir
          </button>
        </div>
      </div>
    </nav>

    <div class="perfil-main">
      <p v-if="cargandoUsuario" class="perfil-estado-msg">Cargando perfil…</p>
      <p v-else-if="errorUsuario" class="perfil-estado-msg perfil-estado-msg--error">
        {{ errorUsuario }}
      </p>

      <section v-else class="perfil-hero">
        <button
          type="button"
          class="perfil-config-btn"
          title="Configuración del perfil"
          aria-label="Abrir configuración del perfil"
          @click="abrirConfiguracion"
        >
          <i class="fas fa-cog" aria-hidden="true"></i>
        </button>

        <div class="perfil-hero-top">
          <div class="perfil-avatar-wrap">
            <img
              :src="usuario.fotoPerfil"
              :alt="usuario.nombre"
              class="perfil-avatar"
              width="112"
              height="112"
            />
          </div>
          <div class="perfil-hero-text">
            <h1 class="perfil-nombre">{{ usuario.nombre }}</h1>
            <p class="perfil-email">
              <i class="fas fa-envelope"></i>
              {{ usuario.email }}
            </p>
            <p class="perfil-bio">{{ usuario.bio }}</p>
            <span class="perfil-meta-chip">
              <i class="fas fa-calendar-alt"></i>
              Miembro desde {{ usuario.miembroDesde }}
            </span>
          </div>
        </div>

        <div class="perfil-stats">
          <div class="perfil-stat">
            <div class="perfil-stat-val">{{ stats.recetasGuardadas }}</div>
            <div class="perfil-stat-label">Guardadas</div>
          </div>
          <div class="perfil-stat">
            <div class="perfil-stat-val">{{ stats.seguidores }}</div>
            <div class="perfil-stat-label">Seguidores</div>
          </div>
          <div class="perfil-stat">
            <div class="perfil-stat-val">{{ stats.meGusta }}</div>
            <div class="perfil-stat-label">Me gusta</div>
          </div>
        </div>
      </section>

      <section v-if="!cargandoUsuario && !errorUsuario" class="perfil-card">
        <div class="perfil-card-header-row">
          <h2 class="perfil-card-title">
            <i class="fas fa-bookmark"></i>
            Mis recetas publicadas
          </h2>
          <button type="button" class="btn btn-success btn-sm" @click="abrirPublicarReceta">
            <i class="fas fa-plus"></i> Nueva receta
          </button>
        </div>
        <div class="perfil-recetas-grid">
          <button
            v-for="r in misRecetas"
            :key="r.id"
            type="button"
            class="perfil-receta-mini"
            @click="abrirReceta(r)"
          >
            <img :src="r.imagen" :alt="r.nombre" width="88" height="88" />
            <div class="perfil-receta-mini-body">
              <h5>{{ r.nombre }}</h5>
              <p>{{ r.descripcion }}</p>
              <div class="perfil-receta-meta">
                <i class="fas fa-clock"></i> {{ r.tiempo }}
              </div>
            </div>
          </button>
        </div>
      </section>
    </div>

    <FooterComponent />

    <PerfilConfig
      ref="perfilConfigRef"
      :usuario="usuario"
      @guardar="onGuardarConfig"
      @cerrar-sesion="cerrarSesion"
    />

    <PlubiReceta ref="publicarRecetaRef" :autor-id="usuario.id ?? 1" @publicada="onRecetaPublicada" />

    <div
      ref="modalRecetaEl"
      class="modal fade perfil-receta-modal"
      tabindex="-1"
      aria-labelledby="perfilRecetaModalTitulo"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h5 id="perfilRecetaModalTitulo" class="modal-title">
              Publicación
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>

          <div class="modal-body pt-2">
            <div v-if="cargandoRecetaModal" class="perfil-modal-estado">
              <p><i class="fas fa-spinner fa-spin"></i> Cargando receta…</p>
            </div>

            <template v-else-if="recetaPublicacion">
              <p v-if="errorRecetaModal" class="perfil-modal-aviso text-muted small">
                <i class="fas fa-info-circle"></i> {{ errorRecetaModal }}
              </p>

              <article class="post-card perfil-modal-post">
                <div class="post-header">
                  <img
                    :src="usuario.fotoPerfil"
                    :alt="usuario.nombre"
                    class="post-avatar"
                  />
                  <div class="post-user-info">
                    <span class="post-username">{{ usuario.nombre }}</span>
                    <span class="post-tiempo">Tu publicación</span>
                  </div>
                </div>

                <div class="post-imagen-container">
                  <img
                    :src="recetaPublicacion.imagen"
                    :alt="recetaPublicacion.nombre"
                    class="post-imagen"
                  />
                </div>

                <div class="post-likes">
                  <span v-if="recetaPublicacion.likes != null">
                    {{ recetaPublicacion.likes }} me gusta
                  </span>
                </div>

                <div class="post-contenido">
                  <h5 class="post-receta-nombre">{{ recetaPublicacion.nombre }}</h5>
                  <p v-if="recetaPublicacion.descripcion" class="post-descripcion">
                    <span class="post-username">{{ usuario.nombre }}</span>
                    {{ recetaPublicacion.descripcion }}
                  </p>
                </div>

                <div
                  v-if="etiquetasIngredientes(recetaPublicacion).length"
                  class="post-ingredientes"
                >
                  <span
                    v-for="(ing, idx) in etiquetasIngredientes(recetaPublicacion).slice(0, 6)"
                    :key="idx"
                    class="ingrediente-tag"
                  >
                    #{{ ing }}
                  </span>
                </div>

                <div class="post-meta">
                  <span v-if="recetaPublicacion.tiempo_prep">
                    <i class="fas fa-clock"></i> {{ recetaPublicacion.tiempo_prep }}
                  </span>
                  <span v-if="recetaPublicacion.porciones != null">
                    <i class="fas fa-users"></i> {{ recetaPublicacion.porciones }} porciones
                  </span>
                </div>

                <div
                  v-if="recetaPublicacion.instrucciones"
                  class="perfil-modal-instrucciones"
                >
                  <h6><i class="fas fa-list-ol text-success"></i> Preparación</h6>
                  <p>{{ recetaPublicacion.instrucciones }}</p>
                </div>
              </article>

              <div class="perfil-modal-comentarios-toggle-wrap">
                <a
                  href="#"
                  class="perfil-modal-footer-titulo perfil-modal-comentarios-toggle"
                  :class="{ 'is-open': comentariosVisibles }"
                  :aria-expanded="comentariosVisibles"
                  aria-controls="perfil-modal-comentarios-panel"
                  @click.prevent="toggleComentarios"
                >
                  <i class="far fa-comment" aria-hidden="true"></i>
                  Comentarios
                  <span class="perfil-modal-footer-count">{{ comentariosModal.length }}</span>
                  <i
                    class="fas fa-chevron-down perfil-modal-comentarios-chevron"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>

              <section
                v-show="comentariosVisibles"
                id="perfil-modal-comentarios-panel"
                ref="modalComentariosPanelEl"
                class="perfil-modal-comentarios-panel"
                aria-label="Comentarios de la publicación"
              >
                <div class="perfil-modal-comentarios" role="list">
                  <p v-if="!comentariosModal.length" class="perfil-modal-comentarios-vacio">
                    Sé el primero en comentar esta receta.
                  </p>
                  <article
                    v-for="c in comentariosModal"
                    :key="c.id"
                    class="perfil-modal-comentario"
                    role="listitem"
                  >
                    <img
                      :src="c.avatar"
                      :alt="c.autor"
                      class="perfil-modal-comentario-avatar"
                      width="36"
                      height="36"
                    />
                    <div class="perfil-modal-comentario-body">
                      <div class="perfil-modal-comentario-meta">
                        <strong>{{ c.autor }}</strong>
                        <span>{{ c.tiempo }}</span>
                      </div>
                      <p>{{ c.texto }}</p>
                    </div>
                  </article>
                </div>

                <form class="perfil-modal-comentario-form" @submit.prevent="enviarComentario">
                  <input
                    v-model="nuevoComentario"
                    type="text"
                    class="form-control"
                    placeholder="Escribe un comentario…"
                    autocomplete="off"
                    maxlength="500"
                  />
                  <button
                    type="submit"
                    class="btn btn-success"
                    :disabled="!nuevoComentario.trim()"
                  >
                    Enviar
                  </button>
                </form>
              </section>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
