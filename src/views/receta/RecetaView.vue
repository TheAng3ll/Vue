<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { obtenerReceta } from '../../api/recetas.js';
import './receta.css';
import FooterComponent from '../../components/footer/FooterComponent.vue';

const route = useRoute();
const router = useRouter();

const receta = ref(null);
const cargando = ref(true);
const errorMsg = ref(null);

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80';

async function cargar() {
  cargando.value = true;
  errorMsg.value = null;
  receta.value = null;

  const id = Number(route.params.id);
  if (!Number.isInteger(id) || id < 1) {
    errorMsg.value = 'ID de receta no válido.';
    cargando.value = false;
    return;
  }

  try {
    const data = await obtenerReceta(id);
    if (!data) {
      errorMsg.value = 'No encontramos esa receta.';
    } else {
      receta.value = data;
    }
  } catch (err) {
    errorMsg.value =
      err?.message ||
      'No se pudo cargar la receta. Comprueba que el servidor GraphQL esté activo.';
  } finally {
    cargando.value = false;
  }
}

watch(
  () => route.params.id,
  () => {
    cargar();
  },
  { immediate: true }
);

function volverBusqueda() {
  router.push('/busqueda');
}

function volverInicio() {
  router.push('/');
}
</script>

<template>
  <div class="receta-detalle-page">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand brand-title" href="#" @click.prevent="volverInicio">
          <strong class="titulo">Chefsito</strong>
        </a>
        <div class="button-group">
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="volverBusqueda">
            <i class="fas fa-arrow-left"></i> Búsqueda
          </button>
        </div>
      </div>
    </nav>

    <div v-if="cargando" class="receta-estado">
      <p><i class="fas fa-spinner fa-spin"></i> Cargando receta…</p>
    </div>

    <div v-else-if="errorMsg && !receta" class="receta-estado error">
      <p>{{ errorMsg }}</p>
      <button type="button" class="btn btn-success mt-3" @click="volverBusqueda">
        Volver a buscar
      </button>
    </div>

    <template v-else-if="receta">
      <div class="receta-hero">
        <article class="receta-hero-inner">
          <div class="receta-hero-img-wrap">
            <img
              class="receta-hero-img"
              :src="receta.imagen || PLACEHOLDER_IMG"
              :alt="receta.nombre"
            />
          </div>
          <div class="receta-hero-body">
            <h1 class="receta-hero-titulo">{{ receta.nombre }}</h1>
            <div class="receta-hero-meta">
              <span v-if="receta.tiempo_prep != null">
                <i class="fas fa-clock"></i> {{ receta.tiempo_prep }} min
              </span>
              <span v-if="receta.porciones != null">
                <i class="fas fa-users"></i> {{ receta.porciones }} porciones
              </span>
              <span v-if="receta.matchPorcentaje != null">
                <i class="fas fa-percent"></i> {{ Math.round(receta.matchPorcentaje) }}% match
              </span>
            </div>
            <p v-if="receta.descripcion" class="text-muted mb-3">{{ receta.descripcion }}</p>

            <div v-if="receta.ingredientes?.length" class="receta-ingredientes-lista">
              <span v-for="(ing, i) in receta.ingredientes" :key="i" class="ing-tag">{{ ing }}</span>
            </div>

            <div class="receta-instrucciones">
              <h2><i class="fas fa-list-ol text-success"></i> Preparación</h2>
              <div class="receta-instrucciones-texto">
                {{ receta.instrucciones || 'Sin instrucciones registradas.' }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </template>

    <FooterComponent />
  </div>
</template>

<style scoped>
.titulo {
  color: #28a745;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.button-group {
  display: flex;
  gap: 10px;
}
</style>
