<script setup>
import SectionHeading from './SectionHeading.vue'
import { skillCategories } from '../data/skills'
import { techStack } from '../data/techStack'

const iconFor = (name) => techStack.find((tech) => tech.name === name)
</script>

<template>
  <section id="skills" class="section container">
    <SectionHeading
      eyebrow="Skill"
      title="Bahasa pemrograman dan tools yang saya pakai."
      description="Kumpulan teknologi yang saya gunakan untuk membangun proyek — dari bahasa pemrograman sampai tools pendukungnya."
    />

    <div
      v-for="(category, ci) in skillCategories"
      :key="category.id"
      class="cat"
      :style="{ '--accent': category.accent }"
      v-reveal="ci * 60"
    >
      <header class="cat__head">
        <h3 class="h3 cat__title">{{ category.label }}</h3>
        <span class="mono cat__count">{{ category.skills.length }} teknologi</span>
      </header>

      <ul class="skills">
        <li
          v-for="(skill, i) in category.skills"
          :key="skill.name"
          class="skill glass glass--hover"
          :title="skill.note"
          v-spotlight
          v-reveal="i * 60"
        >
          <img
            v-if="iconFor(skill.name)"
            class="skill__logo"
            :src="iconFor(skill.name).icon"
            :alt="`Logo ${skill.name}`"
            loading="lazy"
            decoding="async"
          />
          <span class="skill__name mono">{{ skill.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cat + .cat {
  margin-top: clamp(2rem, 4.5vw, 3rem);
}

.cat__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.15rem;
}

.cat__title {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.cat__title::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent, var(--cyan));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent, var(--cyan)) 14%, transparent);
}

.cat__count {
  color: var(--dim);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* auto-fill keeps the last row at tile size instead of stretching it */
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(118px, 100%), 1fr));
  gap: 12px;
}

.skill {
  display: grid;
  place-items: center;
  gap: 0.65rem;
  padding: 1.25rem 0.75rem 1rem;
  text-align: center;
  min-width: 0;
}

.skill__logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  transition: transform 0.5s var(--spring);
}

@media (hover: hover) {
  .skill:hover .skill__logo {
    transform: scale(1.12) translateY(-2px);
  }
}

.skill__name {
  color: var(--muted);
  font-size: 0.74rem;
  letter-spacing: 0.01em;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .skill {
    padding: 1rem 0.6rem 0.85rem;
  }

  .skill__logo {
    width: 34px;
    height: 34px;
  }
}
</style>
