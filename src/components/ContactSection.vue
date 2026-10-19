<script setup>
import { reactive, ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { contactInfo, profile } from '../data/portfolio'
import { useDevMode } from '../composables/useDevMode'

const { copyToClipboard } = useDevMode()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const state = ref('idle')
const errors = ref({})

const validate = () => {
  const next = {}
  if (!form.name.trim()) next.name = 'Nama wajib diisi.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Format email belum benar.'
  if (!form.subject.trim()) next.subject = 'Subjek wajib diisi.'
  if (form.message.trim().length < 12) next.message = 'Ceritakan sedikit lebih detail (min. 12 karakter).'
  errors.value = next
  return Object.keys(next).length === 0
}

const submit = async () => {
  if (!validate()) return

  state.value = 'sending'

  try {
    await new Promise((resolve) => setTimeout(resolve, 1100))
    state.value = 'sent'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })

    setTimeout(() => {
      if (state.value === 'sent') state.value = 'idle'
    }, 5000)
  } catch {
    state.value = 'error'
  }
}

const reset = () => {
  state.value = 'idle'
}
</script>

<template>
  <section id="contact" class="section container">
    <SectionHeading
      eyebrow="Saluran Kontak"
      title="Mari bicara soal proyek, peluang magang, atau kolaborasi IT."
      :description="`Terbuka untuk diskusi teknis, magang developer, atau proyek freelance. ${profile.availability}.`"
    />

    <div class="contact">
      <!-- Left side: Channels & Socials -->
      <aside class="contact__side">
        <ul class="info">
          <li
            v-for="(item, index) in contactInfo"
            :key="item.label"
            class="info__item glass glass--hover"
            v-spotlight
            v-reveal="index * 70"
          >
            <span class="info__glyph">{{ item.glyph }}</span>
            <div class="info__body">
              <span class="info__label mono">{{ item.label }}</span>
              <a
                :href="item.href"
                class="info__value mono"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener' : undefined"
              >
                {{ item.value }}
              </a>
            </div>
            <button
              v-if="item.value.includes('@') || item.label === 'GitHub'"
              class="copy-mini-btn mono"
              title="Salin"
              @click="copyToClipboard(item.value, item.label)"
            >
              Copy
            </button>
          </li>
        </ul>

        <div class="side-card glass" v-reveal="280">
          <div class="side-card__top mono">
            <span class="side-dot"></span>
            SYS.CREATIVE_LAB
          </div>
          <p>
            Di luar koding kuliah, saya aktif mengeksplorasi audio editing & video lewat De_Krisna Channel serta riset arsitektur Next.js & Vue 3.
          </p>
          <div class="socials">
            <a
              v-for="social in profile.socials"
              :key="social.label"
              :href="social.url"
              class="pill socials__link mono"
              :target="social.url.startsWith('http') ? '_blank' : undefined"
              :rel="social.url.startsWith('http') ? 'noopener' : undefined"
            >
              <span>{{ social.label }}</span>
              <span class="socials__handle">{{ social.handle }}</span>
            </a>
          </div>
        </div>
      </aside>

      <!-- Right side: Terminal Form -->
      <div class="contact__form-wrap glass" v-spotlight v-reveal="120">
        <!-- Terminal Header -->
        <div class="form-chrome mono">
          <div class="form-dots">
            <i></i><i></i><i></i>
          </div>
          <span class="form-chrome__title">dispatch_message.ts</span>
          <span class="form-chrome__status">
            <span class="status-led"></span>
            PING: 24ms
          </span>
        </div>

        <div class="form-inner">
          <transition name="swap" mode="out-in">
            <form v-if="state !== 'sent'" class="form" @submit.prevent="submit" novalidate>
              <div class="form__row">
                <label class="field" :class="{ 'is-invalid': errors.name }">
                  <span class="field__label mono">
                    <span class="prompt-sign">❯</span> nama_pengirim
                  </span>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    autocapitalize="words"
                    placeholder="Nama Anda atau Instansi"
                    @input="errors.name = ''"
                  />
                  <span v-if="errors.name" class="field__error mono">{{ errors.name }}</span>
                </label>

                <label class="field" :class="{ 'is-invalid': errors.email }">
                  <span class="field__label mono">
                    <span class="prompt-sign">❯</span> email_tujuan_balik
                  </span>
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    autocapitalize="none"
                    autocorrect="off"
                    spellcheck="false"
                    placeholder="nama@domain.com"
                    @input="errors.email = ''"
                  />
                  <span v-if="errors.email" class="field__error mono">{{ errors.email }}</span>
                </label>
              </div>

              <label class="field" :class="{ 'is-invalid': errors.subject }">
                <span class="field__label mono">
                  <span class="prompt-sign">❯</span> subjek_keperluan
                </span>
                <input
                  v-model="form.subject"
                  type="text"
                  name="subject"
                  autocomplete="off"
                  placeholder="Contoh: Tawaran Magang Developer / Pembuatan Web"
                  @input="errors.subject = ''"
                />
                <span v-if="errors.subject" class="field__error mono">{{ errors.subject }}</span>
              </label>

              <label class="field" :class="{ 'is-invalid': errors.message }">
                <span class="field__label mono">
                  <span class="prompt-sign">❯</span> rincian_pesan
                </span>
                <textarea
                  v-model="form.message"
                  name="message"
                  rows="6"
                  autocomplete="off"
                  placeholder="Deskripsikan kebutuhan proyek, ruang lingkup, teknologi yang diinginkan..."
                  @input="errors.message = ''"
                ></textarea>
                <span v-if="errors.message" class="field__error mono">{{ errors.message }}</span>
              </label>

              <button
                type="submit"
                class="btn btn--primary form__submit mono"
                :disabled="state === 'sending'"
              >
                <span v-if="state === 'sending'" class="spinner"></span>
                {{ state === 'sending' ? 'Enkripsi & Mengirim...' : 'Kirim Pesan Sekarang 🚀' }}
              </button>

              <p v-if="state === 'error'" class="feedback feedback--error mono">
                ✕ Terjadi kesalahan. Silakan kirim email langsung ke {{ profile.email }}.
              </p>
            </form>

            <div v-else class="success mono">
              <span class="success__glyph">✓</span>
              <h3 class="h3">Transmisi Terkirim!</h3>
              <p>
                Pesan Anda telah berhasil disampaikan. Saya akan merespons dalam {{ profile.availability }}.
              </p>
              <button class="btn btn--ghost btn--sm" @click="reset">Kirim pesan baru</button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 24px;
  align-items: start;
}

.contact__side,
.contact__form-wrap {
  min-width: 0;
}

.contact__side {
  display: grid;
  gap: 16px;
}

.info {
  display: grid;
  gap: 12px;
}

.info__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: rgba(12, 16, 24, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
}

.info__glyph {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(0, 242, 254, 0.25);
  background: rgba(0, 242, 254, 0.08);
  color: #00f2fe;
  font-size: 1.05rem;
}

.info__body {
  flex: 1;
  min-width: 0;
}

.info__label {
  display: block;
  color: var(--dim);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.info__value {
  display: inline-flex;
  align-items: center;
  color: var(--text);
  font-size: 0.88rem;
  overflow-wrap: anywhere;
  transition: color 0.3s;
}

.info__value:hover {
  color: #00f2fe;
}

.copy-mini-btn {
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-mini-btn:hover {
  background: rgba(0, 242, 254, 0.15);
  border-color: #00f2fe;
  color: #00f2fe;
}

.side-card {
  display: grid;
  gap: 0.9rem;
  padding: 1.5rem;
  background: rgba(12, 16, 24, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
}

.side-card__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff9d;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
}

.side-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}

.side-card p {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.7;
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.socials__link {
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 0.9rem;
  color: var(--text);
  font-size: 0.8rem;
  transition: all 0.2s;
}

.socials__link:hover {
  border-color: #00f2fe;
  background: rgba(0, 242, 254, 0.08);
  color: #00f2fe;
}

.socials__handle {
  color: var(--dim);
  font-size: 0.72rem;
}

/* FORM */
.contact__form-wrap {
  background: rgba(12, 16, 24, 0.9);
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
}

.form-chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: rgba(16, 21, 32, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.form-dots {
  display: flex;
  gap: 6px;
}
.form-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #334155;
}
.form-dots i:first-child { background: #f87171; }
.form-dots i:nth-child(2) { background: #facc15; }
.form-dots i:last-child { background: #4ade80; }

.form-chrome__title {
  color: var(--muted);
  font-size: 0.74rem;
}

.form-chrome__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #00ff9d;
  font-size: 0.68rem;
}

.status-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}

.form-inner {
  padding: clamp(1.5rem, 3vw, 2rem);
}

.form {
  display: grid;
  gap: 1.15rem;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field__label {
  font-size: 0.78rem;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.prompt-sign {
  color: #00f2fe;
}

.field input,
.field textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  background: rgba(6, 8, 14, 0.8);
  color: #fff;
  font-size: 0.9rem;
  font-family: inherit;
  transition: all 0.25s;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.25);
  background: rgba(10, 14, 24, 0.95);
}

.field__error {
  color: #f87171;
  font-size: 0.72rem;
}

.form__submit {
  justify-self: start;
  font-size: 0.88rem;
}

.feedback--error {
  color: #f87171;
  font-size: 0.8rem;
}

.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.85rem;
  padding: 2.5rem 1.5rem;
}

.success__glyph {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(0, 255, 157, 0.15);
  border: 1px solid #00ff9d;
  color: #00ff9d;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin-slow 0.8s linear infinite;
  display: inline-block;
  margin-right: 0.4rem;
}

@media (max-width: 760px) {
  .contact {
    grid-template-columns: 1fr;
  }
  .form__row {
    grid-template-columns: 1fr;
  }
}
</style>