<template>
  <div class="scrollable">
    <section class="hero hero-wide">
      <div class="hero_ctr ctr">
        <div class="hero_excerpt">
          <div>
            <h1>
              <span>
                Core
              </span>
              <span>
                Services
              </span>
            </h1>
            <ul class="hero-services">
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/icons/three.svg" alt="Three.js">
                  <span class="subtitle">
                    Three<span>.js</span>
                  </span>
                  <p>Three.js enables the creation of interactive 3D experiences, allowing for more complex visualizations and interactive experiences.</p>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/icons/vue.svg" alt="Vue.js">
                  <span class="subtitle">
                    Vue<span>.js</span>
                  </span>
                  <p>Vue.js is a JavaScript framework for building software and web app interfaces using modern development techniques.</p>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/icons/wordpress.svg" alt="WordPress">
                  <span class="subtitle">
                    WordPress
                  </span>
                  <p>WordPress is the most popular content management system accounting for over 80% of all websites live on the internet today.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hero_model">
        <ModelAbout />
      </div>
    </section>
  </div>
</template>
<script>
export default {
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
