<script setup>
import { RouterLink } from 'vue-router'
import { profile, navLinks } from '../data/portfolio'

const year = new Date().getFullYear()

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="cta glass" v-spotlight v-reveal>
        <div class="cta__glow" aria-hidden="true"></div>
        <div class="cta__content">
          <span class="eyebrow">Kolaborasi</span>
          <h2 class="h2 cta__title">
            Punya ide atau proyek?<br />
            <span class="grad-text">Mari kita wujudkan.</span>
          </h2>
          <p class="lead">
            Saya terbuka untuk magang, freelance, atau sekadar diskusi soal teknologi web dan data.
          </p>
        </div>
        <div class="cta__actions">
          <RouterLink to="/contact" class="btn btn--primary">
            Mulai diskusi
            <span class="arrow">→</span>
          </RouterLink>
          <a :href="`mailto:${profile.email}`" class="btn btn--ghost">{{ profile.email }}</a>
        </div>
      </div>

      <div class="footer__grid">
        <div class="footer__brand">
          <span class="brand-mark">
            <img :src="profile.photo" :alt="profile.name" />
          </span>
          <p>{{ profile.name }} — {{ profile.title }} · {{ profile.location }}</p>
        </div>

        <div class="footer__col">
          <h4>Navigasi</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Terhubung</h4>
          <ul>
            <li v-for="social in profile.socials" :key="social.label">
              <a
                :href="social.url"
                :target="social.url.startsWith('http') ? '_blank' : undefined"
                :rel="social.url.startsWith('http') ? 'noopener' : undefined"
                >{{ social.label }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="mono">© {{ year }} {{ profile.name }} — Dibangun dengan Vue.js & kopi.</p>
        <button class="footer__top" @click="scrollToTop">Kembali ke atas ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: clamp(60px, 8vw, 100px);
  padding-bottom: 2rem;
  /* keeps the last row clear of the iOS home indicator */
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
}

.cta__glow {
  position: absolute;
  inset: -40% 20% 40% -10%;
  background: var(--gradient-soft);
  filter: blur(70px);
  opacity: 0.7;
  pointer-events: none;
  animation: drift 18s ease-in-out infinite;
}

.cta__content {
  position: relative;
  display: grid;
  gap: 1rem;
  max-width: 46ch;
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

.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2rem;
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  border-top: 1px solid var(--border);
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 2px;
  border-radius: 14px;
  background: var(--gradient);
  overflow: hidden;
  margin-bottom: 1rem;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  border-radius: 12px;
}

.footer__brand p {
  color: var(--muted);
  font-size: 0.92rem;
  max-width: 32ch;
}

.footer__col h4 {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
  font-weight: 400;
  margin-bottom: 1rem;
}

.footer__col ul {
  display: grid;
  gap: 0.15rem;
}

.footer__col a {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap);
  color: var(--muted);
  font-size: 0.92rem;
  transition: color 0.3s, padding-left 0.3s;
}

@media (hover: hover) {
  .footer__col a:hover {
    color: var(--text);
    padding-left: 4px;
  }
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
}

.footer__top {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap);
  font-size: 0.8rem;
  color: var(--muted);
  transition: color 0.3s;
}

.footer__top:hover {
  color: var(--cyan);
}
@media (max-width: 760px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }

  .cta__actions {
    width: 100%;
  }

  .cta__actions .btn {
    flex: 1;
  }
}

@media (max-width: 640px) {
  /* side-by-side buttons squeeze their labels past the nowrap cutoff */
  .cta__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta__actions .btn {
    justify-content: center;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}

@media (max-width: 460px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
