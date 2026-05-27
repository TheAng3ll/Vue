<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { buscarRecetas } from '../../api/recetas.js';
import { INGREDIENTES_COMUNES } from '../../data/ingredientesComunes.js';
import { urlImagenReceta } from '../../utils/imagenReceta.js';

const COMBOS = [
  {
    icono: 'fas fa-sun',
    nombre: 'Desayuno clásico',
    descripcion: 'Rápido, nutritivo y fácil de preparar.',
    ingredientes: ['huevo', 'pan', 'mantequilla', 'leche'],
  },
  {
    icono: 'fas fa-drumstick-bite',
    nombre: 'Proteico express',
    descripcion: 'Alto en proteínas para rendir todo el día.',
    ingredientes: ['pollo', 'arroz', 'brócoli', 'ajo'],
  },
  {
    icono: 'fas fa-leaf',
    nombre: 'Ensalada fresca',
    descripcion: 'Ligero, colorido y lleno de vitaminas.',
    ingredientes: ['lechuga', 'tomate', 'pepino', 'limón'],
  },
  {
    icono: 'fas fa-cheese',
    nombre: 'Pasta italiana',
    descripcion: 'Cremosa y reconfortante en pocos pasos.',
    ingredientes: ['pasta', 'tomate', 'ajo', 'queso'],
  },
];

const props = defineProps({
  titulo: {
    type: String,
    default: 'Buscar por ingredientes',
  },
  subtitulo: {
    type: String,
    default:
      'Escribe un ingrediente y pulsa Enter o el botón +. Luego genera las mejores coincidencias desde la API GraphQL.',
  },
  mostrarCombos: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const inputIngrediente = ref('');
const ingredientesChips = ref([]);
const resultados = ref([]);
const cargando = ref(false);
const errorMsg = ref(null);

/** Etiquetas para tarjetas: API devuelve `ingredientesMostrar` (descripcion o nombre); fallback a nombres. */
function etiquetasReceta(r) {
  const mostrar = r.ingredientesMostrar ?? r.ingredientes_mostrar;
  if (Array.isArray(mostrar) && mostrar.length) return mostrar;
  return r.ingredientes ?? [];
}

const sugerenciasFiltradas = computed(() => {
  const q = inputIngrediente.value.trim().toLowerCase();
  if (q.length < 1) return [];
  const ya = new Set(ingredientesChips.value.map((s) => s.toLowerCase()));
  return INGREDIENTES_COMUNES.filter(
    (ing) =>
      ing.toLowerCase().includes(q) && !ya.has(ing.toLowerCase())
  ).slice(0, 10);
});

const haySugerencias = computed(
  () => sugerenciasFiltradas.value.length > 0 && document.activeElement?.closest?.('.input-wrapper')
);

function agregarIngrediente() {
  const raw = inputIngrediente.value.trim();
  if (!raw) return;
  const normalizado = raw.toLowerCase();
  if (ingredientesChips.value.some((s) => s.toLowerCase() === normalizado)) {
    inputIngrediente.value = '';
    return;
  }
  ingredientesChips.value = [...ingredientesChips.value, raw];
  inputIngrediente.value = '';
}

function quitarIngrediente(index) {
  ingredientesChips.value = ingredientesChips.value.filter((_, i) => i !== index);
}

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    agregarIngrediente();
  }
}

function limpiarTodo() {
  ingredientesChips.value = [];
  resultados.value = [];
  errorMsg.value = null;
}

async function ejecutarBusqueda() {
  errorMsg.value = null;
  resultados.value = [];
  if (!ingredientesChips.value.length) {
    errorMsg.value = 'Agrega al menos un ingrediente.';
    return;
  }
  cargando.value = true;
  try {
    resultados.value = await buscarRecetas(ingredientesChips.value);
    if (!resultados.value.length) {
      errorMsg.value =
        'No hay recetas que coincidan con esos ingredientes. Prueba otros.';
    }
  } catch (err) {
    errorMsg.value =
      err?.message ||
      'No se pudo conectar con el servidor. ¿Está corriendo VueBack en el puerto 4000?';
  } finally {
    cargando.value = false;
  }
}

function irADetalle(id) {
  router.push({ name: 'receta', params: { id: String(id) } });
}

function seleccionarSugerencia(ing) {
  inputIngrediente.value = ing;
  agregarIngrediente();
}

function cargarCombo(combo) {
  ingredientesChips.value = [...combo.ingredientes];
  inputIngrediente.value = '';
}
</script>

<template>
  <section class="generador-section">
    <div class="generador-card">
      <h3 class="generador-titulo">
        <i class="fas fa-carrot"></i>
        {{ props.titulo }}
      </h3>
      <p class="generador-subtitulo">{{ props.subtitulo }}</p>

      <div class="chips-container">
        <span
          v-for="(ing, idx) in ingredientesChips"
          :key="`${ing}-${idx}`"
          class="ingrediente-chip"
        >
          {{ ing }}
          <button
            type="button"
            class="chip-remove"
            :aria-label="`Quitar ${ing}`"
            @click="quitarIngrediente(idx)"
          >
            <i class="fas fa-times"></i>
          </button>
        </span>
      </div>

      <div class="input-wrapper">
        <div class="autocomplete-input-group">
          <i class="fas fa-leaf input-icon"></i>
          <input
            v-model="inputIngrediente"
            type="text"
            class="autocomplete-input"
            placeholder="Ej: huevo, tomate, queso…"
            autocomplete="off"
            @keydown="onKeydown"
          />
          <button
            type="button"
            class="btn-add-ingrediente"
            aria-label="Agregar ingrediente"
            @click="agregarIngrediente"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <ul
          v-if="sugerenciasFiltradas.length"
          class="sugerencias-lista"
          role="listbox"
          aria-label="Sugerencias de ingredientes"
        >
          <li
            v-for="sug in sugerenciasFiltradas"
            :key="sug"
            class="sugerencia-item"
            role="option"
            @mousedown.prevent="seleccionarSugerencia(sug)"
          >
            <i class="fas fa-leaf"></i>
            <span><strong>{{ sug }}</strong></span>
          </li>
        </ul>
      </div>

      <div class="generador-botones">
        <button
          type="button"
          class="btn btn-success btn-generar"
          :disabled="cargando || !ingredientesChips.length"
          @click="ejecutarBusqueda"
        >
          <span v-if="cargando"><i class="fas fa-spinner fa-spin"></i> Buscando…</span>
          <span v-else><i class="fas fa-search"></i> Generar recetas</span>
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary btn-limpiar"
          :disabled="cargando"
          @click="limpiarTodo"
        >
          Limpiar
        </button>
      </div>

      <div v-if="errorMsg" class="alert alert-warning mt-3 mb-0" role="alert">
        {{ errorMsg }}
      </div>
    </div>
  </section>

  <template v-if="resultados.length">
    <section class="resultados-section">
      <h4 class="resultados-titulo">
        <i class="fas fa-utensils"></i> Mejores coincidencias
      </h4>
      <div class="recetas-grid">
        <article
          v-for="r in resultados"
          :key="r.id"
          class="receta-card"
          role="button"
          tabindex="0"
          @click="irADetalle(r.id)"
          @keydown.enter="irADetalle(r.id)"
        >
          <div class="receta-imagen-container">
            <img
              class="receta-imagen"
              :src="urlImagenReceta(r.imagen)"
              :alt="r.nombre"
              loading="lazy"
            />
            <span v-if="r.matchPorcentaje != null" class="match-badge">
              {{ Math.round(r.matchPorcentaje) }}% match
            </span>
          </div>
          <div class="receta-info">
            <h5 class="receta-nombre">{{ r.nombre }}</h5>
            <p class="receta-descripcion">{{ r.descripcion || 'Sin descripción.' }}</p>
            <div class="receta-meta">
              <span v-if="r.tiempo_prep != null">
                <i class="fas fa-clock"></i> {{ r.tiempo_prep }} min
              </span>
              <span v-if="r.porciones != null">
                <i class="fas fa-users"></i> {{ r.porciones }} porc.
              </span>
            </div>
            <div class="receta-ingredientes">
              <span
                v-for="(ing, i) in etiquetasReceta(r).slice(0, 4)"
                :key="i"
                class="ing-tag"
              >
                {{ ing }}
              </span>
              <span v-if="etiquetasReceta(r).length > 4" class="ing-tag more">
                +{{ etiquetasReceta(r).length - 4 }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </template>

  <template v-else-if="props.mostrarCombos">
    <section class="combos-section">
      <div class="combos-header">
        <h4 class="combos-titulo">
          <i class="fas fa-lightbulb"></i> ¿Sin ideas? Prueba un combo
        </h4>
        <p class="combos-sub">
          Haz clic en una tarjeta y cargamos los ingredientes por ti
        </p>
      </div>
      <div class="combos-grid">
        <button
          v-for="(combo, idx) in COMBOS"
          :key="combo.nombre"
          type="button"
          class="combo-card"
          @click="cargarCombo(combo)"
        >
          <span class="combo-num">0{{ idx + 1 }}</span>
          <div class="combo-icon-wrap">
            <i :class="combo.icono"></i>
          </div>
          <h5 class="combo-nombre">{{ combo.nombre }}</h5>
          <p class="combo-desc">{{ combo.descripcion }}</p>
          <div class="combo-chips">
            <span v-for="ing in combo.ingredientes" :key="ing" class="combo-chip">
              {{ ing }}
            </span>
          </div>
          <span class="combo-cta">
            Probar <i class="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </section>
  </template>
</template>
