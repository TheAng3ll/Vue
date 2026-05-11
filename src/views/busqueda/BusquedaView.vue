<script setup>
import { useRouter } from 'vue-router';
import '../home/home.css';
import GeneradorIngredientes from '../../components/generador/GeneradorIngredientes.vue';
import FooterComponent from '../../components/footer/FooterComponent.vue';

const router = useRouter();

function volverInicio() {
  router.push('/');
}
</script>

<template>
  <div class="home-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand brand-title" href="#" @click.prevent="volverInicio">
          <strong class="titulo">Chefsito</strong>
        </a>
        <div class="button-group">
          <button class="btn btn-outline-secondary my-2 my-sm-0" type="button" @click="volverInicio">
            <i class="fas fa-home"></i> Inicio
          </button>
        </div>
      </div>
    </nav>

    <div class="main-content main-content--busqueda">
      <GeneradorIngredientes :mostrar-combos="true" />
    </div>

    <FooterComponent />
  </div>
</template>
