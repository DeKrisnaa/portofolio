import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import { reveal, spotlight } from './directives'

import Home from './pages/Home.vue'

/* the site is one long page now, so the only real route is "/" and the
   sections are anchors. These keep old bookmarks landing in the right spot. */
const legacyAnchors = {
  skills: '#skills',
  projects: '#projects',
  about: '#about',
  contact: '#contact'
}

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => ({ path: '/', hash: legacyAnchors[to.params.pathMatch[0]] ?? '' })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

const app = createApp(App)

app.directive('reveal', reveal)
app.directive('spotlight', spotlight)

app.use(router)
app.mount('#app')