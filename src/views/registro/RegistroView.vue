<script setup>
import { ref, computed } from 'vue';
import './registro.css';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const nombre = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const aceptaTerminos = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

// Computed validation
const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value || confirmPassword.value === '';
});

const isFormValid = computed(() => {
  return nombre.value &&
         email.value &&
         password.value &&
         confirmPassword.value &&
         passwordsMatch.value &&
         aceptaTerminos.value;
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

function btnTengo() {
  router.push('/login').then(() => {
    window.location.reload();
  });
}

function goToHome() {
  router.push('/').then(() => {
    window.location.reload();
  });
}

async function btnRegistrar() {
  if (!isFormValid.value) {
    if (!passwordsMatch.value) {
      alert('Las contraseñas no coinciden');
    } else if (!aceptaTerminos.value) {
      alert('Debes aceptar los términos y condiciones');
    } else {
      alert('Por favor completa todos los campos');
    }
    return;
  }

  isLoading.value = true;

  // Simular llamada al backend
  await new Promise(resolve => setTimeout(resolve, 1500));

  isLoading.value = false;
  alert('¡Cuenta creada exitosamente!');
  router.push('/home').then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <div class="auth-page">
    <!-- Navbar simple -->
    <nav class="auth-navbar">
      <a href="#" @click.prevent="goToHome" class="brand-link">
        <i class="fas fa-utensils"></i>
        <strong>Chefsito</strong>
      </a>
    </nav>

    <!-- Contenedor principal -->
    <div class="auth-container">
      <div class="auth-card register-card">
        <!-- Header -->
        <div class="auth-header">
          <div class="auth-icon register">
            <i class="fas fa-user-plus"></i>
          </div>
          <h2>¡Crea tu cuenta!</h2>
          <p>Únete a nuestra comunidad de cocina</p>
        </div>

        <!-- Formulario -->
        <form class="auth-form" @submit.prevent="btnRegistrar">
          <!-- Nombre input -->
          <div class="form-field">
            <label for="nombre">Nombre completo</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input
                type="text"
                id="nombre"
                v-model="nombre"
                class="form-input"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <!-- Email input -->
          <div class="form-field">
            <label for="email">Correo electrónico</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope input-icon"></i>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-input"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <!-- Password input -->
          <div class="form-field">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-input"
                placeholder="Mínimo 6 caracteres"
                minlength="6"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="togglePassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <!-- Password strength indicator -->
            <div class="password-strength" v-if="password">
              <div class="strength-bar">
                <div
                  class="strength-fill"
                  :class="{
                    'weak': password.length < 6,
                    'medium': password.length >= 6 && password.length < 10,
                    'strong': password.length >= 10
                  }"
                ></div>
              </div>
              <span class="strength-text">
                {{ password.length < 6 ? 'Débil' : password.length < 10 ? 'Media' : 'Fuerte' }}
              </span>
            </div>
          </div>

          <!-- Confirm Password input -->
          <div class="form-field">
            <label for="confirmPassword">Confirmar contraseña</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                class="form-input"
                :class="{ 'error': !passwordsMatch && confirmPassword }"
                placeholder="Repite tu contraseña"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="toggleConfirmPassword"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span class="error-message" v-if="!passwordsMatch && confirmPassword">
              <i class="fas fa-exclamation-circle"></i> Las contraseñas no coinciden
            </span>
          </div>

          <!-- Términos y condiciones -->
          <div class="form-field terms-group">
            <label class="checkbox-wrapper terms">
              <input type="checkbox" v-model="aceptaTerminos" />
              <span class="checkmark"></span>
              <span class="checkbox-label">
                Acepto los <a href="#" class="terms-link">términos y condiciones</a>
                y la <a href="#" class="terms-link">política de privacidad</a>
              </span>
            </label>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="btn btn-auth"
            :disabled="isLoading || !isFormValid"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Creando cuenta...
            </span>
            <span v-else>
              <i class="fas fa-user-plus"></i> Crear Cuenta
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="auth-divider">
          <span>o regístrate con</span>
        </div>

        <!-- Social login -->
        <div class="social-login">
          <button type="button" class="btn-social google">
            <i class="fab fa-google"></i>
          </button>
          <button type="button" class="btn-social facebook">
            <i class="fab fa-facebook-f"></i>
          </button>
          <button type="button" class="btn-social twitter">
            <i class="fab fa-twitter"></i>
          </button>
          <button type="button" class="btn-social github">
            <i class="fab fa-github"></i>
          </button>
        </div>

        <!-- Login link -->
        <div class="auth-footer">
          <p>¿Ya tienes una cuenta?</p>
          <a href="#" @click.prevent="btnTengo" class="login-link">
            <i class="fas fa-sign-in-alt"></i> Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
