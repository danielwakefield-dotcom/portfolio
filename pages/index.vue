<template>
  <div>
    <section class="hero">
      <div class="hero_ctr ctr">
        <div class="hero_excerpt">
          <div>
            <h1>
              <span>
                <vue-typer
                  :text="['Web 3D', 'AR & VR', 'Creative']"
                  :repeat="Infinity"
                  :shuffle="false"
                  :pre-erase-delay="10000"
                  :erase-delay="100"
                  initial-action="erasing"
                  erase-style="backspace"
                  :erase-on-complete="false"
                  caret-animation="blink"
                />
              </span>
              <span>
                <vue-typer
                  :text="['Interface', 'Digital', 'Website', 'Software', 'Marketing']"
                  :repeat="Infinity"
                  :shuffle="false"
                  :pre-erase-delay="5000"
                  :erase-delay="100"
                  initial-action="erasing"
                  erase-style="backspace"
                  :erase-on-complete="false"
                  caret-animation="blink"
                />
              </span>
              <span>
                <vue-typer
                  :text="['Developer', 'Designer']"
                  :repeat="Infinity"
                  :shuffle="false"
                  :pre-erase-delay="15000"
                  :erase-delay="100"
                  initial-action="erasing"
                  erase-style="backspace"
                  :erase-on-complete="false"
                  caret-animation="blink"
                />
              </span>
            </h1>
            <p>Welcome to Daniel Wakefield's portfolio. I specialize in creating immersive web experiences using Three.js/WebGL, dynamic websites with WordPress, and powerful applications with Vue.js/Nuxt.js.<br> Explore my work to see how I can bring your ideas to life.</p>
            <ul class="hero-icons">
              <li>
                <img src="/icons/vue.svg" alt="Vue.js">
              </li>
              <li>
                <img src="/icons/nuxt.svg" alt="Vue.js">
              </li>
              <li>
                <img src="/icons/wordpress.svg" alt="Vue.js">
              </li>
              <li>
                <img src="/icons/woo.svg" alt="Vue.js">
              </li>
              <li>
                <img src="/icons/three.svg" alt="Vue.js">
              </li>
            </ul>
            <nuxt-link to="/portfolio/" class="button">
              <span>
                See My Portfolio
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="hero_model">
        <ModelHome />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'default',
  head () {
    return {
      // Meta Data
      title: 'Test Title',
      meta: [
        { name: 'google', content: 'notranslate' },
        { hid: 'og:title', name: 'og:title', content: 'This is Ultra' },
        {
          hid: 'description',
          name: 'description',
          content: 'Web Designer & Website Developer Cheshire | ultr4.co.uk'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Web Designer & Website Developer Cheshire | ultr4.co.uk'
        },
        {
          name: 'keywords',
          content:
            'web designer, web developer, cheshire, front end, javascript, php, WordPress'
        }
      ]
    }
  }
}
</script>
