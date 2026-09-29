<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' }
})
</script>

<template>
  <div class="section-head" v-reveal>
    <div class="section-head__text">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h2 v-if="title" class="h2">{{ title }}</h2>
      <p v-if="description" class="lead">{{ description }}</p>
    </div>
    <div v-if="$slots.action" class="section-head__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.section-head__action {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
</style>
