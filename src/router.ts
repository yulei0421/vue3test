
import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/About',
    component:About
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
export default router
