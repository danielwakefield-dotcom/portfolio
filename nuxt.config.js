import axios from 'axios'

export default {
  // Use when creating dist in a sub folder
  router: {
    base: '/'
    // base: '/ultra/' //
  },
  /* Set Api Base URL */
  // env: {
  // baseUrl: 'https://admin.danielwakefield.co.uk/wp-json/wp/v2/posts'
  // baseUrl: process.env.BASE_URL || 'https://admin.danielwakefield.co.uk/wp-json/wp/v2/posts'
  // },
  target: 'static',
  head: {
    title: 'ultr4-2022',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    webfontloader: {
      google: {
        families: ['Montserrat:400,500,600,800', 'Open+Sans:300,400,800', 'Michroma:400']
      }
    },
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Michroma&display=swap'
      }
    ]
  },
  css: [
    '~assets/css/main.css',
    '~assets/css/typography.css',
    '~assets/css/hero.css'
  ],
  plugins: [
    // eslint-disable-next-line no-use-before-define
    { src: '@/assets/js/main.js', ssr: false },
    { src: '~/plugins/vue-typer.js', mode: 'client' }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/axios'
  ],
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
    // removes on page css - need to add this to docs
    extractCSS: true,

    // minify build
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
    // post css
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-import': {},
        'postcss-url': {},
        autoprefixer: {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },
    transpile: [
      'GLTFLoader.js',
      'GlitchPass',
      'DRACOLoader',
      'OBJLoader.js',
      'MTLLoader.js',
      'OrbitControls.js',
      'TransformControls.js',
      'EffectComposer',
      'UnrealBloomPass',
      'FilmPass',
      'RenderPass',
      'ShaderPass',
      'TextureLoader',
      'SVGLoader',
      'RGBELoader',
      'ShaderMaterial',
      'PlaneGeometry',
      'Mesh',
      'Vector2',
      'GUI',
      'Raycaster'
    ],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      })
    }
  }
}
