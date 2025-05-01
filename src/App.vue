22<script setup>
import { ref, onMounted } from 'vue'
import inicio from './components/inicio_component/inicio.vue'
import login from './components/login_component/login.vue'
import registro from './components/registro_component/registro.vue'
const showLogin = ref(false);

function loginBtn()
{
  showLogin.value = true;
}

</script>

<template>
<inicio v-if="!showLogin" @login="loginBtn"/>
  <login v-if="showLogin"/> 
</template>

