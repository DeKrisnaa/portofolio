<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { navLinks, profile, sections } from '../data/portfolio'
import { useActiveSection } from '../composables/useActiveSection'

const scrolled = ref(false)
const open = ref(false)
const progress = ref(0)
const active = useActiveSection(sections)

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 14
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(y / max, 1) : 0
}

// closing on Escape and when the viewport grows past the burger breakpoint
const onKey = (event) => {
  if (event.key === 'Escape') open.value = false
}

const desktop = window.matchMedia('(min-width: 901px)')
const onDesktop = (event) => {
  if (event.matches) open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  desktop.addEventListener('change', onDesktop)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  desktop.removeEventListener('change', onDesktop)
})

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="header__bar container">
      <a href="#home" class="brand" aria-label="Kembali ke atas">
        <span class="brand__mark">
          <img :src="profile.photo" :alt="profile.name" />
        </span>
        <span class="brand__text">
          <strong>{{ profile.name }}</strong>
          <em>{{ profile.role }}</em>
        </span>
      </a>

      <nav class="nav" aria-label="Navigasi utama">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav__link"
          :class="{ 'is-active': active === link.id }"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="header__actions">
        <span class="pill status-pill">
          <i class="dot"></i>
          <span>Open to work</span>
        </span>
        <a href="#contact" class="btn btn--primary btn--sm header__cta">
          Hire me
          <span class="arrow">→</span>
        </a>
        <button
          class="burger"
          :class="{ 'is-open': open }"
          :aria-label="open ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div class="header__progress" :style="{ transform: `scaleX(${progress})` }"></div>

    <Teleport to="body">
      <transition name="sheet">
        <div v-if="open" class="sheet">
          <nav class="sheet__nav">
            <a
              v-for="(link, i) in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="sheet__link"
              :class="{ 'is-active': active === link.id }"
              :style="{ animationDelay: `${i * 55 + 90}ms` }"
              @click="open = false"
            >
              <span class="mono">0{{ i + 1 }}</span>
              {{ link.label }}
            </a>
          </nav>
          <div class="sheet__foot">
            <a :href="`mailto:${profile.email}`" class="sheet__mail">{{ profile.email }}</a>
            <div class="sheet__socials">
              <a
                v-for="social in profile.socials"
                :key="social.label"
                :href="social.url"
                class="pill"
                :target="social.url.startsWith('http') ? '_blank' : undefined"
                :rel="social.url.startsWith('http') ? 'noopener' : undefined"
              >
                {{ social.label }}
              </a>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid transparent;
  transition: background 0.3s var(--ease), border-color 0.3s, backdrop-filter 0.3s;
}

.header.is-scrolled {
  background: rgba(10, 10, 15, 0.8);
  border-bottom-color: var(--border);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
}

.header.is-open {
  background: rgba(10, 10, 15, 0.95);
  border-bottom-color: var(--border);
  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);
}

.header__bar {
  height: var(--header-total);
  padding-top: var(--safe-t);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.7rem);
  flex-shrink: 0;
  min-height: var(--tap);
}

.brand__mark {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(32px, 8vw, 40px);
  height: clamp(32px, 8vw, 40px);
  padding: 2px;
  border-radius: var(--radius);
  background: var(--gradient);
  box-shadow: 0 8px 20px -12px rgba(124, 92, 255, 0.8);
  overflow: hidden;
}

.brand__mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  border-radius: calc(var(--radius) - 2px);
}

.brand__text {
  display: grid;
  line-height: 1.15;
}

.brand__text strong {
  font-family: var(--font-display);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand__text em {
  font-style: normal;
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1.5vw, 0.72rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  border: 1px solid var(--border);
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
}

.nav__link {
  position: relative;
  padding: clamp(0.4rem, 1vw, 0.5rem) clamp(0.85rem, 2vw, 1rem);
  border-radius: 99px;
  font-size: clamp(0.8rem, 1.8vw, 0.88rem);
  color: var(--muted);
  transition: color 0.25s, background 0.25s;
  min-height: var(--tap);
  display: inline-flex;
  align-items: center;
}

.nav__link:hover {
  color: var(--text);
}

.nav__link.is-active {
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: clamp(0.4rem, 1vw, 0.6rem);
}

.header__progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  transform-origin: left;
  background: var(--gradient);
  transition: transform 0.12s linear;
}

.burger {
  display: none;
  width: var(--tap);
  height: var(--tap);
  flex-shrink: 0;
  border: 1.5px solid var(--border-strong);
  border-radius: 999px;
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s;
}

.burger:active {
  background: rgba(255, 255, 255, 0.08);
}

.burger span {
  position: absolute;
  left: 50%;
  width: 16px;
  height: 1.5px;
  background: var(--text);
  border-radius: 1px;
  transform: translateX(-50%);
  transition: transform 0.3s var(--spring), opacity 0.2s;
}

.burger span:first-child {
  top: 50%;
  margin-top: -5px;
}

.burger span:last-child {
  bottom: 50%;
  margin-bottom: -5px;
}

.burger.is-open span:first-child {
  transform: translateX(-50%) translateY(3.5px) rotate(45deg);
}

.burger.is-open span:last-child {
  transform: translateX(-50%) translateY(-3.5px) rotate(-45deg);
}

.sheet {
  position: fixed;
  inset: 0;
  z-index: 95;
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(14px, 4vw, 24px);
  padding-top: calc(var(--header-total) + clamp(1rem, 3vw, 1.5rem));
  padding-left: max(clamp(14px, 4vw, 24px), var(--safe-l));
  padding-right: max(clamp(14px, 4vw, 24px), var(--safe-r));
  padding-bottom: calc(clamp(1.5rem, 4vw, 2.5rem) + var(--safe-b));
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 2rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.sheet__nav {
  display: grid;
  gap: 0.15rem;
}

.sheet__link {
  display: flex;
  align-items: baseline;
  gap: clamp(0.75rem, 2vw, 1rem);
  min-height: var(--tap);
  padding: clamp(0.7rem, 2vw, 0.9rem) 0;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 6vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--muted);
  transition: color 0.25s;
  opacity: 0;
  transform: translateY(12px);
  animation: sheet-in 0.45s var(--ease) forwards;
}

.sheet__link:active {
  color: var(--text);
}

.sheet__link.is-active {
  color: var(--text);
}

.sheet__link .mono {
  color: var(--dim);
  font-size: clamp(0.65rem, 1.5vw, 0.75rem);
}

.sheet__mail {
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  color: var(--text);
  overflow-wrap: anywhere;
  min-height: var(--tap);
  display: flex;
  align-items: center;
}

.sheet__socials {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.4rem, 1.5vw, 0.6rem);
  margin-top: clamp(0.75rem, 2vw, 1rem);
}

.sheet__foot {
  margin-top: auto;
  padding-top: clamp(1rem, 3vw, 1.5rem);
  opacity: 0;
  animation: sheet-in 0.45s var(--ease) 0.3s forwards;
}

@keyframes sheet-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.3s ease, transform 0.35s var(--ease);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 900px) {
  .nav,
  .status-pill,
  .header__cta {
    display: none;
  }

  .burger {
    display: block;
  }

  .header__bar {
    gap: 0.75rem;
  }
}

/* landscape phones and short windows: keep the menu scrollable, not cramped */
@media (max-height: 560px) {
  .sheet {
    /* still has to clear the header, the sheet sits behind it */
    padding-top: calc(var(--header-total) + 0.75rem);
    gap: 1.25rem;
  }

  .sheet__link {
    padding: 0.5rem 0;
    font-size: 1.35rem;
  }
}

@media (max-width: 400px) {
  .brand__text {
    display: none;
  }
}

/* iPad and other wide touch screens still get the desktop nav, so it
   needs to clear the tap-target floor too */
@media (hover: none) and (min-width: 901px) {
  .nav__link,
  .header__cta {
    min-height: var(--tap);
    display: inline-flex;
    align-items: center;
  }
}
</style>
