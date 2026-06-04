<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Modal } from 'bootstrap';
import { actualizarUsuario } from '../../api/usuarioInfo.js';
import './perfil-config.css';

const props = defineProps({
  usuario: {
    type: Object,
    default: () => ({
      id: null,
      nombre: '',
      email: '',
      bio: '',
      fotoPerfil: '',
    }),
  },
});

const emit = defineEmits(['guardar', 'cerrar-sesion', 'eliminar-cuenta']);

const modalEl = ref(null);
let modalInstance = null;

const guardando = ref(false);

const formulario = ref({
  nombre: '',
  email: '',
  bio: '',
  fotoPerfil: '',
});

const preferencias = ref({
  perfilPublico: true,
  notifComentarios: true,
  notifLikes: true,
  notifEmail: false,
  idioma: 'es',
});

function sincronizarFormulario() {
  formulario.value = {
    nombre: props.usuario.nombre ?? '',
    email: props.usuario.email ?? '',
    bio: props.usuario.bio ?? '',
    fotoPerfil: props.usuario.fotoPerfil ?? '',
  };
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
  guardando.value = false;
}

function abrir() {
  sincronizarFormulario();
  modalInstance?.show();
}

function cerrar() {
  modalInstance?.hide();
}

async function guardarCambios() {
  if (!props.usuario.id) {
    alert('No se pudo identificar tu usuario');
    return;
  }

  guardando.value = true;

  try {
    const actualizado = await actualizarUsuario(
      props.usuario.id,
      formulario.value.nombre,
      formulario.value.email,
      formulario.value.bio,
    );
    emit('guardar', actualizado);
    cerrar();
  } catch (err) {
    alert(err.message || 'No se pudo guardar el perfil');
  } finally {
    guardando.value = false;
  }
}

function solicitarCambioFoto() {
  alert('Aquí conectarás la subida de foto de perfil.');
}

function cambiarContrasena() {
  alert('Flujo de cambio de contraseña (demo).');
}

function solicitarCerrarSesion() {
  cerrar();
  emit('cerrar-sesion');
}

function solicitarEliminarCuenta() {
  const confirmar = window.confirm(
    '¿Eliminar tu cuenta? Esta acción no se puede deshacer (demo).'
  );
  if (confirmar) {
    cerrar();
    emit('eliminar-cuenta');
  }
}

defineExpose({ abrir, cerrar });
</script>

<template>
  <div
    ref="modalEl"
    class="modal fade perfil-config-modal"
    tabindex="-1"
    aria-labelledby="perfilConfigModalTitulo"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="perfilConfigModalTitulo" class="modal-title">
            <i class="fas fa-cog" aria-hidden="true"></i>
            Configuración del perfil
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          />
        </div>

        <div class="modal-body">
          <section class="perfil-config-seccion" aria-labelledby="perfil-config-cuenta">
            <h6 id="perfil-config-cuenta" class="perfil-config-seccion-titulo">
              Cuenta
            </h6>

            <div class="perfil-config-avatar-row perfil-config-field">
              <img
                :src="formulario.fotoPerfil || 'https://ui-avatars.com/api/?name=Chef&background=28a745&color=fff'"
                :alt="formulario.nombre || 'Avatar'"
                class="perfil-config-avatar"
                width="72"
                height="72"
              />
              <div class="perfil-config-avatar-actions">
                <button
                  type="button"
                  class="perfil-config-btn-ghost"
                  @click="solicitarCambioFoto"
                >
                  <i class="fas fa-camera"></i> Cambiar foto
                </button>
              </div>
            </div>

            <div class="perfil-config-field">
              <label for="perfil-config-nombre">Nombre visible</label>
              <input
                id="perfil-config-nombre"
                v-model="formulario.nombre"
                type="text"
                class="perfil-config-input"
                autocomplete="name"
              />
            </div>

            <div class="perfil-config-field">
              <label for="perfil-config-email">Correo</label>
              <input
                id="perfil-config-email"
                v-model="formulario.email"
                type="email"
                class="perfil-config-input"
                autocomplete="email"
              />
            </div>

            <div class="perfil-config-field">
              <label for="perfil-config-bio">Bio</label>
              <textarea
                id="perfil-config-bio"
                v-model="formulario.bio"
                class="perfil-config-textarea"
                rows="3"
                maxlength="280"
              />
            </div>
          </section>

          <section class="perfil-config-seccion" aria-labelledby="perfil-config-privacidad">
            <h6 id="perfil-config-privacidad" class="perfil-config-seccion-titulo">
              Privacidad
            </h6>

            <div class="perfil-config-switch-row">
              <div class="perfil-config-switch-text">
                <strong>Perfil público</strong>
                <span>Otros usuarios pueden ver tu perfil y recetas</span>
              </div>
              <div class="form-check form-switch m-0">
                <input
                  id="perfil-config-publico"
                  v-model="preferencias.perfilPublico"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>
          </section>

          <section class="perfil-config-seccion" aria-labelledby="perfil-config-notif">
            <h6 id="perfil-config-notif" class="perfil-config-seccion-titulo">
              Notificaciones
            </h6>

            <div class="perfil-config-switch-row">
              <div class="perfil-config-switch-text">
                <strong>Comentarios</strong>
                <span>Cuando alguien comenta tus recetas</span>
              </div>
              <div class="form-check form-switch m-0">
                <input
                  id="perfil-config-notif-comentarios"
                  v-model="preferencias.notifComentarios"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>

            <div class="perfil-config-switch-row">
              <div class="perfil-config-switch-text">
                <strong>Me gusta</strong>
                <span>Cuando recibes likes en tus publicaciones</span>
              </div>
              <div class="form-check form-switch m-0">
                <input
                  id="perfil-config-notif-likes"
                  v-model="preferencias.notifLikes"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>

            <div class="perfil-config-switch-row">
              <div class="perfil-config-switch-text">
                <strong>Resumen por correo</strong>
                <span>Actividad semanal en tu email</span>
              </div>
              <div class="form-check form-switch m-0">
                <input
                  id="perfil-config-notif-email"
                  v-model="preferencias.notifEmail"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>
          </section>

          <section class="perfil-config-seccion" aria-labelledby="perfil-config-pref">
            <h6 id="perfil-config-pref" class="perfil-config-seccion-titulo">
              Preferencias
            </h6>

            <div class="perfil-config-field">
              <label for="perfil-config-idioma">Idioma</label>
              <select
                id="perfil-config-idioma"
                v-model="preferencias.idioma"
                class="perfil-config-select"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </section>

          <section class="perfil-config-seccion" aria-labelledby="perfil-config-seguridad">
            <h6 id="perfil-config-seguridad" class="perfil-config-seccion-titulo">
              Seguridad y cuenta
            </h6>

            <button type="button" class="perfil-config-link-btn" @click="cambiarContrasena">
              <i class="fas fa-key"></i>
              Cambiar contraseña
            </button>

            <button type="button" class="perfil-config-link-btn" @click="solicitarCerrarSesion">
              <i class="fas fa-sign-out-alt"></i>
              Cerrar sesión
            </button>

            <button
              type="button"
              class="perfil-config-link-btn danger"
              @click="solicitarEliminarCuenta"
            >
              <i class="fas fa-trash-alt"></i>
              Eliminar cuenta
            </button>
          </section>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button
            type="button"
            class="perfil-config-btn-primary"
            :disabled="guardando"
            @click="guardarCambios"
          >
            <i class="fas fa-save"></i>
            {{ guardando ? 'Guardando…' : 'Guardar cambios' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
