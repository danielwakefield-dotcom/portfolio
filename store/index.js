// /store/index.js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      manager: null,
      mousePos: {
        x: 0,
        y: 0,
        distance: 0,
        center: 0
      },
      speed: 2 // Initial speed
    },
    mutations: {
      SET_MOUSE_POS (state, mousePos) {
        state.mousePos = mousePos
      },
      SET_SPEED (state, speed) {
        state.speed = speed
      }
    }
  })
}

export default createStore
