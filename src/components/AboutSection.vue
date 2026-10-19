<script setup>
import SectionHeading from './SectionHeading.vue'
import { profile, education, organizations } from '../data/portfolio'
import { useDevMode } from '../composables/useDevMode'

const { copyToClipboard } = useDevMode()

const techSpecs = [
  { label: 'Platform & OS', val: 'Linux / Web Browser' },
  { label: 'Core Language', val: 'TypeScript / JavaScript' },
  { label: 'Editor & IDE', val: 'VS Code + JetBrains Mono' },
  { label: 'Deployment', val: 'Vercel, Git & GitHub' },
  { label: 'Methodology', val: 'Component-Driven & Clean Code' }
]
</script>

<template>
  <section id="about" class="section container">
    <SectionHeading
      eyebrow="Tentang Developer"
      title="Profil, filosofi koding, dan riwayat perjalanan IT."
      description="Mahasiswa Informatika yang berdedikasi membangun solusi digital berbasis web performan dan terstruktur."
    />

    <!-- Main Intro / Bio Grid -->
    <div class="intro">
      <div class="intro__bio" v-reveal>
        <div class="bio-hud-header mono">
          <span class="hud-slash">// 01_BIOGRAPHY</span>
          <span class="hud-status">STATUS: ACTIVE</span>
        </div>

        <p v-for="paragraph in profile.bio" :key="paragraph" class="lead">{{ paragraph }}</p>

        <div class="intro__actions">
          <a href="#contact" class="btn btn--primary">
            Hubungi saya
            <span class="arrow">→</span>
          </a>
          <button class="btn btn--ghost" @click="copyToClipboard(profile.email, 'Email')">
            <span class="copy-icon">📋</span>
            Salin Email
          </button>
          <a :href="profile.cv" class="btn btn--ghost" download>
            Download CV
            <span class="arrow">↓</span>
          </a>
        </div>
      </div>

      <!-- Dev Spec Card -->
      <div class="intro__spec glass" v-spotlight v-reveal="120">
        <div class="spec-header mono">
          <div class="spec-dots">
            <i></i><i></i><i></i>
          </div>
          <span class="spec-title">dev_environment.json</span>
        </div>

        <div class="spec-body mono">
          <div v-for="spec in techSpecs" :key="spec.label" class="spec-row">
            <span class="spec-label">{{ spec.label }}:</span>
            <span class="spec-val">{{ spec.val }}</span>
          </div>

          <div class="spec-footer">
            <div class="spec-quote">
              <span class="quote-sign">"</span>
              Pahami masalahnya, rancang solusinya, tulis kodenya dengan rapi.
              <span class="quote-sign">"</span>
            </div>
            <div class="campus-badge">
              <span class="badge-dot"></span>
              Primakara University · Informatics '24
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Git Commit Graph History (Education & Experience) -->
    <div class="block">
      <SectionHeading
        eyebrow="Git Log History"
        title="Riwayat Pendidikan & Aktivitas (Commit Timeline)."
        description="Jejak langkah akademis dan organisasi yang terdokumentasi seperti riwayat git commit."
      />

      <div class="git-timeline" v-reveal="90">
        <div class="git-branch-line" aria-hidden="true"></div>

        <!-- Commit 1: Primakara -->
        <article class="git-commit glass glass--hover" v-spotlight>
          <div class="commit-node">
            <span class="node-circle active"></span>
            <span class="node-hash mono">commit a8f3c21</span>
          </div>
          <div class="commit-body">
            <div class="commit-meta mono">
              <span class="commit-tag cyan">HEAD -> main</span>
              <span class="commit-tag violet">tag: v2024-present</span>
              <span class="commit-date">{{ education[0].period }}</span>
            </div>
            <h3 class="h3 commit-title">{{ education[0].degree }}</h3>
            <p class="commit-school mono">{{ education[0].school }}</p>
            <p class="commit-note">{{ education[0].note }}</p>
          </div>
        </article>

        <!-- Commit 2: SMA Pekutatan -->
        <article class="git-commit glass glass--hover" v-spotlight>
          <div class="commit-node">
            <span class="node-circle"></span>
            <span class="node-hash mono">commit 5b9e110</span>
          </div>
          <div class="commit-body">
            <div class="commit-meta mono">
              <span class="commit-tag green">tag: v2021-2024</span>
              <span class="commit-date">{{ education[1].period }}</span>
            </div>
            <h3 class="h3 commit-title">{{ education[1].degree }}</h3>
            <p class="commit-school mono">{{ education[1].school }}</p>
            <p class="commit-note">{{ education[1].note }}</p>
          </div>
        </article>

        <!-- Commit 3: Organizations & Creative -->
        <article
          v-for="(org, i) in organizations"
          :key="org.name"
          class="git-commit glass glass--hover"
          v-spotlight
        >
          <div class="commit-node">
            <span class="node-circle amber"></span>
            <span class="node-hash mono">commit {{ i === 0 ? '7d2a45c' : '3f19e88' }}</span>
          </div>
          <div class="commit-body">
            <div class="commit-meta mono">
              <span class="commit-tag amber">feat: {{ org.type }}</span>
              <span class="commit-date">{{ org.period }}</span>
            </div>
            <h3 class="h3 commit-title">{{ org.name }}</h3>
            <p class="commit-school mono">{{ org.role }} · {{ org.org }}</p>
            <ul class="commit-activities">
              <li v-for="act in org.activities" :key="act" class="mono">
                <span class="act-bullet">✓</span> {{ act }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2rem, 5vw, 3.5rem);
  align-items: flex-start;
  padding-block: clamp(1rem, 3vw, 2rem) clamp(3rem, 6vw, 4.5rem);
}

.intro__bio {
  display: grid;
  gap: 1.1rem;
}

.bio-hud-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.76rem;
}

.hud-slash {
  color: #00f2fe;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.hud-status {
  color: #00ff9d;
  font-size: 0.7rem;
}

.intro__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.copy-icon {
  margin-right: 0.35rem;
}

/* DEV SPEC CARD */
.intro__spec {
  background: rgba(12, 16, 24, 0.85);
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.spec-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.15rem;
  background: rgba(16, 21, 32, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.spec-dots {
  display: flex;
  gap: 6px;
}

.spec-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #334155;
}
.spec-dots i:first-child { background: #f87171; }
.spec-dots i:nth-child(2) { background: #facc15; }
.spec-dots i:last-child { background: #4ade80; }

.spec-title {
  color: var(--muted);
  font-size: 0.75rem;
}

.spec-body {
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.8rem;
}

.spec-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
}

.spec-label {
  color: #00f2fe;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.spec-val {
  color: #e2e8f0;
}

.spec-footer {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.spec-quote {
  color: var(--muted);
  font-style: italic;
  line-height: 1.5;
  font-size: 0.82rem;
}

.quote-sign {
  color: #00ff9d;
  font-weight: bold;
}

.campus-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: rgba(0, 242, 254, 0.08);
  border: 1px solid rgba(0, 242, 254, 0.25);
  color: #00f2fe;
  font-size: 0.74rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}

/* GIT COMMIT GRAPH TIMELINE */
.git-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
}

.git-branch-line {
  position: absolute;
  top: 15px;
  bottom: 25px;
  left: 8px;
  width: 2px;
  background: linear-gradient(180deg, #00f2fe 0%, #a855f7 50%, #facc15 100%);
  opacity: 0.6;
}

.git-commit {
  position: relative;
  padding: 1.35rem 1.65rem;
  border-radius: var(--radius);
  background: rgba(12, 16, 24, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.commit-node {
  position: absolute;
  left: -2rem;
  top: 1.5rem;
  display: flex;
  align-items: center;
}

.node-circle {
  position: absolute;
  left: -9px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #07090e;
  border: 2px solid #00f2fe;
  box-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
}

.node-circle.active {
  background: #00f2fe;
  box-shadow: 0 0 12px #00f2fe;
}

.node-circle.amber {
  border-color: #facc15;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.6);
}

.node-hash {
  display: none;
}

.commit-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.45rem;
  font-size: 0.72rem;
}

.commit-tag {
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-weight: 500;
}
.commit-tag.cyan {
  background: rgba(0, 242, 254, 0.12);
  border: 1px solid rgba(0, 242, 254, 0.3);
  color: #00f2fe;
}
.commit-tag.violet {
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #c084fc;
}
.commit-tag.green {
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.3);
  color: #4ade80;
}
.commit-tag.amber {
  background: rgba(250, 204, 21, 0.12);
  border: 1px solid rgba(250, 204, 21, 0.3);
  color: #facc15;
}

.commit-date {
  color: var(--dim);
}

.commit-title {
  color: #fff;
  margin-bottom: 0.2rem;
}

.commit-school {
  color: var(--cyan);
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}

.commit-note {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.6;
}

.commit-activities {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.act-bullet {
  color: #00ff9d;
  font-weight: bold;
  margin-right: 0.3rem;
}

@media (max-width: 980px) {
  .intro {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .git-timeline {
    padding-left: 1.5rem;
  }
  .git-branch-line {
    left: 4px;
  }
  .commit-node {
    left: -1.5rem;
  }
  .node-circle {
    left: -7px;
    width: 12px;
    height: 12px;
  }
}
</style>