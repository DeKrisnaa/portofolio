<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useDevMode } from '../composables/useDevMode'

const { isMatrixActive, toggleMatrix } = useDevMode()
const canvasRef = ref(null)
let animId = null

const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'
const fontSize = 16

const runMatrix = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  let columns = Math.floor(width / fontSize)
  const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50))

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    columns = Math.floor(width / fontSize)
    while (drops.length < columns) drops.push(0)
  }

  window.addEventListener('resize', handleResize)

  const draw = () => {
    ctx.fillStyle = 'rgba(7, 9, 14, 0.08)'
    ctx.fillRect(0, 0, width, height)

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      // Leading character is bright cyan/white
      if (Math.random() > 0.85) {
        ctx.fillStyle = '#00f2fe'
        ctx.shadowColor = '#00f2fe'
        ctx.shadowBlur = 8
      } else {
        ctx.fillStyle = '#00ff9d'
        ctx.shadowColor = '#00ff9d'
        ctx.shadowBlur = 3
      }

      ctx.fillText(char, x, y)
      ctx.shadowBlur = 0

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    animId = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    window.removeEventListener('resize', handleResize)
    if (animId) cancelAnimationFrame(animId)
  }
}

let cleanup = null

watch(isMatrixActive, (active) => {
  if (active) {
    setTimeout(() => {
      cleanup = runMatrix()
    }, 50)
  } else if (cleanup) {
    cleanup()
    cleanup = null
  }
})

const onKeyDown = (e) => {
  if (e.key === 'Escape' && isMatrixActive.value) {
    toggleMatrix()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (cleanup) cleanup()
})
</script>

<template>
  <transition name="fade">
    <div v-if="isMatrixActive" class="matrix-layer" @click.self="toggleMatrix">
      <canvas ref="canvasRef" class="matrix-canvas"></canvas>
      <div class="matrix-hud">
        <div class="matrix-badge mono">
          <span class="matrix-dot"></span>
          MATRIX_PROTOCOL // ACTIVE
        </div>
        <button class="matrix-close btn btn--ghost btn--sm" @click="toggleMatrix">
          ✕ Keluar [ESC]
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.matrix-layer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #07090e;
  overflow: hidden;
  cursor: pointer;
}

.matrix-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.matrix-hud {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: auto;
}

.matrix-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 99px;
  background: rgba(0, 255, 157, 0.12);
  border: 1px solid rgba(0, 255, 157, 0.4);
  color: #00ff9d;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  box-shadow: 0 0 15px rgba(0, 255, 157, 0.2);
}

.matrix-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 8px #00ff9d;
  animation: pulse-dot 1.5s infinite;
}

.matrix-close {
  background: rgba(7, 9, 14, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
