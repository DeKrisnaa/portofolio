<script setup>
import { reactive, ref } from 'vue'
import SectionHeading from '../components/SectionHeading.vue'
import { contactInfo, profile } from '../data/portfolio'

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
  } catch (error) {
    state.value = 'error'
  }
}

const reset = () => {
  state.value = 'idle'
}
</script>

<template>
  <div>
    <section class="container page-head">
      <span class="eyebrow" v-reveal>Kontak</span>
      <h1 class="display page-head__title" v-reveal="70">
        Mari <span class="grad-text">bicara</span> soal proyek atau peluang magang.
      </h1>
      <p class="lead" v-reveal="140">
        Saya cukup sering membuka email. Ceritakan sedikit tentang kebutuhanmu, dan saya akan balas
        dengan pertanyaan yang tepat. {{ profile.availability }}.
      </p>
    </section>

    <section class="container contact">
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
            <div>
              <span class="info__label mono">{{ item.label }}</span>
              <a
                :href="item.href"
                class="info__value"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener' : undefined"
                >{{ item.value }}</a
              >
            </div>
          </li>
        </ul>

        <div class="side-card glass" v-reveal="280">
          <span class="eyebrow">Di luar jam kuliah</span>
          <p>
            Saya aktif membuat konten kreatif lewat De_Krisna Channel dan senang berdiskusi soal
            Next.js, desain antarmuka, atau cara belajar web development secara efektif.
          </p>
          <div class="socials">
            <a
              v-for="social in profile.socials"
              :key="social.label"
              :href="social.url"
              class="pill socials__link"
              :target="social.url.startsWith('http') ? '_blank' : undefined"
              :rel="social.url.startsWith('http') ? 'noopener' : undefined"
            >
              {{ social.label }}
              <span class="socials__handle">{{ social.handle }}</span>
            </a>
          </div>
        </div>
      </aside>

      <div class="contact__form-wrap glass" v-spotlight v-reveal="120">
        <transition name="swap" mode="out-in">
          <form v-if="state !== 'sent'" class="form" @submit.prevent="submit" novalidate>
            <div class="form__row">
              <label class="field" :class="{ 'is-invalid': errors.name }">
                <span class="field__label">Nama</span>
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  autocapitalize="words"
                  placeholder="Nama lengkap"
                  @input="errors.name = ''"
                />
                <span v-if="errors.name" class="field__error">{{ errors.name }}</span>
              </label>

              <label class="field" :class="{ 'is-invalid': errors.email }">
                <span class="field__label">Email</span>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  autocapitalize="none"
                  autocorrect="off"
                  spellcheck="false"
                  placeholder="nama@email.com"
                  @input="errors.email = ''"
                />
                <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
              </label>
            </div>

            <label class="field" :class="{ 'is-invalid': errors.subject }">
              <span class="field__label">Subjek</span>
              <input
                v-model="form.subject"
                type="text"
                name="subject"
                autocomplete="off"
                placeholder="Contoh: Website untuk UMKM"
                @input="errors.subject = ''"
              />
              <span v-if="errors.subject" class="field__error">{{ errors.subject }}</span>
            </label>

            <label class="field" :class="{ 'is-invalid': errors.message }">
              <span class="field__label">Pesan</span>
              <textarea
                v-model="form.message"
                name="message"
                rows="6"
                autocomplete="off"
                placeholder="Ceritakan kebutuhan, target waktu, dan kisaran budget (jika ada)."
                @input="errors.message = ''"
              ></textarea>
              <span v-if="errors.message" class="field__error">{{ errors.message }}</span>
            </label>

            <button type="submit" class="btn btn--primary form__submit" :disabled="state === 'sending'">
              <span v-if="state === 'sending'" class="spinner"></span>
              {{ state === 'sending' ? 'Mengirim...' : 'Kirim pesan' }}
              <span v-if="state !== 'sending'" class="arrow">→</span>
            </button>

            <p v-if="state === 'error'" class="feedback feedback--error">
              Terjadi kesalahan. Coba lagi atau kirim email langsung ke {{ profile.email }}.
            </p>
          </form>

          <div v-else class="success">
            <span class="success__glyph">✓</span>
            <h3 class="h3">Pesan terkirim!</h3>
            <p>
              Terima kasih sudah menghubungi. Saya akan membalas {{ profile.availability }}.
            </p>
            <button class="btn btn--ghost" @click="reset">Kirim pesan lain</button>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head {
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: 1.25rem;
  max-width: 880px;
}

.page-head__title {
  max-width: 20ch;
}

.contact {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 24px;
  align-items: start;
  padding-bottom: 2rem;
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
  min-width: 0;
}

.info__glyph {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--cyan);
  font-size: 1.05rem;
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
  min-height: var(--tap);
  color: var(--text);
  font-size: 0.95rem;
  overflow-wrap: anywhere;
  transition: color 0.3s;
}

@media (hover: hover) {
  .info__value:hover {
    color: var(--cyan);
  }
}

.side-card {
  display: grid;
  gap: 0.9rem;
  padding: 1.5rem;
  margin-top: 4px;
}

.side-card p {
  color: var(--muted);
  font-size: 0.92rem;
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
  min-height: var(--tap);
  padding: 0.6rem 0.9rem;
  color: var(--text);
  transition: border-color 0.3s, background 0.3s, transform 0.3s var(--ease);
}

@media (hover: hover) {
  .socials__link:hover {
    border-color: var(--border-strong);
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(4px);
  }
}

.socials__handle {
  color: var(--dim);
  font-size: 0.72rem;
}

/* FORM */
.contact__form-wrap {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius-xl);
}

.form {
  display: grid;
  gap: 1.1rem;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.field {
  display: grid;
  gap: 0.45rem;
  position: relative;
  min-width: 0;
}

.field__label {
  font-size: 0.8rem;
  color: var(--muted);
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

.field input,
.field textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: rgba(8, 8, 11, 0.55);
  color: var(--text);
  font-size: 0.93rem;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #565663;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: rgba(124, 92, 255, 0.7);
  background: rgba(8, 8, 11, 0.8);
  box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.14);
}

.field.is-invalid input,
.field.is-invalid textarea {
  border-color: rgba(255, 77, 141, 0.7);
}

.field__error {
  font-size: 0.76rem;
  color: var(--pink);
}

.form__submit {
  justify-self: start;
  min-width: 180px;
}

.form__submit:disabled {
  opacity: 0.7;
  cursor: wait;
}

.spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(8, 8, 11, 0.3);
  border-top-color: #08080b;
  border-radius: 50%;
  animation: spin-slow 0.7s linear infinite;
}

.feedback {
  font-size: 0.85rem;
}

.feedback--error {
  color: var(--pink);
}

.success {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
  padding: 1rem 0;
}

.success__glyph {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(163, 230, 53, 0.14);
  color: var(--lime);
  font-size: 1.5rem;
}

.success p {
  color: var(--muted);
  font-size: 0.93rem;
  max-width: 42ch;
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s var(--ease);
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 980px) {
  .contact {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .form__row {
    grid-template-columns: 1fr;
  }

  .form__submit {
    justify-self: stretch;
  }
}

/* iOS Safari zooms the viewport in on focus unless the field is 16px or bigger,
   which then leaves the page stuck at that zoom level. Touch devices always need it. */
@media (hover: none), (max-width: 900px) {
  .field input,
  .field textarea {
    font-size: 16px;
    padding: 0.8rem 0.9rem;
  }
}
</style>
