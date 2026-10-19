<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Marquee from '../components/Marquee.vue'
import StatCounter from '../components/StatCounter.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import SectionHeading from '../components/SectionHeading.vue'
import HeroDevCard from '../components/HeroDevCard.vue'
import InteractiveTerminal from '../components/InteractiveTerminal.vue'
import { profile, marqueeItems, stats } from '../data/portfolio'

// Dynamic Typewriter Roles
const roles = [
  'Junior Web Developer',
  'Informatics Student @ Primakara',
  'Next.js & TypeScript Builder',
  'Creative Tech Explorer'
]

const currentRoleText = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimeout = null

const typeLoop = () => {
  const currentFull = roles[roleIndex]

  if (isDeleting) {
    currentRoleText.value = currentFull.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentRoleText.value = currentFull.substring(0, charIndex + 1)
    charIndex++
  }

  let delay = isDeleting ? 40 : 80

  if (!isDeleting && charIndex === currentFull.length) {
    delay = 2000 // wait before deleting
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    delay = 400
  }

  typeTimeout = setTimeout(typeLoop, delay)
}

onMounted(() => {
  typeLoop()
})

onUnmounted(() => {
  if (typeTimeout) clearTimeout(typeTimeout)
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section id="home" class="hero container">
      <div class="hero__copy">
        <div class="hero__badges" v-reveal>
          <span class="pill status-pill">
            <i class="dot"></i>
            {{ profile.status }}
          </span>
          <span class="pill dev-branch mono">
            <span class="git-icon">⌥</span>
            main
          </span>
          <span class="pill location-pill mono">
            ⌖ Bali (WITA)
          </span>
        </div>

        <h1 class="display hero__title" v-reveal="80">
          Hi, I'm <span class="grad-text">{{ profile.handle }}</span>
        </h1>

        <div class="hero__role-wrapper" v-reveal="120">
          <span class="role-prompt mono">$&nbsp;</span>
          <span class="hero__role mono">{{ currentRoleText }}</span>
          <span class="type-cursor"></span>
        </div>

        <p class="lead hero__lead" v-reveal="160">
          Mahasiswa Informatika di Primakara University, Bali. Saya merancang dan membangun
          aplikasi web modern dengan Next.js, TypeScript, dan Tailwind CSS — berfokus pada
          performa tinggi, arsitektur kode yang bersih, dan antarmuka interaktif.
        </p>

        <div class="hero__actions" v-reveal="240">
          <a href="#projects" class="btn btn--primary">
            Lihat proyek
            <span class="arrow">→</span>
          </a>
          <a href="#terminal" class="btn btn--ghost">
            <span class="btn-icon">💻</span>
            Buka Terminal
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
        <HeroDevCard />
      </div>
    </section>

    <Marquee :items="marqueeItems" />

    <AboutSection />
    <SkillsSection />
    <ProjectsSection />

    <!-- INTERACTIVE DEV TERMINAL SECTION -->
    <section id="terminal" class="section container">
      <SectionHeading
        eyebrow="CLI Sandbox"
        title="Interactive Developer Terminal."
        description="Jelajahi portofolio lewat antarmuka baris perintah (CLI). Ketik 'help' atau klik chip perintah di bawah untuk mencoba neofetch, skills, projects, atau matrix."
      />
      <div v-reveal="90">
        <InteractiveTerminal />
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<style scoped>
/* HERO */
.hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding-block: clamp(3rem, 8vw, 6.5rem) clamp(3rem, 6vw, 5rem);
}

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

.hero__badges {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.dev-branch {
  color: var(--cyan);
  border-color: rgba(14, 165, 233, 0.3);
  background: rgba(14, 165, 233, 0.08);
  font-size: 0.72rem;
  padding: 0.3rem 0.65rem;
}

.git-icon {
  font-weight: bold;
  font-size: 0.85rem;
}

.location-pill {
  color: var(--dim);
  font-size: 0.72rem;
  padding: 0.3rem 0.65rem;
}

.hero__title {
  max-width: 17ch;
}

.hero__role-wrapper {
  display: flex;
  align-items: center;
  margin-top: -0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.role-prompt {
  color: #00ff9d;
  font-weight: bold;
}

.hero__role {
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  color: var(--cyan);
}

.type-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  background: #00f2fe;
  margin-left: 4px;
  animation: blink 0.9s infinite;
}

.hero__lead {
  max-width: 52ch;
}

.hero__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.btn-icon {
  font-size: 0.95rem;
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

/* RESPONSIVE */
@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .hero__title {
    max-width: 22ch;
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
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__stats {
    gap: 1.25rem 0.75rem;
  }
}
</style>