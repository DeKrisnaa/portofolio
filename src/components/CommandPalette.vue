<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { profile } from '../data/portfolio'
import { useDevMode } from '../composables/useDevMode'

const {
  isCommandPaletteOpen,
  closeCommandPalette,
  openTerminal,
  toggleMatrix,
  copyToClipboard
} = useDevMode()

const search = ref('')
const selectedIndex = ref(0)
const inputEl = ref(null)

const commands = [
  {
    id: 'nav-home',
    category: 'Navigasi',
    icon: '⚡',
    title: 'Ke Halaman Utama (Hero)',
    desc: 'Kembali ke bagian paling atas',
    action: () => {
      window.location.hash = '#home'
      closeCommandPalette()
    }
  },
  {
    id: 'nav-about',
    category: 'Navigasi',
    icon: '◈',
    title: 'Tentang DeKrisna',
    desc: 'Profil, biografi, dan riwayat pendidikan Informatika',
    action: () => {
      window.location.hash = '#about'
      closeCommandPalette()
    }
  },
  {
    id: 'nav-skills',
    category: 'Navigasi',
    icon: '⚙',
    title: 'Tech Stack & Skills',
    desc: 'Next.js, TypeScript, Vue, Tailwind, Git, MySQL',
    action: () => {
      window.location.hash = '#skills'
      closeCommandPalette()
    }
  },
  {
    id: 'nav-projects',
    category: 'Navigasi',
    icon: '🚀',
    title: 'Daftar Proyek (Portfolio Showcase)',
    desc: 'SmartCash dan karya engineering web',
    action: () => {
      window.location.hash = '#projects'
      closeCommandPalette()
    }
  },
  {
    id: 'nav-contact',
    category: 'Navigasi',
    icon: '✉',
    title: 'Kontak & Diskusi',
    desc: 'Kirim pesan atau hubungi lewat email',
    action: () => {
      window.location.hash = '#contact'
      closeCommandPalette()
    }
  },
  {
    id: 'dev-terminal',
    category: 'Developer Tools',
    icon: '💻',
    title: 'Buka Terminal Developer (CLI)',
    desc: 'Jalankan perintah interaktif neofetch, skills, bio',
    action: () => {
      closeCommandPalette()
      openTerminal()
      const term = document.getElementById('terminal-section')
      if (term) term.scrollIntoView({ behavior: 'smooth' })
    }
  },
  {
    id: 'dev-matrix',
    category: 'Developer Tools',
    icon: '🟢',
    title: 'Toggle Matrix Rain Mode',
    desc: 'Aktifkan efek hujan kode digital cyberpunk',
    action: () => {
      closeCommandPalette()
      toggleMatrix()
    }
  },
  {
    id: 'act-copy-email',
    category: 'Aksi Cepat',
    icon: '📋',
    title: 'Salin Alamat Email',
    desc: profile.email,
    action: () => {
      copyToClipboard(profile.email, 'Email')
      closeCommandPalette()
    }
  },
  {
    id: 'act-cv',
    category: 'Aksi Cepat',
    icon: '📄',
    title: 'Download Curriculum Vitae (CV)',
    desc: 'Format PDF resmi DeKrisna',
    action: () => {
      window.open(profile.cv, '_blank')
      closeCommandPalette()
    }
  },
  {
    id: 'act-github',
    category: 'Aksi Cepat',
    icon: '⌥',
    title: 'Kunjungi Profil GitHub',
    desc: 'https://github.com/' + profile.handle,
    action: () => {
      window.open('https://github.com/' + profile.handle, '_blank')
      closeCommandPalette()
    }
  }
]

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return commands
  return commands.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  )
})

watch(isCommandPaletteOpen, async (isOpen) => {
  if (isOpen) {
    search.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
})

const onKeyDown = (e) => {
  if (!isCommandPaletteOpen.value) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      isCommandPaletteOpen.value = true
    }
    return
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    closeCommandPalette()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (selectedIndex.value < filtered.value.length - 1) {
      selectedIndex.value++
    } else {
      selectedIndex.value = 0
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (selectedIndex.value > 0) {
      selectedIndex.value--
    } else {
      selectedIndex.value = filtered.value.length - 1
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[selectedIndex.value]
    if (item) item.action()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isCommandPaletteOpen"
        class="cmd-backdrop"
        @click.self="closeCommandPalette"
      >
        <div class="cmd-window glass">
          <!-- Input Bar -->
          <div class="cmd-search">
            <span class="cmd-search__icon mono">❯_</span>
            <input
              ref="inputEl"
              v-model="search"
              type="text"
              placeholder="Cari halaman, perintah, atau aksi... (Esc untuk tutup)"
              class="cmd-search__input"
            />
            <span class="cmd-badge mono">ESC</span>
          </div>

          <!-- Command List -->
          <div class="cmd-list">
            <div v-if="filtered.length === 0" class="cmd-empty mono">
              Perintah tidak ditemukan untuk "{{ search }}"
            </div>
            <div
              v-for="(cmd, idx) in filtered"
              :key="cmd.id"
              class="cmd-item"
              :class="{ 'is-selected': selectedIndex === idx }"
              @mouseenter="selectedIndex = idx"
              @click="cmd.action"
            >
              <span class="cmd-item__icon">{{ cmd.icon }}</span>
              <div class="cmd-item__content">
                <div class="cmd-item__title">
                  {{ cmd.title }}
                  <span class="cmd-item__cat mono">{{ cmd.category }}</span>
                </div>
                <div class="cmd-item__desc">{{ cmd.desc }}</div>
              </div>
              <span class="cmd-item__arrow mono">↵</span>
            </div>
          </div>

          <!-- Footer Tips -->
          <div class="cmd-footer mono">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigasi</span>
            <span><kbd>↵</kbd> Jalankan</span>
            <span><kbd>ESC</kbd> Batal</span>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(4, 6, 10, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(3rem, 12vh, 6rem) 1rem 1rem;
}

.cmd-window {
  width: 100%;
  max-width: 640px;
  background: rgba(11, 14, 22, 0.95);
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cmd-search {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.15rem 1.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cmd-search__icon {
  color: #00f2fe;
  font-size: 1.1rem;
  font-weight: bold;
}

.cmd-search__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.05rem;
  font-family: var(--font-body);
}

.cmd-badge {
  font-size: 0.68rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--dim);
}

.cmd-list {
  max-height: 380px;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cmd-empty {
  padding: 2rem;
  text-align: center;
  color: var(--dim);
  font-size: 0.85rem;
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.cmd-item.is-selected {
  background: rgba(0, 242, 254, 0.08);
  border-color: rgba(0, 242, 254, 0.2);
}

.cmd-item__icon {
  font-size: 1.25rem;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}

.cmd-item__content {
  flex: 1;
  min-width: 0;
}

.cmd-item__title {
  color: #fff;
  font-weight: 500;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.cmd-item__cat {
  font-size: 0.66rem;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--cyan);
  text-transform: uppercase;
}

.cmd-item__desc {
  font-size: 0.78rem;
  color: var(--dim);
  margin-top: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cmd-item__arrow {
  color: var(--dim);
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.15s;
}

.cmd-item.is-selected .cmd-item__arrow {
  opacity: 1;
  color: #00f2fe;
}

.cmd-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.25rem;
  padding: 0.65rem 1.25rem;
  background: rgba(14, 18, 28, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.7rem;
  color: var(--dim);
}

.cmd-footer kbd {
  display: inline-block;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--muted);
  font-family: inherit;
  margin-right: 0.25rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
