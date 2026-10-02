<script setup>
import SectionHeading from './SectionHeading.vue'
import { projects } from '../data/portfolio'
</script>

<template>
  <section id="projects" class="section container">
    <SectionHeading
      eyebrow="Karya"
      title="Proyek yang saya bangun untuk belajar dan menyelesaikan masalah."
      description="Dibangun sendiri dari nol, dipakai sebagai tempat menguji teori dan hal baru yang sedang saya pelajari."
    />

    <article
      v-for="(project, index) in projects"
      :key="project.id"
      class="showcase glass glass--hover"
      v-spotlight
      v-reveal="index * 90"
    >
      <div class="showcase__shot">
        <span class="showcase__chrome">
          <span class="showcase__dots"><i></i><i></i><i></i></span>
          <span class="mono showcase__url">{{ project.live }}</span>
        </span>
        <img
          class="showcase__img"
          :src="project.shot"
          :alt="`Tampilan halaman ${project.title}`"
          loading="lazy"
        />
      </div>

      <div class="showcase__body">
        <div class="showcase__head">
          <div>
            <span class="mono showcase__meta">{{ project.category }} · {{ project.year }}</span>
            <h3 class="h3">{{ project.title }}</h3>
          </div>
          <span class="showcase__metric">
            <span class="showcase__dot"></span>
            {{ project.metric }}
          </span>
        </div>

        <p class="showcase__summary">{{ project.summary }}</p>

        <ul class="tags">
          <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
        </ul>

        <div class="showcase__links">
          <a
            v-if="project.repo"
            class="btn btn--ghost btn--sm"
            :href="project.repo"
            target="_blank"
            rel="noopener"
          >
            Lihat kode
            <span class="arrow">↗</span>
          </a>
          <a
            v-if="project.live"
            class="btn btn--primary btn--sm"
            :href="project.live"
            target="_blank"
            rel="noopener"
          >
            Buka demo
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
  padding: clamp(1.25rem, 3vw, 2rem);
  min-width: 0;
}

/* SHOT */
.showcase__shot {
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.showcase__chrome {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

.showcase__dots {
  display: inline-flex;
  gap: 5px;
  flex-shrink: 0;
}

.showcase__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a2a35;
}

.showcase__dots i:first-child {
  background: #ff5f57;
}

.showcase__dots i:nth-child(2) {
  background: #febc2e;
}

.showcase__dots i:last-child {
  background: #28c840;
}

.showcase__url {
  color: var(--dim);
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.showcase__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  background: var(--gradient-soft), rgba(255, 255, 255, 0.02);
}

/* BODY */
.showcase__body {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  min-width: 0;
}

.showcase__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.showcase__head > div {
  min-width: 0;
}

.showcase__meta {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--cyan);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.showcase__head .h3 {
  overflow-wrap: anywhere;
}

.showcase__metric {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.7rem;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.75rem;
  color: var(--text);
}

.showcase__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.14);
}

.showcase__summary {
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.7;
}

.showcase__links {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 0.35rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

@media (max-width: 980px) {
  .showcase {
    grid-template-columns: 1fr;
  }

  .showcase__img {
    aspect-ratio: 16 / 11;
  }
}

@media (max-width: 560px) {
  .showcase__links {
    width: 100%;
  }

  .showcase__links .btn {
    flex: 1 1 auto;
    justify-content: center;
  }
}
</style>