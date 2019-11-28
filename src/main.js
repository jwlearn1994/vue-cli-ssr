import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import {
  createRouter
} from './router'
import {
  createStore
} from './store'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {}
} = {}) {
  const router = createRouter()
  const store = createStore()


  await beforeApp({
    router,
    store,

  })

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  const result = {
    app,
    router,
    store,

  }

  await afterApp(result)

  return result
}