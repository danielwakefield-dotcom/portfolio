<template>
  <!--container-->
  <div
    id="app"
    class="light"
    data-preload-status="preloading"
    data-nav-status="closed"
    data-heat="teal"
    data-scroll-status="default"
    data-glitch-status="stable"
  >
    <Header />
    <UiFrame />
    <div id="main">
      <nuxt />
    </div>
    <HamBurger />
    <NavMobile />
    <Preloader />
  </div>
  <!--container-->
</template>
<script>
export default {
  mounted () {
    const app = document.getElementById('app')
    app.setAttribute('data-preload-status', 'preloaded')
  }
}
</script>
