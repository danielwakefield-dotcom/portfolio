<template>
  <!--container-->
  <div
    id="app"
    data-preload-status="preloading"
    data-nav-status="closed"
    data-heat="teal"
    data-scroll-status="default"
    data-glitch-status="stable"
  >
    <Header />
    <!--<StarField />-->
    <div id="main">
      <nuxt />
    </div>
    <keep-alive>
      <Floor />
    </keep-alive>
    <UiFrame />
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
