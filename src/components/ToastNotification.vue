<script setup>
import { useDevMode } from '../composables/useDevMode'

const { toastMessage } = useDevMode()
</script>

<template>
  <Teleport to="body">
    <transition name="toast-slide">
      <div v-if="toastMessage" class="toast-hud mono">
        <span class="toast-hud__dot"></span>
        <span class="toast-hud__text">{{ toastMessage }}</span>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.toast-hud {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 1.1rem;
  background: rgba(13, 17, 26, 0.94);
  border: 1px solid rgba(0, 242, 254, 0.35);
  border-radius: var(--radius);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 242, 254, 0.15);
  color: #fff;
  font-size: 0.8rem;
  pointer-events: none;
}

.toast-hud__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 8px #00ff9d;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
</style>
