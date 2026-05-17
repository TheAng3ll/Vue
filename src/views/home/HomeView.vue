<script setup>
import { ref } from 'vue';
import './home.css';
import { useRouter } from 'vue-router';
import GeneradorIngredientes from '../../components/generador/GeneradorIngredientes.vue';
import FooterComponent from '../../components/footer/FooterComponent.vue';

const router = useRouter();

// Recetas de ejemplo para el feed
const recetasFeed = ref([
  {
    id: 2,
    usuario: {
      nombre: 'Chef Carlos',
      avatar: 'https://ui-avatars.com/api/?name=Chef+Carlos&background=17a2b8&color=fff',
      tiempo: 'Hace 5 horas'
    },
    receta: {
      nombre: 'Tacos al Pastor',
      imagen: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
      descripcion: 'Auténticos tacos al pastor marinados con chiles, achiote y especias. Servidos con piña, cilantro y cebolla.',
      ingredientes: ['carne de cerdo', 'chile guajillo', 'achiote', 'piña', 'tortillas', 'cilantro'],
      tiempo: '2 hrs',
      porciones: 6,
      likes: 256,
      comentarios: 45,
      compartidos: 67
    }
  },
  {
    id: 3,
    usuario: {
      nombre: 'Ana Saludable',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Saludable&background=ffc107&color=000',
      tiempo: 'Hace 8 horas'
    },
    receta: {
      nombre: 'Ensalada de Quinoa',
      imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      descripcion: 'Ensalada fresca y nutritiva con quinoa, aguacate, tomate cherry y aderezo de limón. Ideal para un almuerzo ligero.',
      ingredientes: ['quinoa', 'aguacate', 'tomate cherry', 'pepino', 'limón', 'aceite de oliva'],
      tiempo: '20 min',
      porciones: 2,
      likes: 89,
      comentarios: 15,
      compartidos: 8
    }
  },
  {
    id: 5,
    usuario: {
      nombre: 'Pedro Postres',
      avatar: 'https://ui-avatars.com/api/?name=Pedro+Postres&background=6f42c1&color=fff',
      tiempo: 'Ayer'
    },
    receta: {
      nombre: 'Flan Napolitano',
      imagen: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
      descripcion: 'Flan casero con queso crema y caramelo. Suave, cremoso y con el toque perfecto de dulzura.',
      ingredientes: ['huevos', 'leche condensada', 'leche evaporada', 'queso crema', 'vainilla', 'azúcar'],
      tiempo: '1 hr',
      porciones: 8,
      likes: 198,
      comentarios: 34,
      compartidos: 45
    }
  }
]);

// Interacciones con posts
function darLike(recetaId) {
  const receta = recetasFeed.value.find(r => r.id === recetaId);
  if (receta) {
    receta.receta.likes++;
  }
}

function compartirReceta(receta) {
  // Simular compartir
  receta.receta.compartidos++;
  alert(`Receta "${receta.receta.nombre}" compartida!`);
}

function comentarReceta(receta) {
  // Aquí se abriría un modal de comentarios
  alert(`Abrir comentarios para: ${receta.receta.nombre}`);
}

function btnLogout() {
  router.push('/').then(() => {
    window.location.reload()
  })
}

function irBusqueda() {
  router.push('/busqueda')
}

function irPerfil() {
  router.push('/perfil')
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
        
        <div class="posts-container">
          <div v-for="post in recetasFeed" :key="post.id" class="post-card">
            <!-- Header del post -->
            <div class="post-header">
              <img :src="post.usuario.avatar" :alt="post.usuario.nombre" class="post-avatar" />
              <div class="post-user-info">
                <span class="post-username">{{ post.usuario.nombre }}</span>
                <span class="post-tiempo">{{ post.usuario.tiempo }}</span>
              </div>
              <button class="post-options">
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
                <button @click="darLike(post.id)" class="btn-accion">
                  <i class="far fa-heart"></i>
                </button>
                <button @click="comentarReceta(post)" class="btn-accion">
                  <i class="far fa-comment"></i>
                </button>
                <button @click="compartirReceta(post)" class="btn-accion">
                  <i class="far fa-paper-plane"></i>
                </button>
              </div>
              <button class="btn-accion bookmark">
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
            <div class="post-ingredientes">
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
              <button @click="comentarReceta(post)">
                Ver los {{ post.receta.comentarios }} comentarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
/* Estilos específicos del componente */
</style>
