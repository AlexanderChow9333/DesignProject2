import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _16790e6a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _e2c8beee = () => interopDefault(import('../pages/projects.vue' /* webpackChunkName: "pages/projects" */))
const _0502abe7 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _8a43329e = () => interopDefault(import('../pages/timeBlocking.vue' /* webpackChunkName: "pages/timeBlocking" */))
const _a4673f0c = () => interopDefault(import('../pages/workTogether.vue' /* webpackChunkName: "pages/workTogether" */))
const _4cd16b53 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _16790e6a,
    name: "login"
  }, {
    path: "/projects",
    component: _e2c8beee,
    name: "projects"
  }, {
    path: "/signup",
    component: _0502abe7,
    name: "signup"
  }, {
    path: "/timeBlocking",
    component: _8a43329e,
    name: "timeBlocking"
  }, {
    path: "/workTogether",
    component: _a4673f0c,
    name: "workTogether"
  }, {
    path: "/",
    component: _4cd16b53,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
