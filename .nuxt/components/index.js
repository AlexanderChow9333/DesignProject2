export { default as Logo } from '../../components/Logo.vue'
export { default as Navbar } from '../../components/Navbar.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyNavbar = import('../../components/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
