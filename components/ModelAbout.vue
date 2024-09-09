<template>
  <div class="model-about">
    <canvas id="model-about-canvas" :class="{ 'fade-in': modelLoaded }" />
  </div>
</template>
<script>
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
export default {
  name: 'ModelHead',
  data () {
    return {
      camera: null,
      renderer: null,
      loader: null,
      loader_percent: null,
      ambientLight: null,
      boundingBox: null,
      controls: null,

      // video
      video: null,
      vidTexture: null,
      vidObject: null,

      // mouse
      mouseX: 0,
      mouseY: 0,
      mouseDistance: null,
      windowCenter: null,
      windowCenterReset: null,

      // clock
      clock: null,
      tick: null,
      elapsedTime: null,
      clockStep: null,
      modelLoaded: false
    }
  },
  mounted () {
    this.init()
    this.resizeCanvasToDisplaySize()
    this.getWindowCenter()
    this.initClock()
    // Add event listener for window resize
    window.addEventListener('resize', this.handleWindowResize)
    // detect mouse x position from center
    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
      if (this.mouseX > this.windowCenter) {
        this.mouseDistance = this.mouseX - this.windowCenter
      } else if (this.mouseX < this.windowCenter) {
        this.mouseDistance = 0 - this.windowCenter + this.mouseX
      }
      // console.log(this.mouseDistance)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
    window.cancelAnimationFrame(this.clockStep)
    this.clockStep = undefined
  },
  methods: {
    init () {
    /* Set Renderer & Canvas */
      this.renderer = new Three.WebGLRenderer({
        canvas: document.getElementById('model-about-canvas'),
        antialias: true,
        alpha: true
      })

      /* Camera */
      this.camera = new Three.PerspectiveCamera()
      this.camera.position.set(0, 0, 1.7)

      /* Scene */
      this.scene = new Three.Scene()
      // this.scene.rotation.y = -30 * Math.PI / 180

      // loader
      this.loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('draco/gltf/') // Set the path to the DRACO decoder files
      this.loader.setDRACOLoader(dracoLoader)
      this.loader.load('/models/model-vr-head-draco.gltf',
        (gltf) => {
          this.model = gltf.scene
          this.model.position.x = 0
          this.model.position.y = 0
          this.model.rotation.x = 0
          this.model.scale.set(2.3, 2.3, 2.3)
          // if you want to add your custom material
          this.model.traverse(function (child) {
            if (child instanceof Three.Mesh) {
              // Set material properties to make it transparent
              child.material.transparent = true
              child.material.opacity = 0 // Set opacity to 0 for full transparency
              const wireframeGeometry = new Three.WireframeGeometry(child.geometry)
              const wireframeMaterial = new Three.LineBasicMaterial({
                linewidth: 0.1,
                color: '#0deadd',
                opacity: 1,
                transparent: true
              })
              const wireframe = new Three.LineSegments(wireframeGeometry, wireframeMaterial)
              child.add(wireframe)
            }
          },
          (xhr) => {
            this.loader_percent = (xhr.loaded / xhr.total) * 100
            // console.log(this.loader_percent + '% loaded')
          },
          (error) => {
            console.log(error)
          })

          // center obj pivot point
          const boundingBox = new Three.Box3().setFromObject(this.model)
          boundingBox.getCenter(this.model.position).negate()

          // then directly add the object
          this.scene.add(this.model)
          // Set modelLoaded to true to trigger the fade-in effect
          this.modelLoaded = true
        })

      // lights
      this.ambientLight = new Three.AmbientLight('#000')
      this.scene.add(this.ambientLight)

      /* controls */
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableZoom = false
      this.controls.update()

      // render
      this.renderer.render(this.scene, this.camera)
    },
    initClock () {
      this.clock = new Three.Clock()
      this.tick = () => {
        this.elapsedTime = this.clock.getElapsedTime()
        this.scene.rotation.x = this.damp(this.scene.rotation.x, this.mouseY / 3000, 0.1)
        this.scene.rotation.y = this.damp(this.scene.rotation.y, this.mouseDistance / 3000, 0.1)
        this.renderer.render(this.scene, this.camera)
        this.clockStep = window.requestAnimationFrame(this.tick)
      }
      this.tick()
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(() => resolve(ms === 500), ms))
    },
    dampSpeed () {
      if (Math.abs(this.speed - this.targetSpeed) > 0.01) {
        this.speed = this.damp(this.speed, this.targetSpeed, this.dampingFactor)
        requestAnimationFrame(this.dampSpeed)
      } else {
        this.speed = this.targetSpeed
      }
    },
    /* DAMPING */
    damp (value, target, dampingFactor) {
      return value + (target - value) * dampingFactor
    },
    getWindowCenter () {
      this.windowCenter = window.innerWidth / 2
    },
    resizeCanvasToDisplaySize () {
      const canvas = this.renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== width || canvas.height !== height) {
        // * 2 = double resolution - you must pass false here or three.js sadly fights the browser
        this.renderer.setSize(width * 2, height * 2, false)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.getWindowCenter()
      }
    },
    handleWindowResize () {
      this.resizeCanvasToDisplaySize()
      this.getWindowCenter()
    }
  }
}
</script>
<style scoped>
.model-about {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  opacity: 0.5;
}

#model-about-canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 1024px) {
  .model-about {
    width: 33.33vw;
    opacity: 1;
  }
}
</style>
