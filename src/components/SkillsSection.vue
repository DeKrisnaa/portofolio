<script setup>
import { computed, ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { skillCategories } from '../data/skills'
import { techStack } from '../data/techStack'

const activeFilter = ref('all')

const iconFor = (name) => techStack.find((tech) => tech.name === name)

// Flatten all skills with category info
const allSkills = computed(() => {
  const list = []
  skillCategories.forEach((cat) => {
    cat.skills.forEach((s) => {
      const match = iconFor(s.name)
      list.push({
        ...s,
        categoryId: cat.id,
        categoryLabel: cat.label,
        accent: cat.accent,
        color: match?.color || '#00f2fe',
        icon: match?.icon || ''
      })
    })
  })
  return list
})

const filteredSkills = computed(() => {
  if (activeFilter.value === 'all') return allSkills.value
  return allSkills.value.filter((s) => s.categoryId === activeFilter.value)
})

const roadmapItems = [
  { name: 'Docker', role: 'Containerization & DevOps' },
  { name: 'Go (Golang)', role: 'High-perf microservices' },
  { name: 'Supabase', role: 'PostgreSQL Backend-as-a-Service' },
  { name: 'Cloudflare', role: 'Edge Computing & Workers' }
]
</script>

<template>
  <section id="skills" class="section container">
    <SectionHeading
      eyebrow="Tech Stack & Arsenal"
      title="Teknologi dan tools yang saya gunakan untuk rekayasa web."
      description="Kombinasi bahasa pemrograman modern, framework reaktif, serta tools pendukung deployment dan kolaborasi tim."
    />

    <!-- Filter Buttons -->
    <div class="filter-tabs mono" v-reveal>
      <button
        class="filter-btn"
        :class="{ 'is-active': activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        <span>◈ Semua Stack ({{ allSkills.length }})</span>
      </button>
      <button
        v-for="cat in skillCategories"
        :key="cat.id"
        class="filter-btn"
        :class="{ 'is-active': activeFilter === cat.id }"
        @click="activeFilter = cat.id"
      >
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- Skills Grid -->
    <div class="skills-grid" v-reveal="60">
      <div
        v-for="(skill, idx) in filteredSkills"
        :key="skill.name"
        class="skill-card glass glass--hover"
        :style="{ '--brand-color': skill.color }"
        v-spotlight
      >
        <div class="skill-card__glow" aria-hidden="true"></div>
        <div class="skill-card__top">
          <div class="skill-card__icon-wrap">
            <img
              v-if="skill.icon"
              :src="skill.icon"
              :alt="`Logo ${skill.name}`"
              class="skill-card__icon"
              loading="lazy"
            />
            <span v-else class="skill-card__fallback mono">{{ skill.name.slice(0, 2) }}</span>
          </div>
          <span class="skill-card__cat mono">{{ skill.categoryLabel.split(' ')[0] }}</span>
        </div>

        <div class="skill-card__body">
          <h4 class="skill-card__name mono">{{ skill.name }}</h4>
          <p class="skill-card__note">{{ skill.note }}</p>
        </div>

        <div class="skill-card__footer">
          <div class="skill-bar">
            <div class="skill-bar__fill"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Currently Exploring / Roadmap Card -->
    <div class="roadmap-card glass" v-spotlight v-reveal="120">
      <div class="roadmap-head">
        <div class="roadmap-badge mono">
          <span class="roadmap-dot"></span>
          EXPLORING_ROADMAP // NEXT HORIZON
        </div>
        <span class="roadmap-sub mono">Teknologi yang sedang saya pelajari & eksplorasi:</span>
      </div>

      <div class="roadmap-tags">
        <div v-for="item in roadmapItems" :key="item.name" class="roadmap-tag glass mono">
          <span class="tag-arrow">⚡</span>
          <strong class="tag-name">{{ item.name }}</strong>
          <span class="tag-role">{{ item.role }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* FILTER TABS */
.filter-tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.45rem 1rem;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.25s;
}

.filter-btn:hover {
  background: rgba(0, 242, 254, 0.08);
  border-color: rgba(0, 242, 254, 0.3);
  color: #00f2fe;
}

.filter-btn.is-active {
  background: rgba(0, 242, 254, 0.15);
  border-color: #00f2fe;
  color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
}

/* SKILLS GRID */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 16px;
}

.skill-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  background: rgba(12, 16, 24, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-card__glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 90px;
  height: 90px;
  background: radial-gradient(circle, var(--brand-color, #00f2fe) 0%, transparent 70%);
  opacity: 0.05;
  transition: opacity 0.3s;
  pointer-events: none;
}

.skill-card:hover {
  border-color: var(--brand-color, #00f2fe);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px color-mix(in srgb, var(--brand-color, #00f2fe) 20%, transparent);
  transform: translateY(-4px);
}

.skill-card:hover .skill-card__glow {
  opacity: 0.18;
}

.skill-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.skill-card__icon-wrap {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: transform 0.3s;
}

.skill-card:hover .skill-card__icon-wrap {
  transform: scale(1.08);
  border-color: var(--brand-color, #00f2fe);
}

.skill-card__icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.skill-card__fallback {
  color: var(--cyan);
  font-weight: bold;
}

.skill-card__cat {
  font-size: 0.68rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--dim);
}

.skill-card__name {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.skill-card__note {
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.skill-card__footer {
  margin-top: 1.1rem;
}

.skill-bar {
  width: 100%;
  height: 3px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.skill-bar__fill {
  width: 85%;
  height: 100%;
  background: var(--brand-color, #00f2fe);
  border-radius: 99px;
  opacity: 0.7;
}

/* ROADMAP CARD */
.roadmap-card {
  margin-top: 2.5rem;
  padding: clamp(1.5rem, 3vw, 2rem);
  background: rgba(10, 13, 20, 0.85);
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: var(--radius-lg);
}

.roadmap-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.roadmap-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: #00ff9d;
  font-size: 0.75rem;
}

.roadmap-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
  animation: pulse-dot 1.8s infinite;
}

.roadmap-sub {
  color: var(--dim);
  font-size: 0.78rem;
}

.roadmap-tags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 12px;
}

.roadmap-tag {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
}

.tag-arrow {
  color: #facc15;
}

.tag-name {
  color: #fff;
}

.tag-role {
  color: var(--dim);
  font-size: 0.72rem;
  margin-left: auto;
}

@media (max-width: 640px) {
  .tag-role {
    display: none;
  }
}
</style>
