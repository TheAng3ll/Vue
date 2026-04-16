<script setup>
import './login.css'
import { useRouter } from 'vue-router'

const router = useRouter()

function goRegistrar() {
  router.push('/registrar')
}

function onSubmit() {
  router.push('/')
}
</script>

<template>
  <div class="page-login">
    <header class="login-header">
      <router-link to="/" class="login-header__brand">Chefsito</router-link>
      <router-link to="/" class="login-header__back">← Volver al inicio</router-link>
    </header>

    <main class="login-main">
      <div class="login-card">
        <h1 class="login-card__title">Bienvenido de nuevo</h1>
        <p class="login-card__lead">
          Entra con calma. Tus datos están en un espacio sencillo y claro, como en casa.
        </p>

        <form class="login-form" @submit.prevent="onSubmit">
          <div class="login-field">
            <label for="login-email">Correo electrónico</label>
            <input
              id="login-email"
              class="login-input"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="tu@correo.com"
            >
          </div>

          <div class="login-field">
            <label for="login-password">Contraseña</label>
            <input
              id="login-password"
              class="login-input"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="••••••••"
            >
          </div>

          <div class="login-row">
            <label class="login-check">
              <input id="login-remember" class="login-check-input" type="checkbox" name="remember" checked>
              Recordarme en este equipo
            </label>
            <a class="login-forgot" href="#!">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="login-submit">Entrar</button>
        </form>

        <p class="login-divider" role="presentation"><span>O continúa con</span></p>

        <div class="login-social" aria-label="Inicio de sesión social">
          <button type="button" class="login-social__btn" aria-label="Continuar con Facebook">f</button>
          <button type="button" class="login-social__btn" aria-label="Continuar con Google">G</button>
          <button type="button" class="login-social__btn" aria-label="Continuar con X">X</button>
        </div>

        <p class="login-footer-text">¿Aún no tienes cuenta?</p>
        <p class="login-footer-text">
          <a href="#" @click.prevent="goRegistrar">Crear cuenta</a>
          — es rápido y sin complicaciones.
        </p>
      </div>
    </main>
  </div>
</template>
