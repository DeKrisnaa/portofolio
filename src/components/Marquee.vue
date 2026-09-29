<script setup>
defineProps({
  items: { type: Array, required: true },
  reverse: { type: Boolean, default: false }
})
</script>

<template>
  <div class="marquee" :class="{ 'marquee--reverse': reverse }" aria-hidden="true">
    <div class="marquee__track">
      <div v-for="group in 2" :key="group" class="marquee__group">
        <span v-for="item in items" :key="`${group}-${item}`" class="marquee__item">
          {{ item }}
          <i class="marquee__sep">&#10022;</i>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  padding: 1.15rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.015);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 32s linear infinite;
}

.marquee--reverse .marquee__track {
  animation-direction: reverse;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  align-items: center;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-left: 1.6rem;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.2vw, 1.65rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--dim);
  white-space: nowrap;
  transition: color 0.3s;
}

.marquee__item:hover {
  color: var(--text);
}

.marquee__sep {
  font-size: 0.6em;
  color: var(--violet);
}
</style>
