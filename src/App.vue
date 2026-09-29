<script setup>
import AppHeader from './components/AppHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CursorGlow from './components/CursorGlow.vue'
</script>

<template>
  <div class="app-shell">
    <CursorGlow />
    <AppHeader />
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  position: relative;
  z-index: 1;
  flex: 1;
}
</style>
