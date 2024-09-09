<template>
  <div class="preloader">
    <div>
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 1298 1298"
        style="enable-background: new 0 0 1298 1298;"
        xml:space="preserve"
      >
        <polygon
          points="571.9,965.3 409,965.3 650.8,546.4 892.7,965.3 729.7,965.3 806.2,1098.1 1167.6,1098.1 649.1,199.9 130.4,1098.1 495.4,1098.1"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Preloader',
  data () {
    return {
      preloader: null,
      app: null
    }
  },
  mounted () {
    this.preload()
    setTimeout(() => {
      this.discharge()
    }, 500)
  },
  methods: {
    preload () {
      this.preloader = document.querySelector('.preloader')
      this.app = document.querySelector('#app')
    },
    discharge () {
      this.preloader.style.opacity = 0
      setTimeout(() => {
        this.preloader.style.display = 'none'
      }, 500)
    }
  }
}
</script>
<style>
.preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 100000;
  transition: opacity ease 0.5s;
}

.preloader::before {
  background: #000;
  content: "";
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: -1;
  transition: opacity ease 1s;
}

.preloader svg {
  display: block;
  height: 38px;
  width: auto;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.25; }
  100% { opacity: 1; }
}

.preloader svg polygon {
  fill: var(--secondary);
  animation: blink 1s infinite;
}
</style>
