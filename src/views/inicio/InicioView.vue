<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import './inicio.css';
import omelet from '../../assets/omelet.png';
import semola from '../../assets/semola.png';
import tostada from '../../assets/tostada.png';
import FooterComponent from '../../components/footer/FooterComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function btnLogin() {
  router.push('/login').then(() => { window.location.reload(); });
}
function btnSing() {
  router.push('/registrar').then(() => { window.location.reload(); });
}

function irBusqueda() {
  router.push('/busqueda');
}

const recetas = [
  {
    img: omelet,
    nombre: 'Omelette Campestre',
    descripcion: 'Rápido, fácil y lleno de sabor para empezar el día.',
    tiempo: '10 min',
    porciones: 1,
    tag: 'Desayuno'
  },
  {
    img: semola,
    nombre: 'Sémola con Queso Cheddar',
    descripcion: 'Cremosa, reconfortante y con el toque perfecto de ajo.',
    tiempo: '20 min',
    porciones: 2,
    tag: 'Desayuno'
  },
  {
    img: tostada,
    nombre: 'Tostada con Aguacate',
    descripcion: 'Ligera, fresca y balanceada. El favorito saludable.',
    tiempo: '5 min',
    porciones: 1,
    tag: 'Snack'
  }
];

const current = ref(0);
let timer = null;

function goTo(i) {
  current.value = (i + recetas.length) % recetas.length;
}
function next() { goTo(current.value + 1); }
function prev() { goTo(current.value - 1); }
function resetTimer() { clearInterval(timer); timer = setInterval(next, 4500); }

onMounted(() => { timer = setInterval(next, 4500); });
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="inicio-page">

    <!-- Navbar -->
    <nav class="inicio-navbar">
      <a href="#" class="brand-link">
        <i class="fas fa-utensils"></i>
        <strong>Chefsito</strong>
      </a>
      <div class="nav-buttons">
        <button class="btn-nav-outline" @click="btnLogin">Iniciar sesión</button>
        <button class="btn-nav-solid" @click="btnSing">Registrarse</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <!-- Lado izquierdo: texto -->
      <div class="hero-text">
        <span class="hero-badge">
          <i class="fas fa-fire"></i> ¡Tu cocina, reinventada!
        </span>
        <h1 class="hero-titulo">
          Descubre recetas con lo que tienes en casa
        </h1>
        <p class="hero-subtitulo">
          Ingresa tus ingredientes y Chefsito encuentra las mejores recetas para ti. Sin desperdicio, sin complicaciones.
        </p>
        <div class="hero-actions">
          <button class="btn-hero-primary" @click="btnSing">
            <i class="fas fa-user-plus"></i> Crear cuenta gratis
          </button>
          <button class="btn-hero-secondary" @click="btnLogin">
            Ya tengo cuenta
          </button>
        </div>
        <p class="mt-3 mb-0">
          <button type="button" class="btn btn-link text-success p-0 hero-busqueda-cta" @click="irBusqueda">
            Probar búsqueda por ingredientes <i class="fas fa-arrow-right ms-1"></i>
          </button>
        </p>
        <!-- Stats -->
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">500+</span>
            <span class="stat-label">Recetas</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">1.2k</span>
            <span class="stat-label">Chefs activos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">98%</span>
            <span class="stat-label">Satisfacción</span>
          </div>
        </div>
      </div>

      <!-- Lado derecho: slider de recetas -->
      <div class="hero-slider">
        <div class="slider-card">
          <!-- Imagen con transición -->
          <div class="slider-img-wrapper">
            <transition name="recipe-fade" mode="out-in">
              <img
                :key="current"
                :src="recetas[current].img"
                :alt="recetas[current].nombre"
                class="slider-img"
              />
            </transition>
            <!-- Tag flotante -->
            <span class="slider-tag">{{ recetas[current].tag }}</span>
          </div>

          <!-- Info de la receta -->
          <transition name="recipe-fade" mode="out-in">
            <div :key="'info-' + current" class="slider-info">
              <h3 class="slider-nombre">{{ recetas[current].nombre }}</h3>
              <p class="slider-desc">{{ recetas[current].descripcion }}</p>
              <div class="slider-meta">
                <span><i class="fas fa-clock"></i> {{ recetas[current].tiempo }}</span>
                <span><i class="fas fa-user"></i> {{ recetas[current].porciones }} porción</span>
              </div>
            </div>
          </transition>

          <!-- Controles del slider -->
          <div class="slider-controls">
            <button class="slider-arrow" @click="prev(); resetTimer()">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="slider-dots">
              <button
                v-for="(r, i) in recetas"
                :key="i"
                class="slider-dot"
                :class="{ active: i === current }"
                @click="goTo(i); resetTimer()"
              ></button>
            </div>
            <button class="slider-arrow" @click="next(); resetTimer()">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Tarjetas flotantes decorativas -->
        <div class="float-card float-top">
          <i class="fas fa-search"></i>
          <span>Busca por ingredientes</span>
        </div>
        <div class="float-card float-bottom">
          <i class="fas fa-percentage"></i>
          <span>Match al <strong>95%</strong></span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="features-inner">
        <h2>¿Cómo funciona?</h2>
        <p class="features-sub">Tres pasos y ya estás cocinando</p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-num">01</div>
            <div class="feature-icon"><i class="fas fa-plus-circle"></i></div>
            <h3>Agrega ingredientes</h3>
            <p>Escribe lo que tienes disponible en tu refrigerador o despensa.</p>
          </div>
          <div class="feature-card">
            <div class="feature-num">02</div>
            <div class="feature-icon"><i class="fas fa-magic"></i></div>
            <h3>Chefsito analiza</h3>
            <p>Nuestro algoritmo encuentra las recetas que mejor se adaptan a ti.</p>
          </div>
          <div class="feature-card">
            <div class="feature-num">03</div>
            <div class="feature-icon"><i class="fas fa-utensils"></i></div>
            <h3>¡A cocinar!</h3>
            <p>Sigue las instrucciones paso a paso y sorprende a todos.</p>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<style scoped>
</style>
