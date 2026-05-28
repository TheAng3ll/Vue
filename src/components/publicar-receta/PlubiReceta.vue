<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { Modal } from 'bootstrap';
import { publicarReceta } from '../../api/publicaReceta.js';
import { subirImagenReceta } from '../../api/subirImagenReceta.js';
import { INGREDIENTES_COMUNES } from '../../data/ingredientesComunes.js';
import { urlImagenReceta } from '../../utils/imagenReceta.js';
import './publicar-receta.css';

const props = defineProps({
  autorId: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['publicada']);

const modalEl = ref(null);
let modalInstance = null;

const guardando = ref(false);
const errorMsg = ref(null);
const inputNombre = ref('');
const inputDescripcion = ref('');
const nombreConfirmado = ref(false);
const ingredientesLista = ref([]);
const inputNombreFocused = ref(false);
const inputDescripcionRef = ref(null);
const imagenArchivo = ref(null);
const imagenPreviewUrl = ref(null);
const inputImagenRef = ref(null);

const formulario = ref({
  titulo: '',
  descripcion: '',
  instrucciones: '',
  consejos: '',
  tiempoPrep: '',
  comensales: 1,
  porciones: '',
  dificultad: '',
});

const mostrarSugerencias = computed(
  () =>
    !nombreConfirmado.value &&
    inputNombreFocused.value &&
    inputNombre.value.trim().length > 0
);

const sugerenciasFiltradas = computed(() => {
  const q = inputNombre.value.trim().toLowerCase();
  if (q.length < 1) return [];
  return INGREDIENTES_COMUNES.filter((ing) => ing.toLowerCase().includes(q)).slice(0, 10);
});

const puedeUsarNombreEscrito = computed(() => {
  const nombre = inputNombre.value.trim();
  if (!nombre) return false;
  const lower = nombre.toLowerCase();
  return !INGREDIENTES_COMUNES.some((ing) => ing.toLowerCase() === lower);
});

const puedeAgregarIngrediente = computed(
  () => nombreConfirmado.value && inputDescripcion.value.trim().length > 0
);

const formularioValido = computed(() => {
  return (
    formulario.value.titulo.trim() &&
    formulario.value.instrucciones.trim() &&
    ingredientesLista.value.length > 0
  );
});

function limpiarFormularioIngrediente() {
  inputNombre.value = '';
  inputDescripcion.value = '';
  nombreConfirmado.value = false;
}

async function confirmarNombre(nombre) {
  const limpio = nombre?.trim() || inputNombre.value.trim();
  if (!limpio) return;
  inputNombre.value = limpio;
  nombreConfirmado.value = true;
  inputNombreFocused.value = false;
  await nextTick();
  inputDescripcionRef.value?.focus();
}

function cambiarNombreSeleccionado() {
  nombreConfirmado.value = false;
  inputDescripcion.value = '';
}

function seleccionarNombreComun(nombre) {
  confirmarNombre(nombre);
}

function agregarIngredienteALista() {
  const nombre = inputNombre.value.trim();
  if (!nombre) return;

  if (!nombreConfirmado.value) {
    confirmarNombre(nombre);
    return;
  }

  const descripcion = inputDescripcion.value.trim();
  if (!descripcion) {
    errorMsg.value = 'Indica la cantidad o detalle del ingrediente.';
    return;
  }

  errorMsg.value = null;

  const clave = `${nombre.toLowerCase()}|${descripcion.toLowerCase()}`;
  const yaExiste = ingredientesLista.value.some(
    (i) => `${i.nombre.toLowerCase()}|${i.descripcion.toLowerCase()}` === clave
  );
  if (yaExiste) {
    limpiarFormularioIngrediente();
    return;
  }

  ingredientesLista.value = [
    ...ingredientesLista.value,
    { nombre, descripcion },
  ];
  limpiarFormularioIngrediente();
}

function quitarIngrediente(index) {
  ingredientesLista.value = ingredientesLista.value.filter((_, i) => i !== index);
}

function onKeydownNombre(e) {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  if (nombreConfirmado.value) return;
  confirmarNombre();
}

function onKeydownDescripcion(e) {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  agregarIngredienteALista();
}

function limpiarImagenSeleccionada() {
  if (imagenPreviewUrl.value) {
    URL.revokeObjectURL(imagenPreviewUrl.value);
  }
  imagenArchivo.value = null;
  imagenPreviewUrl.value = null;
  if (inputImagenRef.value) {
    inputImagenRef.value.value = '';
  }
}

function resetFormulario() {
  formulario.value = {
    titulo: '',
    descripcion: '',
    instrucciones: '',
    consejos: '',
    tiempoPrep: '',
    comensales: 1,
    porciones: '',
    dificultad: '',
  };
  ingredientesLista.value = [];
  limpiarFormularioIngrediente();
  limpiarImagenSeleccionada();
  errorMsg.value = null;
  guardando.value = false;
}

function onSeleccionarImagen(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    errorMsg.value = 'El archivo debe ser una imagen (JPG, PNG, WEBP o GIF).';
    limpiarImagenSeleccionada();
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    errorMsg.value = 'La imagen no puede superar 5 MB.';
    limpiarImagenSeleccionada();
    return;
  }

  errorMsg.value = null;
  if (imagenPreviewUrl.value) {
    URL.revokeObjectURL(imagenPreviewUrl.value);
  }
  imagenArchivo.value = file;
  imagenPreviewUrl.value = URL.createObjectURL(file);
}

onMounted(() => {
  if (modalEl.value) {
    modalInstance = new Modal(modalEl.value, { focus: true });
    modalEl.value.addEventListener('hidden.bs.modal', onModalHidden);
  }
});

onBeforeUnmount(() => {
  modalEl.value?.removeEventListener('hidden.bs.modal', onModalHidden);
  modalInstance?.dispose();
  modalInstance = null;
});

function onModalHidden() {
  resetFormulario();
}

function abrir() {
  errorMsg.value = null;
  modalInstance?.show();
}

function cerrar() {
  modalInstance?.hide();
}

function parseEntero(valor) {
  if (valor === '' || valor == null) return null;
  const n = Number(valor);
  return Number.isFinite(n) ? Math.round(n) : null;
}

async function enviarReceta() {
  errorMsg.value = null;
  if (!formularioValido.value) {
    errorMsg.value = 'Completa título, instrucciones y al menos un ingrediente.';
    return;
  }

  guardando.value = true;
  try {
    let imagenUrl = null;
    if (imagenArchivo.value) {
      imagenUrl = await subirImagenReceta(
        imagenArchivo.value,
        formulario.value.titulo
      );
    }

    const receta = await publicarReceta({
      titulo: formulario.value.titulo.trim(),
      instrucciones: formulario.value.instrucciones.trim(),
      autorId: props.autorId,
      descripcion: formulario.value.descripcion.trim() || null,
      consejos: formulario.value.consejos.trim() || null,
      tiempoPrep: parseEntero(formulario.value.tiempoPrep),
      comensales: parseEntero(formulario.value.comensales) ?? 1,
      porciones: parseEntero(formulario.value.porciones),
      dificultad: formulario.value.dificultad || null,
      ingredientes: ingredientesLista.value.map((i) => ({
        nombre: i.nombre,
        descripcion: i.descripcion,
      })),
      imagenUrl,
    });

    if (receta?.imagen) {
      receta.imagen = urlImagenReceta(receta.imagen);
    }

    emit('publicada', receta);
    cerrar();
  } catch (err) {
    errorMsg.value = err?.message ?? 'No se pudo publicar la receta.';
  } finally {
    guardando.value = false;
  }
}

defineExpose({ abrir, cerrar });
</script>

<template>
  <div
    ref="modalEl"
    class="modal fade publicar-receta-modal"
    tabindex="-1"
    aria-labelledby="publicarRecetaModalTitulo"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="publicarRecetaModalTitulo" class="modal-title">
            <i class="fas fa-utensils" aria-hidden="true"></i>
            Publicar receta
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          />
        </div>

        <div class="modal-body">
          <p v-if="errorMsg" class="publicar-receta-aviso error" role="alert">
            <i class="fas fa-exclamation-circle"></i> {{ errorMsg }}
          </p>

          <section class="publicar-receta-seccion" aria-labelledby="pub-receta-basico">
            <h6 id="pub-receta-basico" class="publicar-receta-seccion-titulo">
              Información básica
            </h6>

            <div class="publicar-receta-field">
              <label for="pub-receta-titulo">
                Título <span class="req">*</span>
              </label>
              <input
                id="pub-receta-titulo"
                v-model="formulario.titulo"
                type="text"
                class="publicar-receta-input"
                maxlength="255"
                placeholder="Ej. Omelette de hierbas"
              />
            </div>

            <div class="publicar-receta-field">
              <label for="pub-receta-descripcion">Descripción</label>
              <textarea
                id="pub-receta-descripcion"
                v-model="formulario.descripcion"
                class="publicar-receta-textarea"
                rows="2"
                maxlength="500"
                placeholder="Breve descripción para el feed…"
              />
            </div>
          </section>

          <section class="publicar-receta-seccion" aria-labelledby="pub-receta-ingredientes">
            <h6 id="pub-receta-ingredientes" class="publicar-receta-seccion-titulo">
              Ingredientes
            </h6>

            <div class="publicar-receta-ingredientes-form">
              <div class="publicar-receta-field publicar-receta-ingredientes-buscar">
                <label for="pub-receta-ing-nombre">Ingrediente</label>
                <div v-if="nombreConfirmado" class="publicar-receta-nombre-elegido">
                  <span>{{ inputNombre }}</span>
                  <button type="button" @click="cambiarNombreSeleccionado">Cambiar</button>
                </div>
                <div v-else class="publicar-receta-ingredientes-input">
              <input
                id="pub-receta-ing-nombre"
                v-model="inputNombre"
                type="text"
                class="publicar-receta-input"
                placeholder="Escribe y elige de la lista (ej. huevos, tomate…)"
                autocomplete="off"
                @keydown="onKeydownNombre"
                @focus="inputNombreFocused = true"
                @blur="inputNombreFocused = false"
              />

              <ul v-if="mostrarSugerencias" class="publicar-receta-sugerencias">
                <li v-for="sug in sugerenciasFiltradas" :key="sug">
                  <button type="button" @mousedown.prevent="seleccionarNombreComun(sug)">
                    {{ sug }}
                  </button>
                </li>
                <li v-if="puedeUsarNombreEscrito">
                  <button
                    type="button"
                    class="publicar-receta-sug-nuevo"
                    @mousedown.prevent="confirmarNombre()"
                  >
                    Usar «{{ inputNombre.trim() }}»
                  </button>
                </li>
                <li
                  v-if="!sugerenciasFiltradas.length && !puedeUsarNombreEscrito"
                  class="publicar-receta-sugerencias-estado"
                >
                  Sin coincidencias
                </li>
              </ul>
                </div>
              </div>

              <div class="publicar-receta-field">
                <label for="pub-receta-ing-descripcion">
                  Cantidad o detalle <span class="req">*</span>
                </label>
                <div class="publicar-receta-ingredientes-input">
                  <input
                    id="pub-receta-ing-descripcion"
                    ref="inputDescripcionRef"
                    v-model="inputDescripcion"
                    type="text"
                    class="publicar-receta-input"
                    :disabled="!nombreConfirmado"
                    placeholder="Ej. Un huevo, 80 g de panela en cubitos…"
                    maxlength="200"
                    @keydown="onKeydownDescripcion"
                  />
                  <button
                    type="button"
                    class="publicar-receta-btn-add"
                    aria-label="Agregar ingrediente"
                    :disabled="!puedeAgregarIngrediente"
                    @click="agregarIngredienteALista"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <p v-if="!nombreConfirmado" class="publicar-receta-hint">
                  Primero elige o confirma el ingrediente; luego escribe el detalle.
                </p>
              </div>
            </div>

            <ul v-if="ingredientesLista.length" class="publicar-receta-ingredientes-lista">
              <li
                v-for="(ing, idx) in ingredientesLista"
                :key="`${ing.nombre}-${idx}`"
                class="publicar-receta-ingrediente-item"
              >
                <div>
                  <strong>{{ ing.nombre }}</strong>
                  <span class="publicar-receta-ingrediente-desc">{{ ing.descripcion }}</span>
                </div>
                <button type="button" aria-label="Quitar" @click="quitarIngrediente(idx)">
                  <i class="fas fa-times"></i>
                </button>
              </li>
            </ul>
            <p v-else class="publicar-receta-hint">
              Agrega al menos un ingrediente <span class="req">*</span>
            </p>
          </section>

          <section class="publicar-receta-seccion" aria-labelledby="pub-receta-prep">
            <h6 id="pub-receta-prep" class="publicar-receta-seccion-titulo">
              Preparación
            </h6>

            <div class="publicar-receta-field">
              <label for="pub-receta-instrucciones">
                Instrucciones <span class="req">*</span>
              </label>
              <textarea
                id="pub-receta-instrucciones"
                v-model="formulario.instrucciones"
                class="publicar-receta-textarea"
                rows="4"
                placeholder="Pasos para preparar la receta…"
              />
            </div>

            <div class="publicar-receta-field">
              <label for="pub-receta-consejos">Consejos (opcional)</label>
              <textarea
                id="pub-receta-consejos"
                v-model="formulario.consejos"
                class="publicar-receta-textarea"
                rows="2"
                placeholder="Tips, variaciones o trucos…"
              />
            </div>
          </section>

          <section class="publicar-receta-seccion" aria-labelledby="pub-receta-detalles">
            <h6 id="pub-receta-detalles" class="publicar-receta-seccion-titulo">
              Detalles
            </h6>

            <div class="publicar-receta-row">
              <div class="publicar-receta-field">
                <label for="pub-receta-tiempo">Tiempo (min)</label>
                <input
                  id="pub-receta-tiempo"
                  v-model="formulario.tiempoPrep"
                  type="number"
                  min="1"
                  class="publicar-receta-input"
                  placeholder="30"
                />
              </div>

              <div class="publicar-receta-field">
                <label for="pub-receta-comensales">Comensales</label>
                <input
                  id="pub-receta-comensales"
                  v-model="formulario.comensales"
                  type="number"
                  min="1"
                  class="publicar-receta-input"
                />
              </div>

              <div class="publicar-receta-field">
                <label for="pub-receta-porciones">Porciones</label>
                <input
                  id="pub-receta-porciones"
                  v-model="formulario.porciones"
                  type="number"
                  min="1"
                  class="publicar-receta-input"
                  placeholder="4"
                />
              </div>
            </div>

            <div class="publicar-receta-field">
              <label for="pub-receta-dificultad">Dificultad</label>
              <select
                id="pub-receta-dificultad"
                v-model="formulario.dificultad"
                class="publicar-receta-select"
              >
                <option value="">Sin especificar</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>

            <div class="publicar-receta-field publicar-receta-imagen-field">
              <label for="pub-receta-imagen">Foto de la receta</label>
              <input
                id="pub-receta-imagen"
                ref="inputImagenRef"
                type="file"
                class="publicar-receta-file-input"
                accept="image/jpeg,image/png,image/webp,image/gif"
                @change="onSeleccionarImagen"
              />
              <p class="publicar-receta-hint">
                Se guarda en <code>public/imagenes/</code> y en la BD como
                <code>/imagenes/nombre_archivo.jpeg</code>
              </p>

              <div v-if="imagenPreviewUrl" class="publicar-receta-preview">
                <img :src="imagenPreviewUrl" alt="Vista previa de la receta" />
                <button
                  type="button"
                  class="publicar-receta-preview-quitar"
                  @click="limpiarImagenSeleccionada"
                >
                  <i class="fas fa-times"></i> Quitar imagen
                </button>
              </div>
            </div>
          </section>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button
            type="button"
            class="publicar-receta-btn-primary"
            :disabled="guardando || !formularioValido"
            @click="enviarReceta"
          >
            <i class="fas fa-paper-plane"></i>
            {{ guardando ? 'Publicando…' : 'Publicar receta' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
