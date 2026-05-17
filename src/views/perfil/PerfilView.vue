<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../home/home.css';
import './perfil.css';
import FooterComponent from '../../components/footer/FooterComponent.vue';

const router = useRouter();

const guardando = ref(false);

const usuario = ref({
  nombre: 'Chef Demo',
  email: 'chef.demo@chefsito.app',
  bio: 'Me encanta cocinar con ingredientes de temporada y compartir recetas rápidas para la semana.',
  fotoPerfil:
    'https://ui-avatars.com/api/?name=Chef+Demo&background=28a745&color=fff&size=256',
  miembroDesde: 'Marzo 2026',
});

const stats = ref({
  recetasGuardadas: 12,
  seguidores: 48,
  meGusta: 156,
});

const misRecetas = ref([
  {
    id: 1,
    nombre: 'Omelette de hierbas',
    descripcion: 'Huevos esponjosos con perejil y cebollín, lista en minutos.',
    imagen:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80',
    tiempo: '15 min',
  },
  {
    id: 4,
    nombre: 'Pasta al pesto',
    descripcion: 'Albahaca fresca, piñones y queso parmesano.',
    imagen:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
    tiempo: '25 min',
  },
  {
    id: 6,
    nombre: 'Ensalada griega',
    descripcion: 'Tomate, pepino, aceitunas y feta con orégano.',
    imagen:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
    tiempo: '12 min',
  },
]);

function irHome() {
  router.push('/home');
}

function irBusqueda() {
  router.push('/busqueda');
}

function cerrarSesion() {
  router.push('/').then(() => {
    window.location.reload();
  });
}

async function guardarPerfil() {
  guardando.value = true;
  await new Promise((r) => setTimeout(r, 700));
  guardando.value = false;
  alert('Cambios guardados (demo). Conecta aquí tu mutación GraphQL cuando esté lista.');
}

function abrirReceta(id) {
  router.push(`/receta/${id}`);
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
      <section class="perfil-hero">
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

      <section class="perfil-card">
        <h2 class="perfil-card-title">
          <i class="fas fa-user-edit"></i>
          Editar perfil
        </h2>

        <div class="perfil-field">
          <label for="perfil-nombre">Nombre visible</label>
          <div class="perfil-input-wrap">
            <i class="fas fa-user input-icon"></i>
            <input
              id="perfil-nombre"
              v-model="usuario.nombre"
              type="text"
              class="perfil-input"
              autocomplete="name"
            />
          </div>
        </div>

        <div class="perfil-field">
          <label for="perfil-email">Correo</label>
          <div class="perfil-input-wrap">
            <i class="fas fa-at input-icon"></i>
            <input
              id="perfil-email"
              v-model="usuario.email"
              type="email"
              class="perfil-input"
              autocomplete="email"
            />
          </div>
        </div>

        <div class="perfil-field">
          <label for="perfil-bio">Bio</label>
          <textarea
            id="perfil-bio"
            v-model="usuario.bio"
            class="perfil-input perfil-textarea"
            rows="3"
          />
        </div>

        <div class="perfil-actions">
          <button
            type="button"
            class="btn-perfil-primary"
            :disabled="guardando"
            @click="guardarPerfil"
          >
            <i class="fas fa-save"></i>
            {{ guardando ? 'Guardando…' : 'Guardar cambios' }}
          </button>
          <button type="button" class="btn-perfil-ghost" @click="irHome">
            Volver al inicio
          </button>
        </div>
      </section>

      <section class="perfil-card">
        <h2 class="perfil-card-title">
          <i class="fas fa-bookmark"></i>
          Mis recetas publicadas
        </h2>
        <div class="perfil-recetas-grid">
          <button
            v-for="r in misRecetas"
            :key="r.id"
            type="button"
            class="perfil-receta-mini"
            @click="abrirReceta(r.id)"
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
  </div>
</template>
