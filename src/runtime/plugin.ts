import { defineNuxtPlugin, useRuntimeConfig, updateAppConfig, callWithNuxt } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { remoteConfig: { keys, url, id } } = useRuntimeConfig().public

  const _updateConfig = (config: any) => callWithNuxt(nuxtApp, updateAppConfig, [config])

  const pullConfig = async (_keys?: string[]) => {
    const rConfig: any = {}
    await Promise.all((_keys || keys).map(async (key) => {
      const _url = url.replace('{id}', id) + key
      rConfig[key] = await fetch(_url).then(r => r.json()).catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(`Cannot fetch remote config ${key} from ${_url}: ` + err)
      })
      _updateConfig({ [key]: rConfig[key] })
    }))
    return rConfig
  }

  if (process.server) {
    nuxtApp.payload.appConfig = await pullConfig()
  }

  if (process.client) {
    if (nuxtApp.payload.appConfig) {
      _updateConfig(nuxtApp.payload.appConfig)
    }
    if (nuxtApp.payload.prerenderedAt) {
      nuxtApp.hook('app:mounted', async () => {
        await pullConfig()
      })
    } else if (!nuxtApp.payload.serverRendered || !nuxtApp.payload.appConfig) {
      await pullConfig()
    }
  }

  return {
    provide: {
      $remoteConfig: { pull: pullConfig }
    }
  }
})
