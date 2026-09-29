<script setup>
defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 }
})
</script>

<template>
  <article
    class="pcard glass glass--hover"
    v-spotlight
    v-reveal="(index % 3) * 90"
  >
    <div class="pcard__media" :style="{ '--thumb': project.gradient }">
      <span class="pcard__glyph">{{ project.glyph }}</span>
      <span class="pcard__category mono">{{ project.category }}</span>
      <span class="pcard__year mono">{{ project.year }}</span>
    </div>

    <div class="pcard__body">
      <div class="pcard__head">
        <h3 class="h3">{{ project.title }}</h3>
        <a
          class="pcard__arrow"
          :href="project.repo || project.live"
          target="_blank"
          rel="noopener"
          :aria-label="`Buka proyek ${project.title}`"
          >↗</a
        >
      </div>

      <p class="pcard__summary">{{ project.summary }}</p>

      <ul class="tags">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>

      <div class="pcard__foot">
        <span class="pcard__metric">
          <span class="pcard__metric-dot"></span>
          {{ project.metric }}
        </span>
        <div class="pcard__links">
          <a
            v-if="project.repo"
            class="pcard__link"
            :href="project.repo"
            target="_blank"
            rel="noopener"
            >Kode</a
          >
          <a
            v-if="project.live"
            class="pcard__link pcard__link--live"
            :href="project.live"
            target="_blank"
            rel="noopener"
            >Demo</a
          >
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pcard {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.pcard__media {
  position: relative;
  height: 172px;
  margin: 10px;
  border-radius: calc(var(--radius-lg) - 10px);
  background: var(--thumb);
  overflow: hidden;
  display: grid;
  place-items: center;
}

.pcard__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 20% 10%, rgba(255, 255, 255, 0.35), transparent 55%),
    linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.35));
  mix-blend-mode: overlay;
}

.pcard__glyph {
  position: relative;
  z-index: 1;
  font-size: 3.1rem;
  color: rgba(8, 8, 11, 0.82);
  transition: transform 0.6s var(--spring);
}

.pcard:hover .pcard__glyph {
  transform: scale(1.14) rotate(-6deg);
}

.pcard__year {
  position: absolute;
  top: 12px;
  right: 14px;
  z-index: 1;
  color: rgba(8, 8, 11, 0.7);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.pcard__body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 0.6rem 1.35rem 1.4rem;
  flex: 1;
}

.pcard__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.pcard__arrow {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.4s var(--ease);
}

.pcard:hover .pcard__arrow {
  color: #08080b;
  background: var(--cyan);
  border-color: transparent;
  transform: translate(3px, -3px) rotate(8deg);
}

.pcard__summary {
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.65;
  flex: 1;
}

.pcard__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
}

.pcard__metric {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--text);
}

.pcard__metric-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.14);
}

.pcard__category {
  position: absolute;
  top: 12px;
  left: 14px;
  z-index: 1;
  color: rgba(8, 8, 11, 0.7);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.pcard__links {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.pcard__link {
  padding: 0.34rem 0.72rem;
  border: 1px solid var(--border);
  border-radius: 99px;
  font-size: 0.72rem;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.3s var(--ease);
}

.pcard__link:hover {
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.05);
}

.pcard__link--live {
  color: var(--cyan);
  border-color: color-mix(in srgb, var(--cyan) 40%, transparent);
}

.pcard__link--live:hover {
  color: #08080b;
  background: var(--cyan);
  border-color: transparent;
}
</style>
