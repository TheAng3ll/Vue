<script setup>
import './inicion.css';
import omelet from '../../assets/omelet.png';
import semola from '../../assets/semola.png';
import tostada from '../../assets/tostada.png';

import { ref, onMounted } from 'vue';

const slideIndex = ref(1);

function plusSlides(n) {
  slideIndex.value += n;
  showSlides(slideIndex.value);
}

function currentSlide(n) {
  slideIndex.value = n;
  showSlides(slideIndex.value);
}

function showSlides(n) {
  console.log("Entro a la funcion show..");

  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (slides.length === 0) {
    console.warn('No hay slides disponibles todavía.');
    return;
  }

  if (n > slides.length) { slideIndex.value = 1; }
  if (n < 1) { slideIndex.value = slides.length; }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
    slides[i].style.opacity = "0";  
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex.value - 1].style.display = "block";
  slides[slideIndex.value - 1].style.opacity = "1"; // <<--- Agregado
  dots[slideIndex.value - 1].className += " active";
}

onMounted(() => {
  showSlides(slideIndex.value);

  // Autoplay cada 3 segundos
  setInterval(() => {
    plusSlides(1); 
  }, 15000);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    <a class="navbar-brand brand-title" href="#"><strong class="titulo">Chefsito</strong></a>
    <div class="button-group">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
      <button id="btn-r" class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign in</button>
    </div>
  </nav>
  <div class="titulo-slider">
    <h5>Nuevas recetas</h5>
  </div>
  <!-- Slideshow container -->
  <div class="slideshow-container" >

    <!-- Full-width images with number and caption text -->
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img :src="omelet" style="width:100%">
      <div class="short-descripcion">
        <p>A la hora del desayuno, una receta fácil siempre es bienvenida; pues en las mañanas queremos hacer las cosas rápidas para iniciar nuestras actividades. Por lo que, un omelette campestre es una gran opción y se ha hecho parte de la comida mexicana. </p>
      </div> 
      <div class="text"><h3>Omelette campestre</h3></div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 3</div>
      <img :src="semola" style="width:100%">
      <div class="short-descripcion">
        <p> Un platillo reconfortante ideal para comenzar el día; la sémola cremosa con queso cheddar y un toque de ajo combina a la perfección con el sabor del huevo frito, creando una opción deliciosa y nutritiva para el desayuno.</p>
      </div> 
      <div class="text"><h3>Sémola con queso cheddar y ajo más huevo frito</h3></div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img :src="tostada" style="width:100%">
      <div class="short-descripcion">
        <p>Una opción ligera y fresca para empezar la mañana; la cremosidad de la palta y la suavidad del huevo escalfado sobre una tostada crujiente ofrecen una combinación deliciosa y balanceada para el desayuno.</p>
      </div>
      <div class="text"><h3>Tostada con aguacate y huevo escalfado</h3></div>
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" @click="plusSlides(-1)">&#10094;</a>
    <a class="next" @click="plusSlides(1)">&#10095;</a>
</div>
<br>
  <!-- The dots/circles -->
  <div class="div-dot" style="text-align:center">
    <span class="dot" @click="currentSlide(1)"></span>
    <span class="dot" @click="currentSlide(2)"></span>
    <span class="dot" @click="currentSlide(3)"></span>
  </div> 

<!-- Footer -->
<footer class="text-center text-lg-start bg-body-tertiary text-muted">
  <!-- Section: Social media -->
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

    <!-- Right -->
    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->

  <!-- Section: Links  -->
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Chefsito
          </h6>
          <p>
Este es un proyecto en Vue donde busco aplicar mis conocimientos y mejorar mi entendimiento
          </p>
        </div>

        <!-- Grid column -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            info@example.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">Chefsito.99mas1.com</a>
  </div>
  <!-- Copyright -->
</footer>
<!-- Footer -->

</template> 
