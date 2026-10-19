<script setup>
import { profile, navLinks } from '../data/portfolio'
import { useDevMode } from '../composables/useDevMode'

const { openCommandPalette, openTerminal, toggleMatrix } = useDevMode()

const year = new Date().getFullYear()

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const jumpToTerminal = () => {
  openTerminal()
  const el = document.getElementById('terminal')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- CTA Banner -->
      <div class="cta glass" v-spotlight v-reveal>
        <div class="cta__glow" aria-hidden="true"></div>
        <div class="cta__content">
          <span class="eyebrow mono">// INITIATE_COLLABORATION</span>
          <h2 class="h2 cta__title">
            Punya ide atau proyek web?<br />
            <span class="grad-text">Mari kita bangun bersama.</span>
          </h2>
          <p class="lead">
            Terbuka untuk kesempatan magang, freelance developer, atau sekadar berdiskusi seputar rekayasa perangkat lunak dan Next.js.
          </p>
        </div>
        <div class="cta__actions">
          <a href="#contact" class="btn btn--primary mono">
            Mulai Diskusi
            <span class="arrow">→</span>
          </a>
          <a :href="`mailto:${profile.email}`" class="btn btn--ghost mono">{{ profile.email }}</a>
        </div>
      </div>

      <!-- IT Quick Shortcuts Bar -->
      <div class="shortcuts-bar glass mono" v-reveal="60">
        <span class="shortcuts-title">⚡ SHORTCUTS:</span>
        <button class="shortcut-pill" @click="openCommandPalette">
          <kbd>Ctrl</kbd>+<kbd>K</kbd> Command Palette
        </button>
        <button class="shortcut-pill" @click="jumpToTerminal">
          <kbd>💻</kbd> Terminal CLI
        </button>
        <button class="shortcut-pill" @click="toggleMatrix">
          <kbd>🟢</kbd> Matrix Mode
        </button>
        <span class="shortcuts-status">SYS.STATUS: OPERATIONAL [BALI]</span>
      </div>

      <!-- Footer Grid -->
      <div class="footer__grid">
        <div class="footer__brand">
          <span class="brand-mark">
            <img :src="profile.photo" :alt="profile.name" />
          </span>
          <p class="brand-name"><strong>{{ profile.name }}</strong></p>
          <p class="brand-sub mono">{{ profile.role }} · Primakara University, Bali</p>
        </div>

        <div class="footer__col">
          <h4 class="mono">Navigasi</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a :href="`#${link.id}`" class="mono">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="mono">Terhubung</h4>
          <ul>
            <li v-for="social in profile.socials" :key="social.label">
              <a
                :href="social.url"
                class="mono"
                :target="social.url.startsWith('http') ? '_blank' : undefined"
                :rel="social.url.startsWith('http') ? 'noopener' : undefined"
              >
                {{ social.label }} ({{ social.handle }})
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer__bottom mono">
        <p>© {{ year }} {{ profile.name }} — Built with Vue 3, Vite & JetBrains Mono.</p>
        <button class="footer__top mono" @click="scrollToTop">Kembali ke atas ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: clamp(60px, 8vw, 100px);
  padding-bottom: 2rem;
  padding-bottom: calc(2rem + var(--safe-b));
  border-top: 1px solid var(--border);
}

.cta {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding: clamp(2rem, 4vw, 3.25rem);
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: rgba(12, 16, 24, 0.9);
  border: 1px solid rgba(0, 242, 254, 0.25);
}

.cta__glow {
  position: absolute;
  inset: -40% 20% 40% -10%;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(124, 92, 255, 0.15) 50%, transparent 70%);
  filter: blur(70px);
  opacity: 0.7;
  pointer-events: none;
}

.cta__content {
  position: relative;
  display: grid;
  gap: 1rem;
  max-width: 48ch;
}

.cta__title {
  margin-top: 0.25rem;
}

.cta__actions {
  position: relative;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* SHORTCUTS BAR */
.shortcuts-bar {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.25rem;
  margin-top: 2rem;
  border-radius: var(--radius);
  background: rgba(12, 16, 24, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: nowrap;
}

.shortcuts-title {
  color: #00f2fe;
  font-weight: 600;
}

.shortcut-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: inherit;
}

.shortcut-pill:hover {
  background: rgba(0, 242, 254, 0.12);
  border-color: #00f2fe;
  color: #00f2fe;
}

.shortcut-pill kbd {
  display: inline-block;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.68rem;
}

.shortcuts-status {
  margin-left: auto;
  color: #00ff9d;
  font-size: 0.7rem;
}

/* FOOTER GRID */
.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2rem;
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  margin-top: 2rem;
  border-top: 1px solid var(--border);
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 2px;
  border-radius: 12px;
  background: var(--gradient);
  overflow: hidden;
  margin-bottom: 0.85rem;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  border-radius: 10px;
}

.brand-name {
  color: #fff;
  font-size: 1rem;
}

.brand-sub {
  color: var(--dim);
  font-size: 0.78rem;
  margin-top: 0.25rem;
}

.footer__col h4 {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #00f2fe;
  margin-bottom: 1rem;
}

.footer__col ul {
  display: grid;
  gap: 0.25rem;
}

.footer__col a {
  display: inline-flex;
  align-items: center;
  color: var(--muted);
  font-size: 0.82rem;
  padding-block: 0.35rem;
  transition: color 0.25s, transform 0.25s;
}

.footer__col a:hover {
  color: #00f2fe;
  transform: translateX(4px);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
  color: var(--dim);
  font-size: 0.78rem;
}

.footer__top {
  color: var(--muted);
  cursor: pointer;
  transition: color 0.25s;
}

.footer__top:hover {
  color: #00f2fe;
}

@media (max-width: 760px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
  .shortcuts-status {
    display: none;
  }
}

@media (max-width: 640px) {
  .cta__actions {
    flex-direction: column;
    align-items: stretch;
  }
  .cta__actions .btn {
    justify-content: center;
  }
}

@media (max-width: 460px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
