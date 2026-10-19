<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { profile, projects, stats } from '../data/portfolio'
import { skillCategories } from '../data/skills'
import { useDevMode } from '../composables/useDevMode'

const { toggleMatrix, isTerminalOpen, closeTerminal } = useDevMode()

const inputVal = ref('')
const inputRef = ref(null)
const outputArea = ref(null)
const commandHistory = ref([])
const historyIndex = ref(-1)

const lines = ref([
  { type: 'system', text: 'DEKRISNA DEV-OS v2.4.0 (x86_64-pc-linux-gnu)' },
  { type: 'system', text: 'Ketik "help" atau klik chip perintah di bawah untuk mulai.' },
  { type: 'system', text: '────────────────────────────────────────────────────────────' },
  { type: 'banner', text: 'welcome' }
])

const quickCommands = [
  { cmd: 'help', label: 'help' },
  { cmd: 'neofetch', label: 'neofetch' },
  { cmd: 'skills', label: 'skills' },
  { cmd: 'projects', label: 'projects' },
  { cmd: 'bio', label: 'bio' },
  { cmd: 'contact', label: 'contact' },
  { cmd: 'matrix', label: 'matrix 🟢' },
  { cmd: 'clear', label: 'clear' }
]

const scrollToBottom = async () => {
  await nextTick()
  if (outputArea.value) {
    outputArea.value.scrollTop = outputArea.value.scrollHeight
  }
}

const executeCommand = (cmdStr) => {
  const trimmed = cmdStr.trim()
  if (!trimmed) return

  commandHistory.value.push(trimmed)
  historyIndex.value = commandHistory.value.length

  // Add the prompt line
  lines.value.push({ type: 'input', text: `dekrisna@primakara:~$ ${trimmed}` })

  const parts = trimmed.split(' ')
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1).join(' ')

  switch (cmd) {
    case 'help':
    case '?':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">Daftar Perintah Tersedia:</span>
  <span class="t-green">neofetch</span>    : Tampilkan spesifikasi sistem & profil ASCII
  <span class="t-green">bio</span>         : Informasi singkat tentang DeKrisna
  <span class="t-green">skills</span>      : Daftar bahasa pemrograman & tools
  <span class="t-green">projects</span>    : Daftar proyek yang pernah dibangun
  <span class="t-green">education</span>   : Riwayat pendidikan (Primakara University)
  <span class="t-green">contact</span>     : Info kontak, email & media sosial
  <span class="t-green">matrix</span>      : Aktifkan mode cyber matrix rain
  <span class="t-green">stats</span>       : Statistik portofolio & komitmen koding
  <span class="t-green">date</span>        : Waktu & zona saat ini (Bali, WITA)
  <span class="t-green">echo [teks]</span> : Cetak ulang teks ke terminal
  <span class="t-green">clear</span>       : Bersihkan layar terminal
`
      })
      break

    case 'neofetch':
    case 'sysinfo':
      lines.value.push({
        type: 'output',
        html: `
<div class="neofetch-block">
<pre class="ascii-art">
   ______     __ __      _                 
  / ____/____/ // /____ (_)____ ____  ____ 
 / /  _ / _  // // // // // __// __ \\/ _  |
/ /__/ // /_// // // // // /_ / / / // // /
\\_____/ \\___//_//_/ \\___//_/ /_/ /_/ \\__/_/ 
</pre>
  <div class="neofetch-info">
    <p><strong class="t-cyan">dekrisna</strong><span class="t-dim">@</span><strong class="t-violet">primakara-os</strong></p>
    <p class="t-dim">------------------------</p>
    <p><span class="t-yellow">OS:</span> Primakara Linux 6.1-zen (Bali, ID)</p>
    <p><span class="t-yellow">Host:</span> DeKrisna Portfolio v2.4 High-Tech</p>
    <p><span class="t-yellow">Kernel:</span> Vue 3.5.42 + Vite 8.3.1</p>
    <p><span class="t-yellow">Uptime:</span> Mahasiswa Informatika 2024 — Sekarang</p>
    <p><span class="t-yellow">Shell:</span> zsh 5.9 with starship prompt</p>
    <p><span class="t-yellow">Stack:</span> Next.js · TypeScript · Tailwind · Vue</p>
    <p><span class="t-yellow">Status:</span> Open untuk Magang & Freelance</p>
    <p><span class="t-yellow">Editor:</span> VS Code + JetBrains Mono Font</p>
    <div class="color-palette">
      <span class="swatch bg-red"></span>
      <span class="swatch bg-green"></span>
      <span class="swatch bg-yellow"></span>
      <span class="swatch bg-blue"></span>
      <span class="swatch bg-magenta"></span>
      <span class="swatch bg-cyan"></span>
    </div>
  </div>
</div>`
      })
      break

    case 'bio':
    case 'about':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-violet">[INFO BIO]</span>
${profile.bio.map((p) => `<p class="t-text" style="margin-top:0.4rem;">${p}</p>`).join('')}
`
      })
      break

    case 'skills':
    case 'stack':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">[TECH STACK & TOOLS]</span>
${skillCategories
  .map(
    (cat) => `
<p style="margin-top:0.5rem;"><strong class="t-yellow">${cat.label}:</strong></p>
<p class="t-dim">${cat.skills.map((s) => `<span class="t-green">◆ ${s.name}</span> (${s.note})`).join(' · ')}</p>`
  )
  .join('')}
`
      })
      break

    case 'projects':
    case 'karya':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">[DAFTAR PROYEK]</span>
${projects
  .map(
    (p) => `
<div style="margin-top:0.6rem; padding-left:0.5rem; border-left: 2px solid #00f2fe;">
  <p><strong class="t-green">${p.title}</strong> <span class="t-dim">(${p.category} · ${p.year})</span></p>
  <p class="t-text">${p.summary}</p>
  <p class="t-dim">Stack: ${p.stack.join(', ')}</p>
  <p>${p.live ? `<a href="${p.live}" target="_blank" class="t-cyan">➜ Demo Live: ${p.live}</a> ` : ''}${p.repo ? `<a href="${p.repo}" target="_blank" class="t-violet">➜ GitHub Repo: ${p.repo}</a>` : ''}</p>
</div>`
  )
  .join('')}
`
      })
      break

    case 'education':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">[RIWAYAT PENDIDIKAN]</span>
<p style="margin-top:0.4rem;"><strong class="t-green">Primakara University (2024 — Sekarang)</strong></p>
<p class="t-dim">S1 Informatika — Pemrograman Web, Algoritma, Basis Data, Struktur Data.</p>
<p style="margin-top:0.4rem;"><strong class="t-green">SMA Negeri 1 Pekutatan (2021 — 2024)</strong></p>
<p class="t-dim">Jurusan MIPA — Matematika & Ilmu Pengetahuan Alam.</p>
`
      })
      break

    case 'contact':
    case 'email':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">[HUBUNGI SAYA]</span>
<p>Email     : <a href="mailto:${profile.email}" class="t-green">${profile.email}</a></p>
<p>GitHub    : <a href="https://github.com/${profile.handle}" target="_blank" class="t-violet">https://github.com/${profile.handle}</a></p>
<p>Instagram : <a href="https://instagram.com/dekrisnaaa" target="_blank" class="t-yellow">@dekrisnaaa</a></p>
<p>Lokasi    : <span class="t-text">${profile.location}</span></p>
`
      })
      break

    case 'matrix':
      lines.value.push({
        type: 'output',
        text: 'Mengaktifkan Matrix Rain Mode... Tekan ESC atau tombol keluar untuk menghentikan.'
      })
      toggleMatrix()
      break

    case 'stats':
      lines.value.push({
        type: 'output',
        html: `
<span class="t-cyan">[STATISTIK PORTOFOLIO]</span>
${stats.map((s) => `<p><span class="t-green">▪</span> ${s.label}: <strong class="t-yellow">${s.value}${s.suffix}</strong></p>`).join('')}
`
      })
      break

    case 'date':
      lines.value.push({
        type: 'output',
        text: new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Makassar',
          dateStyle: 'full',
          timeStyle: 'medium'
        }) + ' (WITA / UTC+8 Bali)'
      })
      break

    case 'echo':
      lines.value.push({
        type: 'output',
        text: args || ''
      })
      break

    case 'clear':
    case 'cls':
      lines.value = []
      break

    case 'sudo':
      lines.value.push({
        type: 'output',
        html: `<span class="t-red">Permission denied!</span> User <span class="t-yellow">guest</span> is not in sudoers file. Insiden ini telah dicatat ke <code>/var/log/antigravity.log</code>.`
      })
      break

    default:
      lines.value.push({
        type: 'output',
        html: `Perintah <span class="t-red">"${cmd}"</span> tidak dikenali. Ketik <span class="t-cyan">"help"</span> untuk melihat daftar perintah.`
      })
      break
  }

  inputVal.value = ''
  scrollToBottom()
}

const onKeyDown = (e) => {
  if (e.key === 'Enter') {
    executeCommand(inputVal.value)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (commandHistory.value.length && historyIndex.value > 0) {
      historyIndex.value--
      inputVal.value = commandHistory.value[historyIndex.value] || ''
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++
      inputVal.value = commandHistory.value[historyIndex.value] || ''
    } else {
      historyIndex.value = commandHistory.value.length
      inputVal.value = ''
    }
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="terminal glass" @click="focusInput">
    <!-- Window Header -->
    <div class="terminal__header">
      <div class="terminal__dots">
        <span class="dot-btn red" title="Tutup" @click.stop="closeTerminal"></span>
        <span class="dot-btn yellow" title="Minimize"></span>
        <span class="dot-btn green" title="Maximize"></span>
      </div>
      <div class="terminal__title mono">
        <span class="terminal__icon">⚡</span>
        dekrisna@primakara: ~ (zsh)
      </div>
      <div class="terminal__badge mono">BASH 5.2</div>
    </div>

    <!-- Quick Command Chips for Fast Clicking -->
    <div class="terminal__chips">
      <span class="chips-label mono">Quick:</span>
      <button
        v-for="chip in quickCommands"
        :key="chip.cmd"
        class="chip-btn mono"
        @click.stop="executeCommand(chip.cmd)"
      >
        {{ chip.label }}
      </button>
    </div>

    <!-- Output Screen -->
    <div ref="outputArea" class="terminal__body">
      <div v-for="(line, idx) in lines" :key="idx" class="terminal__line mono">
        <div v-if="line.type === 'banner'" class="welcome-banner">
          <p class="t-cyan">╔═══════════════════════════════════════════════════════════╗</p>
          <p class="t-cyan">║   SELAMAT DATANG DI TERMINAL DEKRISNA // IT PORTOFOLIO   ║</p>
          <p class="t-cyan">╚═══════════════════════════════════════════════════════════╝</p>
          <p class="t-dim">Status: Connected to Primakara Cluster · Node.js v22 · Bali</p>
        </div>
        <div v-else-if="line.type === 'system'" class="t-dim">
          {{ line.text }}
        </div>
        <div v-else-if="line.type === 'input'" class="t-prompt">
          <span class="prompt-arrow">❯</span> {{ line.text }}
        </div>
        <div v-else-if="line.html" class="t-html" v-html="line.html"></div>
        <div v-else class="t-text">
          {{ line.text }}
        </div>
      </div>

      <!-- Live Input Row -->
      <div class="terminal__input-row mono">
        <span class="t-cyan">dekrisna@primakara</span><span class="t-dim">:</span><span class="t-violet">~</span><span class="prompt-arrow">❯</span>
        <input
          ref="inputRef"
          v-model="inputVal"
          type="text"
          class="terminal__input"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="ketik perintah di sini..."
          @keydown="onKeyDown"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(9, 11, 17, 0.92);
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.08);
  overflow: hidden;
  font-family: var(--font-mono);
  max-width: 100%;
}

.terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(14, 17, 26, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal__dots {
  display: flex;
  gap: 7px;
}

.dot-btn {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.dot-btn:hover {
  transform: scale(1.15);
}

.dot-btn.red {
  background: #ff5f56;
}
.dot-btn.yellow {
  background: #ffbd2e;
}
.dot-btn.green {
  background: #27c93f;
}

.terminal__title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.76rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.terminal__badge {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: var(--dim);
}

.terminal__chips {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1rem;
  background: rgba(12, 15, 22, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow-x: auto;
  white-space: nowrap;
}

.chips-label {
  font-size: 0.7rem;
  color: var(--dim);
  text-transform: uppercase;
}

.chip-btn {
  padding: 0.22rem 0.55rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s;
}

.chip-btn:hover {
  background: rgba(0, 242, 254, 0.12);
  border-color: rgba(0, 242, 254, 0.35);
  color: #00f2fe;
}

.terminal__body {
  padding: 1.25rem 1.25rem 1.5rem;
  min-height: 280px;
  max-height: 440px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.82rem;
  line-height: 1.55;
}

.terminal__line {
  word-break: break-word;
}

.welcome-banner p {
  line-height: 1.25;
}

.prompt-arrow {
  color: #00ff9d;
  margin-inline: 0.35rem 0.5rem;
  font-weight: bold;
}

.terminal__input-row {
  display: flex;
  align-items: center;
  margin-top: 0.35rem;
}

.terminal__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  caret-color: #00ff9d;
}

/* Terminal Text Colors */
:deep(.t-cyan) {
  color: #00f2fe;
}
:deep(.t-green) {
  color: #00ff9d;
}
:deep(.t-violet) {
  color: #a78bfa;
}
:deep(.t-yellow) {
  color: #facc15;
}
:deep(.t-red) {
  color: #f87171;
}
:deep(.t-dim) {
  color: #64748b;
}
:deep(.t-text) {
  color: #e2e8f0;
}
:deep(.t-prompt) {
  color: #94a3b8;
  padding-block: 0.2rem;
}

:deep(.neofetch-block) {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-block: 0.5rem;
}

:deep(.ascii-art) {
  font-family: monospace;
  font-size: 0.65rem;
  line-height: 1.15;
  color: #00f2fe;
}

:deep(.color-palette) {
  display: flex;
  gap: 4px;
  margin-top: 0.4rem;
}

:deep(.swatch) {
  width: 14px;
  height: 10px;
  border-radius: 2px;
}
:deep(.bg-red) {
  background: #f87171;
}
:deep(.bg-green) {
  background: #00ff9d;
}
:deep(.bg-yellow) {
  background: #facc15;
}
:deep(.bg-blue) {
  background: #60a5fa;
}
:deep(.bg-magenta) {
  background: #c084fc;
}
:deep(.bg-cyan) {
  background: #00f2fe;
}

@media (max-width: 640px) {
  :deep(.ascii-art) {
    display: none;
  }
}
</style>
