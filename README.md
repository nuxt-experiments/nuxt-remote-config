# Nuxt Remote Config

[Under Development]

## Why?

You create and deploy an amazing [Nuxt App](https://nuxt.com/). Then you need to change few parameters, maybe a message in the header to users, changing theme variant based on an special occasion, or take site down for maintenance.

Typically, it is done by either commiting a new change to the website and waiting deployment or using a hosted CMS service and server-side-rendering to apply the config.

This module makes it super easy by removing all complexity of setting up a remote CMS and handling different rendering modes by providing a super easy approach to dynamically change your application configration using Nuxt 3 [app config](https://nuxt.com/docs/guide/directory-structure/app.config).

## Usage

1. Install `nuxt-remote-config` as dev dependency:

```sh
# npm
npm i -D nuxt-remote-config

# pnpm
pnpm add -D nuxt-remote-config

# yarn
yarn add -D nuxt-remote-config
```

2. Add module to `nuxt.config`:

```js
export default defineNuxtConfig({
  module: [
    'nuxt-remote-config'
  ]
})
```

3. Setup config registry (see next sections)

## Configuration Registry

In order to use this module on your website, you need a configuration registry.

### OpenKV

> Experimental: OpenKV is under development and service usage might change. Anybody can edit the config at the moment!

- Head to https://openkv.unjs.io/ and create a namespace and take the id

Define in `nuxt.config`:

```js
export default defineNuxtConfig({
  remoteConfig: {
    id: '<openkv namespace id>'
  }
})
```

Alternatively create `.nuxtrc` and set namespace id:

```ini
remoteConfig.id=<openkv namespace id>
```

## Custom Registry

You custom registry's url should respond to `/{key}` with a JSON string:

Define in `nuxt.config`:

```js
export default defineNuxtConfig({
  remoteConfig: {
    url: 'https://my-custom-registry.com'
  }
})
```

Alternatively create `.nuxtrc` and set url:

```ini
remoteConfig.url=https://my-custom-registry.com
```

**Note:** You can use `{id}` placeholder that is replaced with `id` configuration.

## Module Options

### `endpoint`

Registry endpoint. You can customize it at runtime using `NUXT_REMOTE_CONFIG_ENDPOINT`

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
