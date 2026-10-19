<script setup>
import SectionHeading from './SectionHeading.vue'
import { projects } from '../data/portfolio'
</script>

<template>
  <section id="projects" class="section container">
    <SectionHeading
      eyebrow="Proyek Unggulan"
      title="Aplikasi dan sistem web yang saya bangun dari nol."
      description="Setiap proyek dirancang dengan arsitektur modern, best practice performa, dan pemecahan masalah dunia nyata."
    />

    <div class="projects-list">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        class="showcase glass glass--hover"
        v-spotlight
        v-reveal="index * 90"
      >
        <!-- Mockup Window Browser -->
        <div class="showcase__shot">
          <div class="showcase__chrome">
            <div class="showcase__dots">
              <i class="dot-red"></i>
              <i class="dot-yellow"></i>
              <i class="dot-green"></i>
            </div>
            <div class="showcase__branch mono">
              <span class="git-glyph">⌥</span>
              {{ project.branch || 'main' }}
            </div>
            <span class="mono showcase__url">{{ project.live || project.repo }}</span>
          </div>

          <div class="showcase__preview">
            <img
              class="showcase__img"
              :src="project.shot"
              :alt="`Tampilan halaman ${project.title}`"
              loading="lazy"
            />
            <div class="showcase__overlay">
              <span class="view-tag mono">PROYEK // 0{{ index + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- Project Details -->
        <div class="showcase__body">
          <div class="showcase__head">
            <div>
              <span class="mono showcase__meta">{{ project.category }} · {{ project.year }}</span>
              <h3 class="h3 showcase__title">{{ project.title }}</h3>
            </div>
            <div class="showcase__metrics">
              <span class="showcase__metric">
                <span class="showcase__dot"></span>
                {{ project.metric }}
              </span>
              <span v-if="project.highlight" class="showcase__highlight mono">
                ⚡ {{ project.highlight }}
              </span>
            </div>
          </div>

          <p class="showcase__summary">{{ project.summary }}</p>

          <div class="showcase__tech">
            <span class="tech-label mono">Tech Stack:</span>
            <ul class="tags">
              <li v-for="tech in project.stack" :key="tech" class="mono">{{ tech }}</li>
            </ul>
          </div>

          <div class="showcase__links">
            <a
              v-if="project.live && project.live !== '#'"
              class="btn btn--primary btn--sm"
              :href="project.live"
              target="_blank"
              rel="noopener"
            >
              Buka Live Demo
              <span class="arrow">→</span>
            </a>
            <a
              v-if="project.repo"
              class="btn btn--ghost btn--sm"
              :href="project.repo"
              target="_blank"
              rel="noopener"
            >
              Lihat Source Code
              <span class="arrow">↗</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.showcase {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: rgba(12, 16, 24, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase:hover {
  border-color: rgba(0, 242, 254, 0.3);
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.08);
}

/* SHOT */
.showcase__shot {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(7, 9, 14, 0.95);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
}

.showcase__chrome {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 21, 32, 0.95);
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
}

.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }

.showcase__branch {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(0, 242, 254, 0.1);
  border: 1px solid rgba(0, 242, 254, 0.25);
  color: #00f2fe;
}

.git-glyph {
  font-size: 0.8rem;
}

.showcase__url {
  color: var(--dim);
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.showcase__preview {
  position: relative;
  overflow: hidden;
}

.showcase__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s var(--ease);
}

.showcase:hover .showcase__img {
  transform: scale(1.03);
}

.showcase__overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}

.view-tag {
  font-size: 0.65rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: rgba(7, 9, 14, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--muted);
}

/* BODY */
.showcase__body {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.showcase__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.showcase__meta {
  display: block;
  margin-bottom: 0.35rem;
  color: #00f2fe;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.showcase__title {
  color: #fff;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
}

.showcase__metrics {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.showcase__metric {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.7rem;
  border-radius: 99px;
  background: rgba(0, 255, 157, 0.08);
  border: 1px solid rgba(0, 255, 157, 0.25);
  font-size: 0.74rem;
  color: #00ff9d;
}

.showcase__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}

.showcase__highlight {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 99px;
  background: rgba(250, 204, 21, 0.08);
  border: 1px solid rgba(250, 204, 21, 0.25);
  font-size: 0.72rem;
  color: #facc15;
}

.showcase__summary {
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.7;
}

.showcase__tech {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tech-label {
  font-size: 0.72rem;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tags li {
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: 6px;
  background: rgba(0, 242, 254, 0.04);
  color: #e2e8f0;
  font-size: 0.74rem;
}

.showcase__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

@media (max-width: 980px) {
  .showcase {
    grid-template-columns: 1fr;
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