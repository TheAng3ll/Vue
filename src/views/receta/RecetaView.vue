<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { obtenerReceta } from '../../api/recetas.js';
import './receta.css';
import FooterComponent from '../../components/footer/FooterComponent.vue';
import { urlImagenReceta } from '../../utils/imagenReceta.js';

const route = useRoute();
const router = useRouter();

const receta = ref(null);
const cargando = ref(true);
const errorMsg = ref(null);

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

function etiquetasIngredientes(rec) {
  const mostrar = rec.ingredientesMostrar ?? rec.ingredientes_mostrar;
  if (Array.isArray(mostrar) && mostrar.length) return mostrar;
  return rec.ingredientes ?? [];
}

/**
 * Instrucciones tipo "1: … 2: …" (separadas por espacio/salto antes del siguiente número).
 * Si algún tramo no encaja en `N: texto`, se devuelve null y la vista usa texto plano.
 */
function parsePasosInstrucciones(text) {
  if (!text || typeof text !== 'string') return null;
  const t = text.trim();
  if (!t) return null;
  const segmentos = t.split(/\s+(?=\d+\s*:)/).map((s) => s.trim()).filter(Boolean);
  const pasos = [];
  for (const seg of segmentos) {
    const m = seg.match(/^(\d+)\s*:\s*(.*)$/s);
    if (!m) return null;
    pasos.push({ numero: Number(m[1]), texto: m[2].trim() });
  }
  return pasos.length ? pasos : null;
}

const pasosInstrucciones = computed(() => {
  if (!receta.value?.instrucciones) return null;
  return parsePasosInstrucciones(receta.value.instrucciones);
});

/** Párrafos del campo `consejos` (bloques separados por una o más líneas en blanco). */
const bloquesConsejos = computed(() => {
  const t = receta.value?.consejos;
  if (!t || typeof t !== 'string') return [];
  return t
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
});
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
              :src="urlImagenReceta(receta.imagen)"
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

            <section
              v-if="bloquesConsejos.length"
              class="receta-secretos"
              aria-labelledby="receta-secretos-heading"
            >
              <h2 id="receta-secretos-heading" class="receta-secretos-titulo">
                <span class="receta-secretos-icon" aria-hidden="true">
                  <i class="fas fa-lightbulb"></i>
                </span>
                Secretos del Chef
              </h2>
              <div class="receta-secretos-inner">
                <p
                  v-for="(bloque, i) in bloquesConsejos"
                  :key="i"
                  class="receta-secretos-parrafo"
                >
                  {{ bloque }}
                </p>
              </div>
            </section>

            <div v-if="etiquetasIngredientes(receta).length" class="receta-ingredientes-lista">
              <span v-for="(ing, i) in etiquetasIngredientes(receta)" :key="i" class="ing-tag">{{ ing }}</span>
            </div>

            <div class="receta-instrucciones">
              <h2><i class="fas fa-list-ol text-success"></i> Preparación</h2>
              <ul v-if="pasosInstrucciones" class="receta-pasos-lista" role="list">
                <li
                  v-for="(paso, i) in pasosInstrucciones"
                  :key="`${paso.numero}-${i}`"
                  class="receta-paso-item"
                >
                  <span class="receta-paso-badge" aria-hidden="true">{{ paso.numero }}</span>
                  <p class="receta-paso-texto">
                    <span class="visually-hidden">Paso {{ paso.numero }}. </span>{{ paso.texto }}
                  </p>
                </li>
              </ul>
              <div v-else class="receta-instrucciones-texto">
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
