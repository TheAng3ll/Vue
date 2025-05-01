<script setup>
  import {ref} from 'vue';
	import './login.css';
  import registro from '../registro_component/registro.vue'

  const showR = ref(false);

  function showregistrar()
  {
    showR.value = true;
  }
</script>

<template id="login-inicion">
	<div class="login-contenedor" v-if="!showR">
		<form class="form-login">
      <br>

  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4" >
    <input type="email" id="form2Example1" class="form-control"/>
    <label class="form-label" for="form2Example1">Nombre</label>
  </div>

  <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Contraseña</label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4" style="width:500px; margin-left:20px;">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Recordar contraseña </label>
      </div>
    </div>

    <div class="col-auto" >
      <!-- Simple link -->
      <a href="#!">¿Olvidaste la contrseña?</a>
    </div>
  </div>

  <div style=" width:500px; margin:0 auto;">
  <!-- Submit button -->
  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4" style=" width:500px; margin:0 auto;">Entrar</button>
  </div>

  <!-- Register buttons -->
  <div class="text-center">
    <p>No tienes cuenta? <a href="#!">Register</a></p>
    <p> o registrate: <a href="" @click.prevent="showregistrar">Register</a></p>
    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>
	</div>
  <registro v-if="showR"/>
</template>