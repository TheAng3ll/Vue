<script setup>
	import './registro.css';
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['singin']);
  function registrarBTN()
  {
    emit('registar');
  }
</script>

<template id="login-inicion">
	<div class="login-contenedor">
		<form class="form-login">
      <br>
  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4" >
    <input type="email" id="form2Example1" class="form-control"/>
    <label class="form-label" for="form2Example1">Nombre</label>
  </div>

  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4" >
    <input type="email" id="form2Example1" class="form-control"/>
    <label class="form-label" for="form2Example1">Correo</label>
  </div>

  <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Contraseña</label>
  </div>

    <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Confirma contraseña</label>
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Recordar contraseña </label>
      </div>
    </div>
  </div>

  <div style=" width:500px; margin:0 auto;">
  <!-- Submit button -->
  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4" @click="registrarBTN" style=" width:500px;">Registrar</button>
  </div>

  <!-- Register buttons -->
  <div class="text-center">
    <p><a href="#!">Tengo una cuenta</a></p>
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
</template>