<script setup>
import { RouterLink } from 'vue-router'
import SectionHeading from '../components/SectionHeading.vue'
import Marquee from '../components/Marquee.vue'
import { profile, timeline, education, organizations, values, marqueeItems } from '../data/portfolio'
</script>

<template>
  <div>
    <section class="intro container">
      <div class="intro__media" v-reveal>
        <div class="portrait glass" v-spotlight>
          <img class="portrait__photo" :src="profile.photo" :alt="`Foto ${profile.name}`" />
          <span class="portrait__glow" aria-hidden="true"></span>

          <div class="chip glass chip--status">
            <i class="dot"></i>
            {{ profile.status }}
          </div>
          <div class="chip glass chip--loc">
            <span class="mono">{{ profile.location }}</span>
          </div>
        </div>
      </div>

      <div class="intro__copy">
        <span class="eyebrow" v-reveal>Perkenalan</span>
        <h1 class="display intro__title" v-reveal="70">
          Saya {{ profile.name }}, belajar Informatika dan suka
          <span class="grad-text">membangun produk</span>.
        </h1>
        <div v-reveal="140" class="intro__bio">
          <p v-for="paragraph in profile.bio" :key="paragraph" class="lead">{{ paragraph }}</p>
        </div>

        <div class="intro__actions" v-reveal="210">
          <RouterLink to="/projects" class="btn btn--primary">
            Proyek saya
            <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn--ghost">Hubungi saya</RouterLink>
        </div>
      </div>
    </section>

    <Marquee :items="marqueeItems" reverse />

    <section class="section container">
      <SectionHeading
        eyebrow="Cara kerja"
        title="Tiga prinsip yang saya pegang."
        description="Bukan slogan, tapi hal-hal yang benar-benar saya usahakan di setiap project."
      />
      <div class="values">
        <article
          v-for="(value, index) in values"
          :key="value.title"
          class="value glass glass--hover"
          v-spotlight
          v-reveal="index * 90"
        >
          <span class="value__index mono">0{{ index + 1 }}</span>
          <h3 class="h3">{{ value.title }}</h3>
          <p>{{ value.body }}</p>
        </article>
      </div>
    </section>

    <section class="section container">
      <SectionHeading
        eyebrow="Perjalanan"
        title="Dari HTML pertama sampai full-stack."
      />
      <ol class="timeline">
        <li
          v-for="(item, index) in timeline"
          :key="item.year"
          class="timeline__item"
          v-reveal="index * 90"
        >
          <div class="timeline__marker">
            <span class="mono">{{ item.year }}</span>
          </div>
          <div class="timeline__card glass glass--hover">
            <h3 class="h3">{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="section container">
      <SectionHeading
        eyebrow="Pendidikan"
        title="Riwayat pendidikan saya."
        description="Formal pendidikan yang saya tempuh sampai hari ini, dari sekolah menengah sampai perguruan tinggi."
      />
      <div class="education">
        <article
          v-for="(item, index) in education"
          :key="item.degree"
          class="edu glass glass--hover"
          v-spotlight
          v-reveal="index * 90"
        >
          <span class="edu__period mono">{{ item.period }}</span>
          <h3 class="h3">{{ item.degree }}</h3>
          <p class="edu__school">{{ item.school }}</p>
          <p class="edu__note">{{ item.note }}</p>
        </article>
      </div>
    </section>

    <section class="section container">
      <SectionHeading
        eyebrow="Organisasi"
        title="Tempat saya berkarya di luar kelas."
        description="Aktivitas yang membentuk cara saya bekerja — dari kepengurusan kampus sampai_channel kreatif."
      />
      <div class="orgs">
        <article
          v-for="(item, index) in organizations"
          :key="item.name"
          class="org glass glass--hover"
          :style="{ '--accent': item.accent }"
          v-spotlight
          v-reveal="index * 90"
        >
          <header class="org__head">
            <span class="org__glyph">{{ item.glyph }}</span>
            <div class="org__id">
              <h3 class="h3">{{ item.name }}</h3>
              <p class="org__org">{{ item.org }}</p>
            </div>
            <span class="org__period mono">{{ item.period }}</span>
          </header>
          <div class="org__meta">
            <span class="org__role">{{ item.role }}</span>
            <span class="org__type mono">{{ item.type }}</span>
          </div>
          <ul class="org__list">
            <li v-for="activity in item.activities" :key="activity">{{ activity }}</li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* INTRO */
.intro {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
  padding-block: clamp(3rem, 8vw, 6rem) clamp(3rem, 6vw, 5rem);
}

.intro__media {
  position: relative;
  display: grid;
  place-items: center;
}

.portrait {
  position: relative;
  width: min(360px, 82vw);
  aspect-ratio: 694 / 1040;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--gradient-soft), rgba(255, 255, 255, 0.02);
  box-shadow: var(--shadow), 0 40px 100px -55px rgba(124, 92, 255, 0.95);
}

.portrait__photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 12%;
  transition: transform 1.1s var(--ease);
}

.portrait:hover .portrait__photo {
  transform: scale(1.05);
}

.portrait__glow {
  position: absolute;
  inset: auto 0 0;
  height: 44%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(8, 8, 11, 0.8));
}

.chip {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 99px;
  font-size: 0.76rem;
  box-shadow: var(--shadow);
}

.chip--status {
  top: 14px;
  right: 14px;
  animation: float-y 6s ease-in-out infinite;
}

.chip--loc {
  bottom: 14px;
  left: 14px;
  color: var(--muted);
  animation: float-y 7.5s ease-in-out 0.8s infinite;
}

.intro__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.35rem;
}

.intro__title {
  max-width: 19ch;
}

.intro__bio {
  display: grid;
  gap: 0.9rem;
}

.intro__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

/* VALUES */
.values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.value {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.85rem;
}

.value__index {
  font-size: 0.78rem;
  color: var(--violet);
}

.value p {
  color: var(--muted);
  font-size: 0.93rem;
  line-height: 1.7;
}

/* TIMELINE */
.timeline {
  position: relative;
  display: grid;
  gap: 1.25rem;
  padding-left: 2.5rem;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 77px;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--violet), var(--cyan), transparent);
}

.timeline__item {
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: start;
  gap: 1.5rem;
}

.timeline__marker {
  position: relative;
  padding-top: 1.35rem;
  text-align: right;
  padding-right: 1.75rem;
  color: var(--muted);
  font-size: 0.78rem;
}

.timeline__marker::after {
  content: "";
  position: absolute;
  top: 1.65rem;
  right: -0.3rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.14), 0 0 18px rgba(34, 211, 238, 0.6);
}

.timeline__card {
  padding: 1.5rem 1.75rem;
}

.timeline__card p {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.93rem;
  line-height: 1.7;
}

/* EDUCATION */
.education {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.edu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.85rem;
}

.edu__period {
  color: var(--cyan);
  font-size: 0.72rem;
}

.edu__school {
  color: var(--text);
  font-size: 0.92rem;
}

.edu__note {
  margin-top: 0.5rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.65;
}

/* ORGANIZATIONS */
.orgs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.org {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 1.85rem;
}

.org__head {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.org__glyph {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent);
  font-size: 1.1rem;
  transition: transform 0.5s var(--spring);
}

.org:hover .org__glyph {
  transform: scale(1.1) rotate(-6deg);
}

.org__id {
  min-width: 0;
}

.org__org {
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.85rem;
}

.org__period {
  margin-left: auto;
  flex-shrink: 0;
  padding-top: 0.3rem;
  color: var(--dim);
  font-size: 0.68rem;
}

.org__meta {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  padding-bottom: 1.05rem;
  border-bottom: 1px solid var(--border);
}

.org__role {
  padding: 0.28rem 0.7rem;
  border-radius: 99px;
  background: var(--surface-hover);
  color: var(--text);
  font-size: 0.76rem;
}

.org__type {
  color: var(--accent);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.org__list {
  display: grid;
  gap: 0.55rem;
  margin-top: auto;
}

.org__list li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--muted);
  font-size: 0.86rem;
}

.org__list li::before {
  content: "";
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 980px) {
  .org__head {
    flex-wrap: wrap;
  }

  .org__period {
    margin-left: 0;
    width: 100%;
    padding-top: 0;
  }
}

@media (max-width: 980px) {
  .intro {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: left;
  }

  .intro__copy {
    align-items: flex-start;
  }

  .values,
  .education {
    grid-template-columns: 1fr;
  }
  .timeline {
    padding-left: 0;
  }

  .timeline::before {
    left: 5px;
  }

  .timeline__item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding-left: 1.75rem;
  }

  .timeline__marker {
    padding-top: 0;
    padding-right: 0;
    text-align: left;
  }

  .timeline__marker::after {
    top: 0.5rem;
    left: -1.75rem;
    right: auto;
  }

  .values {
    grid-template-columns: 1fr;
  }
}
</style>
