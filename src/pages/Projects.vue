<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects, projectFilters } from '../data/portfolio'

const activeFilter = ref('Semua')

const filtered = computed(() =>
  activeFilter.value === 'Semua'
    ? projects
    : projects.filter((project) => project.category === activeFilter.value)
)

const countFor = (filter) =>
  filter === 'Semua' ? projects.length : projects.filter((p) => p.category === filter).length
</script>

<template>
  <div>
    <section class="container page-head">
      <span class="eyebrow" v-reveal>Karya</span>
      <h1 class="display page-head__title" v-reveal="70">
        Proyek yang saya <span class="grad-text">bangun</span> untuk belajar dan menyelesaikan masalah.
      </h1>
      <p class="lead" v-reveal="140">
        Sebagian proyek kuliah, sebagian proyek pribadi, dan beberapa untuk client kecil. Setiap
        project saya lengkapi dengan catatan apa yang berhasil dan apa yang perlu diperbaiki.
      </p>
    </section>

    <section class="container toolbar" v-reveal="200">
      <div class="filters" role="tablist" aria-label="Filter kategori proyek">
        <button
          v-for="filter in projectFilters"
          :key="filter"
          type="button"
          role="tab"
          class="filters__btn"
          :class="{ 'is-active': activeFilter === filter }"
          :aria-selected="activeFilter === filter"
          @click="activeFilter = filter"
        >
          {{ filter }}
          <span class="filters__count">{{ countFor(filter) }}</span>
        </button>
      </div>
      <span class="mono toolbar__result">{{ filtered.length }} project ditampilkan</span>
    </section>

    <section class="container">
      <transition-group name="list" tag="div" class="projects-grid">
        <ProjectCard
          v-for="(project, index) in filtered"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </transition-group>

      <div v-if="!filtered.length" class="empty glass">
        <span class="empty__glyph">◌</span>
        <p>Belum ada project untuk kategori ini.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head {
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: 1.25rem;
  max-width: 900px;
}

.page-head__title {
  max-width: 20ch;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 2.5rem;
}

.filters {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.3rem;
  border: 1px solid var(--border);
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
  max-width: 100%;
}

.filters__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: var(--tap);
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  color: var(--muted);
  transition: color 0.3s, background 0.3s;
}

@media (hover: hover) {
  .filters__btn:hover {
    color: var(--text);
  }
}

.filters__btn.is-active {
  color: #08080b;
  background: var(--gradient);
  font-weight: 600;
}

.filters__count {
  padding: 0.05rem 0.4rem;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.filters__btn.is-active .filters__count {
  background: rgba(8, 8, 11, 0.18);
}

.toolbar__result {
  color: var(--dim);
  font-size: 0.72rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.empty {
  display: grid;
  place-items: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  color: var(--muted);
}

.empty__glyph {
  font-size: 2.5rem;
  color: var(--dim);
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.list-leave-active {
  position: absolute;
  width: calc(33.333% - 14px);
}

@media (max-width: 980px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .list-leave-active {
    width: calc(50% - 10px);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .list-leave-active {
    width: 100%;
  }

  .filters {
    width: 100%;
  }

  .filters__btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
