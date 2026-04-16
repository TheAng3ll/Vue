<script setup>
import '../login/login.css'
import './registro.css'
import { useRouter } from 'vue-router'

const router = useRouter()

function goLogin() {
  router.push('/login')
}

function onSubmit() {
  router.push('/login')
}
</script>

<template>
  <div class="page-login">
    <header class="login-header">
      <router-link to="/" class="login-header__brand">Chefsito</router-link>
      <router-link to="/" class="login-header__back">← Volver al inicio</router-link>
    </header>

    <main class="login-main">
      <div class="login-card login-card--wide">
        <h1 class="login-card__title">Crea tu cuenta</h1>
        <p class="login-card__lead">
          Unos datos básicos y listo. Sin prisas: aquí importa que te sientas cómodo desde el primer paso.
        </p>

        <form class="login-form" @submit.prevent="onSubmit">
          <div class="login-field">
            <label for="reg-nombre">Nombre o apodo</label>
            <input
              id="reg-nombre"
              class="login-input"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Cómo te gusta que te llamemos"
            >
          </div>

          <div class="login-field">
            <label for="reg-email">Correo electrónico</label>
            <input
              id="reg-email"
              class="login-input"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="tu@correo.com"
            >
          </div>

          <div class="login-field">
            <label for="reg-password">Contraseña</label>
            <input
              id="reg-password"
              class="login-input"
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Mínimo 8 caracteres"
            >
          </div>

          <div class="login-field">
            <label for="reg-password-confirm">Confirmar contraseña</label>
            <input
              id="reg-password-confirm"
              class="login-input"
              type="password"
              name="password_confirm"
              autocomplete="new-password"
              placeholder="Repite la contraseña"
            >
          </div>

          <label class="login-check login-check--terms">
            <input id="reg-terms" class="login-check-input" type="checkbox" name="terms" required>
            <span>
              Acepto los
              <a href="#!" @click.prevent.stop> términos </a>
              y la
              <a href="#!" @click.prevent.stop> privacidad </a>
              de Chefsito.
            </span>
          </label>

          <button type="submit" class="login-submit">Crear mi cuenta</button>
        </form>

        <p class="login-divider" role="presentation"><span>O regístrate con</span></p>

        <div class="login-social" aria-label="Registro con redes">
          <button type="button" class="login-social__btn" aria-label="Continuar con Facebook">f</button>
          <button type="button" class="login-social__btn" aria-label="Continuar con Google">G</button>
          <button type="button" class="login-social__btn" aria-label="Continuar con X">X</button>
        </div>

        <p class="login-footer-text">¿Ya tienes cuenta?</p>
        <p class="login-footer-text">
          <a href="#" @click.prevent="goLogin">Iniciar sesión</a>
          — te llevo al acceso en un clic.
        </p>
      </div>
    </main>
  </div>
</template>
