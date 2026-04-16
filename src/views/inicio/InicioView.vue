<script setup>
import { ref, onMounted } from 'vue'
import './inicio.css'
import omelet from '@/assets/omelet.png'
import semola from '@/assets/semola.png'
import tostada from '@/assets/tostada.png'
import { useRouter } from 'vue-router'

const router = useRouter()

function btnLogin() {
  router.push('/login')
}

function btnSing() {
  router.push('/registrar')
}

const slideIndex = ref(1)

function plusSlides(n) {
  slideIndex.value += n
  showSlides(slideIndex.value)
}

function currentSlide(n) {
  slideIndex.value = n
  showSlides(slideIndex.value)
}

function showSlides(n) {
  const slides = document.getElementsByClassName('mySlides')
  const dots = document.getElementsByClassName('dot')

  if (slides.length === 0) {
    return
  }

  if (n > slides.length) {
    slideIndex.value = 1
  }
  if (n < 1) {
    slideIndex.value = slides.length
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
    slides[i].style.opacity = '0'
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active')
  }

  slides[slideIndex.value - 1].style.display = 'block'
  slides[slideIndex.value - 1].style.opacity = '1'
  const activeDot = dots[slideIndex.value - 1]
  if (activeDot) {
    activeDot.classList.add('active')
  }
}

onMounted(() => {
  showSlides(slideIndex.value)

  setInterval(() => {
    plusSlides(1)
  }, 15000)
})
</script>

<template>
  <div class="page-inicio">
    <nav class="navbar navbar-expand-lg nav-inicio justify-content-between" aria-label="Principal">
      <a class="navbar-brand brand-title" href="#"><strong class="titulo">Chefsito</strong></a>
      <div class="button-group">
        <button class="btn btn-nav btn-nav--ghost my-2 my-sm-0" type="button" @click="btnLogin">Iniciar sesión</button>
        <button id="btn-r" class="btn btn-nav btn-nav--fill my-2 my-sm-0" type="button" @click="btnSing">Crear cuenta</button>
      </div>
    </nav>

    <section class="hero-slider" aria-label="Recetas destacadas">
      <div class="slideshow-container">
        <div class="mySlides fade">
          <img class="slide-img" :src="omelet" alt="Omelette campestre">
          <div class="slide-scrim" aria-hidden="true"></div>
          <div class="slide-caption">
            <h2 class="slide-title">Omelette campestre</h2>
            <p class="slide-desc">
              A la hora del desayuno, una receta fácil siempre es bienvenida; en las mañanas queremos algo rápido para empezar el día. Un omelette campestre es una gran opción y se ha hecho parte de la comida mexicana.
            </p>
          </div>
        </div>

        <div class="mySlides fade">
          <img class="slide-img" :src="semola" alt="Sémola con queso cheddar y huevo frito">
          <div class="slide-scrim" aria-hidden="true"></div>
          <div class="slide-caption">
            <h2 class="slide-title">Sémola con queso cheddar y ajo, y huevo frito</h2>
            <p class="slide-desc">
              Platillo reconfortante: la sémola cremosa con queso cheddar y un toque de ajo combina con el huevo frito para un desayuno delicioso y nutritivo.
            </p>
          </div>
        </div>

        <div class="mySlides fade">
          <img class="slide-img" :src="tostada" alt="Tostada con aguacate y huevo escalfado">
          <div class="slide-scrim" aria-hidden="true"></div>
          <div class="slide-caption">
            <h2 class="slide-title">Tostada con aguacate y huevo escalfado</h2>
            <p class="slide-desc">
              Opción ligera y fresca: la palta y el huevo escalfado sobre tostada crujiente ofrecen un desayuno equilibrado y lleno de sabor.
            </p>
          </div>
        </div>

        <button type="button" class="slider-nav slider-nav--prev" aria-label="Anterior" @click="plusSlides(-1)">
          <span class="slider-nav__icon" aria-hidden="true">‹</span>
        </button>
        <button type="button" class="slider-nav slider-nav--next" aria-label="Siguiente" @click="plusSlides(1)">
          <span class="slider-nav__icon" aria-hidden="true">›</span>
        </button>

        <div class="slider-dots" role="tablist" aria-label="Seleccionar slide">
          <button type="button" class="dot" aria-label="Slide 1" @click="currentSlide(1)"></button>
          <button type="button" class="dot" aria-label="Slide 2" @click="currentSlide(2)"></button>
          <button type="button" class="dot" aria-label="Slide 3" @click="currentSlide(3)"></button>
        </div>
      </div>
    </section>

    <section class="inicio-welcome" aria-labelledby="inicio-bienvenida-titulo">
      <p class="inicio-welcome__eyebrow">Recetas con calma</p>
      <h2 id="inicio-bienvenida-titulo" class="inicio-welcome__title">Un espacio tranquilo para inspirarte en la cocina</h2>
      <p class="inicio-welcome__text">
        Tonos suaves, pasos claros y el gusto de lo casero. Chefsito nace para que cocinar se sienta cercano, sin prisa y con confianza.
      </p>
    </section>

    <footer id="footer" class="footer-inicio">
      <div class="footer-inicio__inner">
        <p class="footer-inicio__brand">Chefsito</p>
        <p class="footer-inicio__tagline">
          Proyecto en Vue para aprender con calma.
        </p>
        <nav class="footer-inicio__nav" aria-label="Enlaces del pie">
          <a href="#!">Precios</a>
          <span class="footer-inicio__sep" aria-hidden="true">·</span>
          <a href="#!">Ayuda</a>
          <span class="footer-inicio__sep" aria-hidden="true">·</span>
          <a href="#!">Contacto</a>
        </nav>
        <p class="footer-inicio__copy">
          © 2026 Chefsito — <a href="https://mdbootstrap.com/">99mas1.com</a>
        </p>
      </div>
    </footer>
  </div>
</template>
