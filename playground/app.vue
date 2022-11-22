<template>
  <div>
    <nav>
      <router-link to="/">
        SSR
      </router-link> |
      <router-link to="/static">
        Static
      </router-link> |
      <router-link to="/swr">
        SWR
      </router-link> |
      <router-link to="/spa">
        SPA
      </router-link>
    </nav>
    <main>
      <h1>{{ SiteConfig.title }}</h1>
      <h2>{{ SiteConfig.description }}</h2>
      Opening hours: <p>{{ SiteConfig.openingHours }}</p>
    </main>
    <hr>
    <footer>
      <p>© 2020 {{ SiteConfig.title }} - Generated at {{ now }} ({{ path }})</p>
    </footer>
  </div>
</template>

<script setup>
import { useAppConfig, useState, useRoute } from '#imports'

const now = useState(() => new Date().toUTCString())
const path = useRoute().path
const { site: SiteConfig } = useAppConfig()
</script>

<style>
main {
  min-height: 80vh;
}
main, footer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
