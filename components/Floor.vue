<template>
  <div class="floor">
    <div class="floor_grid" />
  </div>
</template>

<script>
import * as Three from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default {
  data () {
    return {
      app: null,
      scene: null,
      camera: null,
      renderer: null,
      canvas: null,
      gridGroup: null,
      gridOne: null,
      speed: 0.8,
      animationFrameId: null,
      bloomPass: null,
      filmPass: null,
      composer: null
    }
  },
  mounted () {
    this.initScene()
    this.initGrid()
    this.initRenderer()
    window.addEventListener('resize', this.onWindowResize)
    this.animate()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
    cancelAnimationFrame(this.animationFrameId)
    if (this.renderer) { this.renderer.dispose() }
    if (this.composer) { this.composer.dispose() }
  },
  methods: {
    initScene () {
      this.canvas = this.$el.querySelector('.floor_grid')
      this.scene = new Three.Scene()
      this.camera = new Three.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000)
      this.camera.position.z = 1
    },
    initGrid () {
      this.gridGroup = new Three.Group()

      const fogShader = {
        uniforms: {
          color: { value: new Three.Color('#0DEADD') },
          fogColor: { value: new Three.Color('#000') },
          fogDensity: { value: 0.7 },
          cameraPosition: { value: this.camera.position }
        },
        vertexShader: `
          varying float vFogDepth;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vFogDepth = -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform vec3 fogColor;
          uniform float fogDensity;
          varying float vFogDepth;
          void main() {
            float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
            gl_FragColor = vec4(mix(color, fogColor, fogFactor), 1.0);
          }
        `
      }

      const gridMaterial = new Three.ShaderMaterial(fogShader)
      this.gridOne = new Three.GridHelper(16, 60)
      this.gridOne.material = gridMaterial
      this.gridOne.position.y = -1

      this.gridGroup.add(this.gridOne)
      this.scene.add(this.gridGroup)
    },
    initRenderer () {
      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.canvas.appendChild(this.renderer.domElement)

      this.composer = new EffectComposer(this.renderer)
      this.composer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
      this.composer.addPass(new RenderPass(this.scene, this.camera))

      this.bloomPass = new UnrealBloomPass(new Three.Vector2(this.canvas.clientWidth, this.canvas.clientHeight), 1.5, 0.4, 0.85)
      this.composer.addPass(this.bloomPass)

      this.filmPass = new FilmPass(0.5, 1, 1920, false)
      this.composer.addPass(this.filmPass)
      this.filmPass.renderToScreen = true
    },
    onWindowResize () {
      if (!this.camera || !this.renderer) { return }
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
      this.composer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
      this.bloomPass.resolution.set(this.canvas.clientWidth, this.canvas.clientHeight)
    },
    animate () {
      this.animationFrameId = requestAnimationFrame(this.animate)
      this.composer.render()
    }
  }
}
</script>

<style>
.floor {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}

.floor_grid {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity ease 3s;
  transition-delay: 1.5s;
}

#app[data-preload-status='preloading'] .floor_grid {
  opacity: 0;
}

.floor_grid-controls {
  position: absolute;
  top: 50%;
  left: 4rem;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0;
  border-radius: 0;
  z-index: 1000;
  transform: translateY(-50%);
}

input[type=range][orient=vertical] {
  -webkit-appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 0;
  background: transparent;
  writing-mode: vertical-lr;
  direction: rtl;
  appearance: none;
  width: 1px;
  height: 40vh;
  vertical-align: bottom;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 5px;
  background-color: rgba(13, 234, 221, 1);
  border: none;
  transition: 0.2s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  height: 5px;
  width: 5px;
  background-color: rgba(13, 234, 221, 1);
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 6px rgba(13, 234, 221, 0.1);
}

input[type="range"]:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 8px rgba(13, 234, 221, 0.1);
}

input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 8px rgba(13, 234, 221, 0.1);
}

input[type="range"]::-moz-range-thumb:hover {
  box-shadow: 0 0 0 6px rgba(13, 234, 221, 0.1);
}

input[type="range"]:active::-moz-range-thumb {
  box-shadow: 0 0 0 8px rgba(13, 234, 221, 0.1);
}

input[type="range"]:focus::-moz-range-thumb {
  box-shadow: 0 0 0 8px rgba(13, 234, 221, 0.1);
}

.floor_grid-position {
  position: absolute;
  bottom: calc(10vh - 4rem);
  left: 4rem;
  display: block;
  z-index: 1000;
  opacity: 0.5;
}

.floor_grid-position.sfp-b {
  left: auto;
  right: 4rem;
  text-align: right;
}

.floor_grid-position p {
  color: var(--secondary-alpha);
  font-size: 10px;
  font-family: 'Consolas', monospace;
}

.floor_grid-typer {
  position: absolute;
  top: calc(10vh - 2rem);
  right: 4rem;
  display: block;
  z-index: 1000;
  text-align: right;
  width: 200px;
  color: var(--secondary-alpha);
  opacity: 0.5;
}

.floor_grid-typer span {
  color: var(--secondary-alpha);
}

.floor .vue-typer {
  z-index: 1000;
  color: var(--secondary-alpha);
}

.floor .typed,
.floor .vue-typer .custom.char,
.floor .vue-typer .typed {
  color: var(--secondary-alpha) !important;
  font-size: 10px;
  font-weight: 500;
  font-family: 'Consolas', monospace;
}

.floor .vue-typer .custom.caret {
  width: 0;
  background-color: transparent;
}
</style>
