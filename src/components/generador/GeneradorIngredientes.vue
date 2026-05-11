<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { buscarRecetas } from '../../api/recetas.js';
import { INGREDIENTES_COMUNES } from '../../data/ingredientesComunes.js';

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
});

const router = useRouter();

const inputIngrediente = ref('');
const ingredientesChips = ref([]);
const resultados = ref([]);
const cargando = ref(false);
const errorMsg = ref(null);

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';

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

  <section v-if="resultados.length" class="resultados-section">
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
            :src="r.imagen || PLACEHOLDER_IMG"
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
              v-for="(ing, i) in (r.ingredientes || []).slice(0, 4)"
              :key="i"
              class="ing-tag"
            >
              {{ ing }}
            </span>
            <span v-if="(r.ingredientes || []).length > 4" class="ing-tag more">
              +{{ (r.ingredientes || []).length - 4 }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
