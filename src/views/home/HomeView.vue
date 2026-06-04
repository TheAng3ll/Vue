<script setup>
import { ref, onMounted } from 'vue';
import './home.css';
import { useRouter } from 'vue-router';
import GeneradorIngredientes from '../../components/generador/GeneradorIngredientes.vue';
import FooterComponent from '../../components/footer/FooterComponent.vue';
import PlubiReceta from '../../components/publicar-receta/PlubiReceta.vue';
import { listarRecetas } from '../../api/recetas.js';
import { clearAuthSession } from '../../api/session.js';
import { urlImagenReceta } from '../../utils/imagenReceta.js';

const router = useRouter();
const publicarRecetaRef = ref(null);

const recetasFeed = ref([]);
const cargandoFeed = ref(true);
const errorFeed = ref(null);

function formatearNombreAutor(username = '') {
  return username
    .replace(/^chef_/i, '')
    .split('_')
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ') || 'Chef';
}

function formatearTiempoRelativo(createdAt) {
  if (!createdAt) return '';
  const fecha = new Date(createdAt);
  if (Number.isNaN(fecha.getTime())) return '';

  const diffMs = Date.now() - fecha.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Hace ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `Hace ${diffD} d`;
  return fecha.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function etiquetasIngredientes(receta) {
  const mostrar = receta.ingredientesMostrar ?? receta.ingredientes_mostrar;
  if (mostrar?.length) return mostrar;
  return receta.ingredientes ?? [];
}

function mapRecetaAFeed(r) {
  const autor = r.autor_username ?? 'chef';
  const nombreAutor = formatearNombreAutor(autor);
  return {
    id: r.id,
    usuario: {
      nombre: nombreAutor,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreAutor)}&background=28a745&color=fff`,
      tiempo: formatearTiempoRelativo(r.created_at),
    },
    receta: {
      nombre: r.nombre ?? r.titulo,
      imagen: urlImagenReceta(r.imagen),
      descripcion: r.descripcion ?? '',
      ingredientes: etiquetasIngredientes(r),
      tiempo: r.tiempo_prep != null ? `${r.tiempo_prep} min` : '—',
      porciones: r.porciones ?? r.comensales ?? 1,
      likes: 0,
      comentarios: 0,
      compartidos: 0,
    },
  };
}

async function cargarFeedRecetas() {
  cargandoFeed.value = true;
  errorFeed.value = null;
  try {
    const lista = await listarRecetas(50);
    recetasFeed.value = lista.map(mapRecetaAFeed);
  } catch (err) {
    errorFeed.value =
      err?.message ||
      'No se pudieron cargar las recetas. ¿Está corriendo VueBack en el puerto 4000?';
    recetasFeed.value = [];
  } finally {
    cargandoFeed.value = false;
  }
}

onMounted(() => {
  cargarFeedRecetas();
});

function irADetalleReceta(id) {
  router.push({ name: 'receta', params: { id: String(id) } });
}

function darLike(recetaId, event) {
  event?.stopPropagation();
  const receta = recetasFeed.value.find((r) => r.id === recetaId);
  if (receta) {
    receta.receta.likes++;
  }
}

function compartirReceta(post, event) {
  event?.stopPropagation();
  post.receta.compartidos++;
}

function comentarReceta(post, event) {
  event?.stopPropagation();
  irADetalleReceta(post.id);
}

function btnLogout() {
  clearAuthSession();
  router.push('/login');
}

function irBusqueda() {
  router.push('/busqueda');
}

function irPerfil() {
  router.push('/perfil');
}

function abrirPublicarReceta() {
  publicarRecetaRef.value?.abrir();
}

function onRecetaPublicada(receta) {
  recetasFeed.value.unshift(mapRecetaAFeed(receta));
}
</script>

<template>
  <div class="home-container">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand brand-title" href="#">
          <strong class="titulo">Chefsito</strong>
        </a>
        <div class="button-group">
          <button class="btn btn-success my-2 my-sm-0" type="button" @click="abrirPublicarReceta">
            <i class="fas fa-plus"></i> Publicar receta
          </button>
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="irBusqueda">
            <i class="fas fa-search"></i> Buscar recetas
          </button>
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="irPerfil">
            <i class="fas fa-user"></i> Mi perfil
          </button>
          <button class="btn btn-outline-secondary my-2 my-sm-0" type="button" @click="btnLogout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="main-content">
      <GeneradorIngredientes
        titulo="Generar recetas con tus ingredientes"
        subtitulo="Más de 300 ingredientes sugeridos al escribir. Añade chips, pulsa Generar recetas y abre el detalle con un clic."
      />

      <!-- Feed de Recetas Estilo Red Social -->
      <div class="feed-section">
        <h4 class="feed-titulo">
          <i class="fas fa-fire"></i> Recetas populares
        </h4>

        <p v-if="cargandoFeed" class="feed-estado">
          <i class="fas fa-spinner fa-spin"></i> Cargando recetas…
        </p>
        <p v-else-if="errorFeed" class="feed-estado feed-estado--error" role="alert">
          {{ errorFeed }}
        </p>
        <p v-else-if="!recetasFeed.length" class="feed-estado">
          Aún no hay recetas publicadas. ¡Sé el primero en publicar una!
        </p>

        <div v-else class="posts-container">
          <article
            v-for="post in recetasFeed"
            :key="post.id"
            class="post-card post-card--clickable"
            role="button"
            tabindex="0"
            @click="irADetalleReceta(post.id)"
            @keydown.enter="irADetalleReceta(post.id)"
          >
            <!-- Header del post -->
            <div class="post-header">
              <img :src="post.usuario.avatar" :alt="post.usuario.nombre" class="post-avatar" />
              <div class="post-user-info">
                <span class="post-username">{{ post.usuario.nombre }}</span>
                <span class="post-tiempo">{{ post.usuario.tiempo }}</span>
              </div>
              <button type="button" class="post-options" @click.stop>
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </div>

            <!-- Imagen de la receta -->
            <div class="post-imagen-container">
              <img :src="post.receta.imagen" :alt="post.receta.nombre" class="post-imagen" />
            </div>

            <!-- Acciones del post -->
            <div class="post-acciones">
              <div class="acciones-left">
                <button type="button" class="btn-accion" @click="darLike(post.id, $event)">
                  <i class="far fa-heart"></i>
                </button>
                <button type="button" class="btn-accion" @click="comentarReceta(post, $event)">
                  <i class="far fa-comment"></i>
                </button>
                <button type="button" class="btn-accion" @click="compartirReceta(post, $event)">
                  <i class="far fa-paper-plane"></i>
                </button>
              </div>
              <button type="button" class="btn-accion bookmark" @click.stop>
                <i class="far fa-bookmark"></i>
              </button>
            </div>

            <!-- Likes -->
            <div class="post-likes">
              <span>{{ post.receta.likes }} me gusta</span>
            </div>

            <!-- Contenido del post -->
            <div class="post-contenido">
              <h5 class="post-receta-nombre">{{ post.receta.nombre }}</h5>
              <p class="post-descripcion">
                <span class="post-username">{{ post.usuario.nombre }}</span>
                {{ post.receta.descripcion }}
              </p>
            </div>

            <!-- Ingredientes tags -->
            <div v-if="post.receta.ingredientes.length" class="post-ingredientes">
              <span
                v-for="(ing, idx) in post.receta.ingredientes.slice(0, 5)"
                :key="idx"
                class="ingrediente-tag"
              >
                #{{ ing }}
              </span>
            </div>

            <!-- Meta info -->
            <div class="post-meta">
              <span><i class="fas fa-clock"></i> {{ post.receta.tiempo }}</span>
              <span><i class="fas fa-users"></i> {{ post.receta.porciones }} porciones</span>
            </div>

            <!-- Comentarios -->
            <div class="post-comentarios-link">
              <button type="button" @click="comentarReceta(post, $event)">
                Ver receta completa
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <FooterComponent />

    <PlubiReceta ref="publicarRecetaRef" :autor-id="1" @publicada="onRecetaPublicada" />
  </div>
</template>

<style scoped>
/* Estilos específicos del componente */
</style>
