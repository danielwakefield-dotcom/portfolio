<template>
  <div>
    <section class="hero hero-wide">
      <div class="hero_ctr ctr">
        <div class="hero_excerpt">
          <div>
            <h1>
              <span>
                2024
              </span>
              <span>
                Collection
              </span>
            </h1>
            <ul class="hero-portfolio">
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss6.jpg" alt="Portfolio Item">
                  <a href="https://aquercia.co.uk/" target="_blank">
                    <div>
                      <h2>
                        <span>Aquercia</span>
                      </h2>
                      <h3>Wordpress Web Development</h3>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss4.jpg" alt="Portfolio Item">
                  <a href="https://www.cld-systems.com/" target="_blank">
                    <div>
                      <h2>
                        <span>CLD Systems</span>
                      </h2>
                      <h3>Wordpress Web Development</h3>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss3.jpg" alt="Portfolio Item">
                  <a href="https://youngstart.co.uk/" target="_blank">
                    <div>
                      <h2>
                        <span>Young Start</span>
                      </h2>
                      <h3>WooCommerce Development</h3>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss1.jpg" alt="Portfolio Item">
                  <a href="https://www.extramiledigital.com/" target="_blank">
                    <div>
                      <h2>
                        <span>Extramile Digital</span>
                      </h2>
                      <h3>Wordpress Web Development</h3>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss5.jpg" alt="Portfolio Item">
                  <a href="https://bluskyltd.com/" target="_blank">
                    <div>
                      <h2>
                        <span>Blue Sky UK</span>
                      </h2>
                      <h3>WooCommerce Development</h3>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <span class="corner tl" />
                <span class="corner tr" />
                <span class="corner bl" />
                <span class="corner br" />
                <div>
                  <img src="/images/ss2.jpg" alt="Portfolio Item 2">
                  <a href="https://www.amalgamet.co.uk/" target="_blank">
                    <div>
                      <h2>
                        <span>Amalgamet</span>
                      </h2>
                      <h3>Wordpress Web Development</h3>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <nuxt-link to="/portfolio/" class="button">
              <span>
                Discover More
              </span>
            </nuxt-link>
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
  data () {
    return {
      activeIndex: 0, // Index of the currently active list item
      intervalId: null // Interval ID for cleanup
    }
  },
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
  },
  mounted () {
    this.startLoop()
  },
  beforeDestroy () {
    this.stopLoop()
  },
  methods: {
    startLoop () {
      // Get all list items using querySelectorAll on the component's root element
      const listItems = this.$el.querySelectorAll('li')
      if (listItems.length === 0) { return } // Ensure there are list items

      // Start the interval loop
      this.intervalId = setInterval(() => {
        // Remove "active" class from all items
        listItems.forEach(item => item.classList.remove('active'))

        // Add "active" class to the current index item
        listItems[this.activeIndex].classList.add('active')

        // Move to the next item, wrap around if at the end
        this.activeIndex = (this.activeIndex + 1) % listItems.length
      }, 3000) // 3 seconds interval
    },
    stopLoop () {
      // Clear the interval to stop the loop
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  }
}
</script>
