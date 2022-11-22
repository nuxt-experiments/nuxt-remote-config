import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  routeRules: {
    '/static': { prerender: true },
    '/swr': { swr: true },
    '/spa': { ssr: false }
  },
  remoteConfig: {
    id: '89f669294c79463a9454b42bd3c82b9b'
  },
  nitro: {
    prerender: {
      routes: ['/static', '/spa']
    }
  }
})
