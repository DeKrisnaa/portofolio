<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const glow = ref(null)

let frame = null
let targetX = window.innerWidth / 2
let targetY = window.innerHeight / 2
let currentX = targetX
let currentY = targetY

const onMove = (event) => {
  targetX = event.clientX
  targetY = event.clientY
  if (glow.value) glow.value.style.opacity = '1'
}

const loop = () => {
  currentX += (targetX - currentX) * 0.12
  currentY += (targetY - currentY) * 0.12
  if (glow.value) {
    glow.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
  }
  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  if (window.matchMedia('(hover: none)').matches) return
  window.addEventListener('pointermove', onMove, { passive: true })
  frame = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="glow" class="cursor-glow" aria-hidden="true"></div>
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 520px;
  height: 520px;
  margin: -260px 0 0 -260px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.1), transparent 62%);
  will-change: transform;
}

@media (hover: none) {
  .cursor-glow {
    display: none;
  }
}
</style>
