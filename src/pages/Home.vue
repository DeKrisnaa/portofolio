<script setup>
import Marquee from '../components/Marquee.vue'
import StatCounter from '../components/StatCounter.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { profile, marqueeItems, stats } from '../data/portfolio'
</script>

<template>
  <div>
    <!-- HERO -->
    <section id="home" class="hero container">
      <div class="hero__copy">
        <span class="pill" v-reveal>
          <i class="dot"></i>
          {{ profile.status }}
        </span>

        <h1 class="display hero__title" v-reveal="80">
          Hi, I'm <span class="grad-text">{{ profile.handle }}</span>
        </h1>

        <p class="hero__role" v-reveal="120">
          Junior Developer | Content Creator
        </p>

        <p class="lead hero__lead" v-reveal="160">
          Mahasiswa Informatika di Primakara University, Bali. Saya membangun aplikasi web dari
          desain antarmuka sampai deployment, dengan fokus pada detail yang membuat produk terasa
          selesai.
        </p>

        <div class="hero__actions" v-reveal="240">
          <a href="#projects" class="btn btn--primary">
            Lihat proyek
            <span class="arrow">→</span>
          </a>
          <a :href="profile.cv" class="btn btn--ghost" download>
            Download CV
            <span class="arrow">↓</span>
          </a>
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
        <figure class="portrait glass" v-spotlight>
          <img class="portrait__photo" :src="profile.photo" :alt="`Foto ${profile.name}`" />
          <span class="portrait__glow" aria-hidden="true"></span>
        </figure>
      </div>
    </section>

    <Marquee :items="marqueeItems" />

    <AboutSection />
    <ProjectsSection />
    <ContactSection />
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

/* grid children default to min-width:auto, which lets the portrait below
   push the whole page sideways on narrow screens */
.hero__copy,
.hero__visual {
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

.hero__role {
  margin-top: -0.75rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cyan);
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

/* HERO PORTRAIT */
.hero__visual {
  position: relative;
  display: grid;
  place-items: center;
}

.portrait {
  position: relative;
  width: min(380px, 100%);
  aspect-ratio: 4 / 5;
  margin: 0;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow), 0 44px 100px -55px rgba(124, 92, 255, 0.95);
  animation: float-y 9s ease-in-out infinite;
  /* subtle animated border */
  background: radial-gradient(
      130% 120% at 50% 10%,
      rgba(255, 255, 255, 0.16),
      transparent 60%
    ),
    var(--bg);
  overflow: hidden;
}

.portrait::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from 180deg,
    rgba(124, 92, 255, 0) 0deg,
    rgba(124, 92, 255, 0.32) 55deg,
    rgba(34, 211, 238, 0.22) 110deg,
    rgba(163, 230, 53, 0.16) 160deg,
    rgba(124, 92, 255, 0) 360deg
  );
  animation: rotate-ring 8s linear infinite;
  filter: blur(0.4px);
  opacity: 0.85;
}

.portrait::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: calc(var(--radius-xl) - 2px);
  background: var(--bg);
}

.portrait__photo {
  position: relative;
  z-index: 1;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  margin: 4px;
  object-fit: cover;
  object-position: center 18%;
  border-radius: calc(var(--radius-xl) - 8px);
  background: rgba(8, 8, 11, 0.5);
  transition: transform 1.1s var(--ease);
  /* subtle parallax on hover */
  transform-origin: center;
  will-change: transform;
}

@media (hover: hover) {
  .portrait:hover .portrait__photo {
    transform: translateY(-2px) scale(1.03);
  }
}

.portrait__glow {
  position: absolute;
  inset: 4px;
  z-index: 2;
  pointer-events: none;
  border-radius: calc(var(--radius-xl) - 8px);
  background: radial-gradient(
      120% 90% at 50% 0%,
      rgba(255, 255, 255, 0.16),
      transparent 65%
    ),
    linear-gradient(180deg, transparent 55%, rgba(8, 8, 11, 0.65));
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

  .portrait {
    width: min(340px, 100%);
  }
}

@media (max-width: 640px) {
  .hero__stats {
    grid-template-columns: repeat(2, 1fr);
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