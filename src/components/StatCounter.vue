<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  decimals: { type: Number, default: 0 },
  duration: { type: Number, default: 1700 }
})

const root = ref(null)
const display = ref((0).toFixed(props.decimals))

let frame = null

const format = (number) =>
  number.toLocaleString('id-ID', {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals
  })

const run = () => {
  const start = performance.now()
  const tick = (now) => {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = format(props.value * eased)
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    display.value = format(props.value)
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      run()
      observer.disconnect()
    },
    { threshold: 0.4 }
  )

  observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="root" class="counter">{{ display }}</span>
</template>

<style scoped>
.counter {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
</style>
