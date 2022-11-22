import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addTemplate } from '@nuxt/kit'

export interface ModuleOptions {
  url: string
  keys: string[]
  id: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'remote-config',
    configKey: 'remoteConfig'
  },
  defaults: {
    url: 'https://openkv.unjs.io/kv/{id}/config:',
    keys: ['site'],
    id: ''
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))
    nuxt.options.runtimeConfig.public.remoteConfig = options
  }
})
