<script setup>
import { RouterLink } from 'vue-router'
import SectionHeading from '../components/SectionHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'
import Marquee from '../components/Marquee.vue'
import StatCounter from '../components/StatCounter.vue'
import { profile, projects, marqueeItems, stats } from '../data/portfolio'
import { techStack } from '../data/techStack'

const featured = projects.slice(0, 3)
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero container">
      <div class="hero__copy">
        <span class="pill" v-reveal>
          <i class="dot"></i>
          {{ profile.status }}
        </span>

        <h1 class="display hero__title" v-reveal="80">
          Mahasiswa Informatika yang membangun
          <span class="grad-text">produk digital</span>
          yang rapi dan cepat.
        </h1>

        <p class="lead hero__lead" v-reveal="160">
          Halo, saya {{ profile.name }}. Saya merancang dan mengembangkan aplikasi web end-to-end:
          dari desain antarmuka, API, sampai deployment. Fokus pada detail yang membuat produk terasa selesai.
        </p>

        <div class="hero__actions" v-reveal="240">
          <RouterLink to="/projects" class="btn btn--primary">
            Lihat proyek
            <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn--ghost">Hubungi saya</RouterLink>
        </div>

        <dl class="hero__stats" v-reveal="320">
          <div v-for="stat in stats" :key="stat.label" class="hero__stat">
            <dt class="hero__stat-value">
              <StatCounter :value="stat.value" :decimals="stat.decimals || 0" />
              <span>{{ stat.suffix }}</span>
            </dt>
            <dd class="hero__stat-label">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero__visual" v-reveal="180">
        <div class="code glass" v-spotlight>
          <div class="code__bar">
            <span class="code__dots"><i></i><i></i><i></i></span>
            <span class="mono code__file">profile.config.ts</span>
          </div>
          <pre class="code__body mono"><code><span class="c-com">// masih belajar, tapi serius</span>
<span class="c-key">export const</span> <span class="c-var">profile</span> = {
  <span class="c-prop">nama</span>: <span class="c-str">'{{ profile.name }}'</span>,
  <span class="c-prop">jurusan</span>: <span class="c-str">'Informatika'</span>,
  <span class="c-prop">stack</span>: [<span class="c-str">'Next.js'</span>, <span class="c-str">'TypeScript'</span>, <span class="c-str">'Tailwind'</span>],
  <span class="c-prop">fokus</span>: <span class="c-str">'Web Development'</span>,
  <span class="c-prop">lokasi</span>: <span class="c-str">'{{ profile.location }}'</span>,
  <span class="c-prop">kerjakan</span>: <span class="c-bool">true</span>
}<span class="code__cursor"></span></code></pre>
        </div>

        <div class="profile-card glass" v-spotlight>
          <span class="profile-card__avatar">
            <img :src="profile.photo" :alt="profile.name" />
          </span>
          <span class="profile-card__meta">
            <strong>{{ profile.name }}</strong>
            <em>{{ profile.role }}</em>
          </span>
        </div>
      </div>

      <div class="hero__stack" v-reveal="140">
        <div class="hero__stack-head">
          <span class="eyebrow">Toolbox harian</span>
          <p class="mono hero__stack-note">
            {{ techStack.length }} teknologi · dari markup sampai database
          </p>
        </div>
        <ul class="stackgrid">
          <li
            v-for="tech in techStack"
            :key="tech.name"
            class="tech glass"
            :style="{ '--brand': tech.color }"
          >
            <span class="tech__icon" v-html="tech.svg"></span>
            <span class="tech__name">{{ tech.name }}</span>
          </li>
        </ul>
      </div>
    </section>

    <Marquee :items="marqueeItems" />

    <!-- FEATURED PROJECTS -->
    <section class="section container">
      <SectionHeading
        eyebrow="Proyek pilihan"
        title="Beberapa hal yang saya bangun baru-baru ini."
      >
        <template #action>
          <RouterLink to="/projects" class="btn btn--ghost btn--sm">
            Semua proyek
            <span class="arrow">→</span>
          </RouterLink>
        </template>
      </SectionHeading>

      <div class="projects-grid">
        <ProjectCard
          v-for="(project, index) in featured"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO */
.hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
  padding-block: clamp(3rem, 8vw, 6.5rem) clamp(3rem, 6vw, 5rem);
}

/* grid children default to min-width:auto, which lets the <pre> below
   push the whole page sideways on narrow screens */
.hero__copy,
.hero__visual,
.hero__stack {
  min-width: 0;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.hero__title {
  max-width: 17ch;
}

.hero__lead {
  max-width: 50ch;
}

.hero__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  margin-top: 1rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
  width: 100%;
}

.hero__stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--text);
}

.hero__stat-label {
  margin-top: 0.15rem;
  font-size: 0.76rem;
  color: var(--dim);
  font-family: var(--font-mono);
}

/* CODE CARD */
.hero__visual {
  position: relative;
}

.code {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow), 0 40px 90px -50px rgba(124, 92, 255, 0.9);
  animation: float-y 9s ease-in-out infinite;
}

.code__bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

.code__dots {
  display: inline-flex;
  gap: 6px;
}

.code__dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2a2a35;
}

.code__dots i:first-child {
  background: #ff5f57;
}

.code__dots i:nth-child(2) {
  background: #febc2e;
}

.code__dots i:nth-child(3) {
  background: #28c840;
}

.code__file {
  color: var(--dim);
  font-size: 0.72rem;
}

.code__body {
  padding: 1.35rem 1.4rem 1.6rem;
  font-size: 0.82rem;
  line-height: 1.85;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  color: #d6d6e0;
}

.c-com {
  color: #5c5c6e;
}

.c-key {
  color: var(--violet);
}

.c-var {
  color: var(--cyan);
}

.c-prop {
  color: #9b9ba7;
}

.c-str {
  color: var(--lime);
}

.c-bool {
  color: var(--amber);
}

.code__cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 3px;
  vertical-align: middle;
  background: var(--cyan);
  animation: blink 1.1s step-end infinite;
}

/* HERO PROFILE CARD */
.profile-card {
  position: absolute;
  top: -20px;
  left: -16px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 1rem 0.55rem 0.55rem;
  border-radius: 99px;
  box-shadow: var(--shadow);
  animation: float-y 7s ease-in-out 0.4s infinite;
}

.profile-card__avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  padding: 2px;
  border-radius: 50%;
  background: var(--gradient);
  overflow: hidden;
}

.profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  border-radius: 50%;
}

.profile-card__meta {
  display: grid;
  line-height: 1.2;
}

.profile-card__meta strong {
  font-family: var(--font-display);
  font-size: 0.86rem;
  letter-spacing: -0.02em;
}

.profile-card__meta em {
  font-style: normal;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
}

/* HERO TECH STACK */
.hero__stack {
  grid-column: 1 / -1;
  display: grid;
  gap: 1.35rem;
  margin-top: clamp(1rem, 3vw, 2.25rem);
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
  border-top: 1px solid var(--border);
}

.hero__stack-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__stack-note {
  color: var(--dim);
  font-size: 0.72rem;
}

.stackgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(96px, 100%), 1fr));
  gap: 12px;
}

.tech {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.05rem 0.5rem;
  border-radius: var(--radius);
  overflow: hidden;
  min-width: 0;
  transition: transform 0.45s var(--ease), border-color 0.4s, background 0.4s, box-shadow 0.45s;
}

.tech::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.45;
  transition: opacity 0.4s;
  background: radial-gradient(70% 65% at 50% 0%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 72%);
}

@media (hover: hover) {
  .tech:hover {
    transform: translateY(-7px);
    border-color: color-mix(in srgb, var(--brand) 45%, transparent);
    background: var(--surface-hover);
    box-shadow: 0 20px 44px -24px var(--brand);
  }

  .tech:hover::before {
    opacity: 1;
  }
}

.tech__icon {
  position: relative;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
}

.tech__icon :deep(svg) {
  width: 100%;
  height: 100%;
  transition: transform 0.5s var(--spring);
}

.tech__name {
  position: relative;
  font-size: 0.72rem;
  text-align: center;
  color: var(--muted);
  transition: color 0.3s;
}

@media (hover: hover) {
  .tech:hover .tech__icon :deep(svg) {
    transform: scale(1.12) rotate(-5deg);
  }

  .tech:hover .tech__name {
    color: var(--text);
  }
}

/* PROJECTS */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .hero__title {
    max-width: 22ch;
  }

  /* the hero is a single column from here down, so the floating
     profile card has to stay inside the gutter */
  .profile-card {
    top: -16px;
    left: 4px;
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero__stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .hero__stack-head {
    justify-content: flex-start;
  }

  .stackgrid {
    grid-template-columns: repeat(auto-fit, minmax(min(82px, 100%), 1fr));
    gap: 8px;
  }

  /* wrap the snippet instead of forcing a sideways scroll inside the card */
  .code__body {
    font-size: 0.72rem;
    padding: 1.1rem 1rem 1.3rem;
    overflow-x: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }

  .hero__actions {
    width: 100%;
  }

  .hero__actions .btn {
    flex: 1 1 auto;
    justify-content: center;
  }
}

@media (max-width: 380px) {
  /* two stacked buttons beat two cramped ones */
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__stats {
    gap: 1.25rem 0.75rem;
  }
}
</style>
