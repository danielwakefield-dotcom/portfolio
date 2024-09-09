<template>
  <div id="hero-model">
    <!-- Canvas element for rendering the 3D model -->
    <canvas id="hero-model-canvas" ref="canvas" :class="{ 'fade-in': modelLoaded }" />
    <div class="hero-model-ui">
      <div>
        <ul>
          <!-- UI elements for controlling the model -->
          <li id="hero-model-ui_explode" @click="toggleExplode">
            <span>Explode</span>
          </li>
          <li id="hero-model-ui_front" @click="rotateToFront">
            <span>Front</span>
          </li>
          <li id="hero-model-ui_back" @click="rotateToBack">
            <span>Back</span>
          </li>
          <li id="hero-model-ui_left" @click="rotateToLeft">
            <span>Left</span>
          </li>
          <li id="hero-model-ui_right" @click="rotateToRight">
            <span>Right</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="hero-model-rotors">
      <ul>
        <li><span>Rotor #01:</span> {{ rotorOne }}</li>
        <li><span>Rotor #02:</span> {{ rotorTwo }}</li>
        <li><span>Rotor #03:</span> {{ rotorThree }}</li>
        <li><span>Rotor Status:</span> {{ rotorStatus ? 'Exploded' : 'Default' }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Three from 'three' // Import Three.js library
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // Import GLTFLoader for loading 3D models
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader' // Import DRACOLoader for loading compressed 3D models
import TWEEN from '@tweenjs/tween.js' // Import Tween.js for animations
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  name: 'ModelheroModel',
  data () {
    return {
      // Three.js elements
      camera: null,
      renderer: null,
      loader: null,
      loader_percent: null,
      ambientLight: null,
      controls: null,

      // Mouse tracking
      mouseX: 0,
      mouseY: 0,
      mouseDistance: null,
      windowCenter: null,

      // rotor data
      rotorOne: null,
      rotorTwo: null,
      rotorThree: null,
      rotorStatus: true,

      // Clock for animations
      clock: null,
      tick: null,
      elapsedTime: null,
      clockStep: null,

      // Model state
      isExploded: false,
      modelLoaded: false,
      originalMaterials: {}, // Store original materials of the model
      initialPositions: {} // Store initial positions of model parts
    }
  },
  mounted () {
    this.init() // Initialize Three.js scene
    this.resizeCanvasToDisplaySize() // Resize canvas to fit display size
    this.getWindowCenter() // Get the center of the window
    this.initClock() // Initialize the animation clock

    // Add event listeners for window resize and mouse move
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeDestroy () {
    // Remove event listeners and cancel the animation frame before destroying the component
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.cancelAnimationFrame(this.clockStep)
    this.clockStep = undefined
  },
  methods: {
    init () {
      /* Initialize Renderer */
      this.renderer = new Three.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: true
      })

      /* Initialize Camera */
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.set(0, 0, 6)

      /* Initialize Scene */
      this.scene = new Three.Scene()
      this.scene.fog = new Three.FogExp2('#0DEADD', 0.14)

      /* Add Grid Helper to the Scene */
      this.gridOne = new Three.GridHelper(8, 30, '#0deadd', '#0deadd')
      this.gridOne.position.y = -1.3
      this.gridOne.scale.set(0.4, 0.4, 0.4)
      // this.scene.add(this.gridOne)

      /* Load 3D Model */
      this.loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('draco/gltf/') // Path to DRACO decoder files
      this.loader.setDRACOLoader(dracoLoader)
      this.loader.load('/models/model-jet-draco.gltf',
        (gltf) => {
          this.model = gltf.scene
          // Set initial position, rotation, and scale of the model
          this.model.position.set(0, 0, 0)
          this.model.rotation.set(Math.PI / 180 * 30, Math.PI / 180 * -30, 0)
          this.model.scale.set(5, 5, 5)

          // Add wireframe and transparency to the model
          this.model.traverse((child) => {
            if (child instanceof Three.Mesh) {
              // Store original position and materials
              child.userData.originalPosition = child.position.clone()
              this.originalMaterials[child.id] = child.material.clone()

              // Set material properties to make it transparent
              child.material.transparent = true
              child.material.opacity = 0 // Set opacity to 0 for full transparency

              // Create and add wireframe
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
          })

          // Center the model pivot point
          const boundingBox = new Three.Box3().setFromObject(this.model)
          boundingBox.getCenter(this.model.position).negate()

          // Add the model to the scene
          this.scene.add(this.model)
          // Set modelLoaded to true to trigger the fade-in effect
          this.modelLoaded = true
          this.toggleExplode()
        },
        (xhr) => {
          // Update loader progress
          this.loader_percent = (xhr.loaded / xhr.total) * 100
        },
        (error) => {
          console.log(error)
        })

      /* Initialize Orbit Controls */
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableZoom = false
      this.controls.update()

      /* Render the Scene */
      this.renderer.render(this.scene, this.camera)
    },
    initClock () {
      this.clock = new Three.Clock()
      this.tick = () => {
        this.elapsedTime = this.clock.getElapsedTime()
        this.scene.rotation.x = this.damp(this.scene.rotation.x, this.mouseY / 3000, 0.1)
        this.scene.rotation.y = this.damp(this.scene.rotation.y, this.mouseDistance / 3000, 0.1)
        if (this.modelLoaded === true) {
          TWEEN.update() // Ensure Tween.js updates on each frame
          // Animate model rotation using Tween.js
          if (window.innerWidth <= 768 && this.model) {
            // this.scene.rotation.y += 0.005
          } else if (window.innerWidth > 768 && this.model) {
            // this.scene.rotation.y += 0.001
            this.model.rotation.z -= 0.003
            // Find the child and rotate it
            this.model.traverse((child) => {
              if (child instanceof Three.Mesh && child.name === 'midspin_Cylinder001_Cylinder003') {
                child.rotation.y -= 0.012
                this.rotorOne = child.rotation.y
              }
              if (child instanceof Three.Mesh && child.name === 'frontspin_Cylinder005_Cylinder008') {
                child.rotation.y -= 0.012
                this.rotorTwo = child.rotation.y / 1.2
              }
              if (child instanceof Three.Mesh && child.name === 'Cylinder006_Cylinder009') {
                child.rotation.y -= 0.012
                this.rotorThree = child.rotation.y / 1.4
              }
            })
          }
        }

        this.renderer.render(this.scene, this.camera)
        // Request the next frame
        this.clockStep = window.requestAnimationFrame(this.tick)
      }
      this.tick() // Start the clock
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
      // Calculate and store the center of the window
      this.windowCenter = window.innerWidth / 2
    },
    resizeCanvasToDisplaySize () {
      const canvas = this.renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== width || canvas.height !== height) {
        // Adjust the size of the renderer and update the camera aspect ratio
        this.renderer.setSize(width * 2, height * 2, false)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.getWindowCenter()
      }
    },
    handleWindowResize () {
      // Handle window resize event
      this.resizeCanvasToDisplaySize()
      this.getWindowCenter()
    },
    handleMouseMove (event) {
      // Handle mouse move event
      this.mouseX = event.clientX
      this.mouseY = event.clientY
      this.mouseDistance = this.mouseX > this.windowCenter
        ? this.mouseX - this.windowCenter
        : this.mouseX - this.windowCenter
    },
    resetControls () {
      if (this.controls) {
        this.controls.reset() // Reset OrbitControls to their initial state
        this.controls.update()
      }
    },
    rotateModel (x, y, z) {
      if (this.model) {
        // Animate model rotation using Tween.js
        new TWEEN.Tween(this.model.rotation)
          .to({ x, y, z }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()
        this.resetControls() // Reset OrbitControls
      }
    },
    rotateToFront () {
      // Rotate model to front view
      this.rotateModel(Math.PI / 180 * 30, Math.PI / 180 * -30, 0)
    },
    rotateToBack () {
      // Rotate model to back view
      this.rotateModel(Math.PI / 180 * 30, Math.PI / 180 * 150, 0)
    },
    rotateToLeft () {
      // Rotate model to left view
      this.rotateModel(0, -Math.PI / 2, 0)
    },
    rotateToRight () {
      // Rotate model to right view
      this.rotateModel(0, Math.PI / 2, 0)
    },
    traverseModel (callback) {
      // Traverse the model and apply callback function to each mesh
      this.model.traverse((child) => {
        if (child instanceof Three.Mesh) {
          callback(child)
        }
      })
    },
    explodeModel () {
      this.rotorStatus = true
      // Offsets for different model parts to create explode effect
      const objects = [
        { name: 'Cylinder_Cylinder006', offset: new Three.Vector3(0, 0, -0.5) },
        { name: 'Cylinder003_Cylinder005', offset: new Three.Vector3(0, 0, 0.17) },
        { name: 'Cylinder006_Cylinder009', offset: new Three.Vector3(0, 0, -0.03) },
        { name: 'backspin_Cylinder007_Cylinder010', offset: new Three.Vector3(0, 0, -0.06) }
      ]

      // Apply explode effect to model parts
      this.traverseModel((child) => {
        const object = objects.find(obj => obj.name === child.name)
        if (object) {
          if (!this.initialPositions[child.name]) {
            this.initialPositions[child.name] = child.position.clone()
          }

          const targetPosition = child.position.clone().add(object.offset)
          new TWEEN.Tween(child.position)
            .to(targetPosition, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
        }
      })

      this.rotateToFront()
      this.resetControls() // Reset OrbitControls
      console.log('exploded')
    },
    resetModel () {
      this.rotorStatus = false
      // Reset model to its initial positions
      this.traverseModel((child) => {
        const initialPosition = this.initialPositions[child.name]
        if (initialPosition) {
          new TWEEN.Tween(child.position)
            .to(initialPosition, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
        }
      })

      this.resetControls() // Reset OrbitControls
      console.log('reset')
    },
    toggleExplode () {
      // Toggle between exploded and normal state
      if (this.isExploded) {
        this.resetModel()
        this.rotorStatus = false
      } else {
        this.rotorStatus = true
        this.explodeModel()
      }
      this.isExploded = !this.isExploded
      this.resetControls() // Reset OrbitControls
    }
  }
}
</script>

<style scoped>
#hero-model {
  display: none;
}

#hero-model-canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-model-ui {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 7rem;
  width: auto;
  height: 100%;
  z-index: 10;
}

.hero-model-ui ul {
  list-style-type: none;
  display: block;
  margin: 0;
  padding: 0;
  text-align: right;
  width: 50px;
  opacity: 0.25;
}

.hero-model-ui li {
  display: block;
  margin: 0 0 0.5rem 0;
  position: relative;
  padding: 0;
  cursor: pointer;
  height: 10px;
  width: 100%;
}

.hero-model-ui li::after {
  background: var(--secondary-alpha);
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  transition: all ease 0.3s;
}

.hero-model-ui li:hover::after {
  width: 100%;
}

.hero-model-ui li span {
  display: none;
}

.hero-model-rotors {
  display: none;
}

.hero-model-rotors ul,
.hero-model-rotors li {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
}

.hero-model-rotors li {
  margin: 0 0 0.5rem 0;
}

.hero-model-rotors li span {
  display: block;
  font-weight: 600;
}

@media only screen and (min-width: 1024px) {
  #hero-model {
    display: block;
    width: 50vw;
    position: absolute;
    height: 100vh;
    top: 0;
    right: 0;
    opacity: 0.5;
  }

  .hero-model-rotors {
    display: block;
    color: var(--secondary-alpha);
    font-size: 10px;
    font-family: 'Consolas', monospace;
    position: absolute;
    bottom: 22vh;
    right: 2vw;
    width: 200px;
    opacity: 0.5;
    z-index: 4;
  }
}

@media only screen and (min-width: 1720px) {
  .hero-model-rotors {
    right: 4vw;
  }
}
</style>
