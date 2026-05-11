<script setup>
import { ref } from 'vue';
import './login.css';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function btnSing() {
  router.push('/registrar').then(() => {
    window.location.reload();
  });
}

async function btnEnter() {
  if (!email.value || !password.value) {
    alert('Por favor ingresa tu correo y contraseña');
    return;
  }

  isLoading.value = true;

  // Simular llamada al backend
  await new Promise(resolve => setTimeout(resolve, 1000));

  isLoading.value = false;
  router.push('/home').then(() => {
    window.location.reload();
  });
}

function goToHome() {
  router.push('/').then(() => {
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
      <div class="auth-card">
        <!-- Header -->
        <div class="auth-header">
          <div class="auth-icon">
            <i class="fas fa-user-circle"></i>
          </div>
          <h2>¡Bienvenido de vuelta!</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <!-- Formulario -->
        <form class="auth-form" @submit.prevent="btnEnter">
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
                placeholder="Tu contraseña"
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
          </div>

          <!-- Opciones -->
          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              <span class="checkbox-label">Recordarme</span>
            </label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="btn btn-auth"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Entrando...
            </span>
            <span v-else>
              <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="auth-divider">
          <span>o continúa con</span>
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

        <!-- Register link -->
        <div class="auth-footer">
          <p>¿No tienes una cuenta?</p>
          <a href="#" @click.prevent="btnSing" class="register-link">
            <i class="fas fa-user-plus"></i> Crear cuenta
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
