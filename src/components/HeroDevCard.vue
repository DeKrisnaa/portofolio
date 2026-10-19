<script setup>
import { ref } from 'vue'
import { profile } from '../data/portfolio'
import { useDevMode } from '../composables/useDevMode'

const { copyToClipboard, showToast } = useDevMode()

const activeTab = ref('code') // 'code' | 'photo'
const isRunning = ref(false)
const consoleOutput = ref('')

const tsCode = `interface Developer {
  name: string;
  role: string;
  location: string;
  campus: string;
  major: string;
  focus: string[];
  status: 'OPEN_FOR_INTERNSHIP';
}

export const deKrisna: Developer = {
  name: 'DeKrisna',
  role: 'Junior Web Developer',
  location: 'Bali, Indonesia',
  campus: 'Primakara University',
  major: 'S1 Informatika (2024)',
  focus: ['Next.js', 'TypeScript', 'Tailwind', 'Vue 3'],
  status: 'OPEN_FOR_INTERNSHIP'
};`

const runCode = () => {
  isRunning.value = true
  consoleOutput.value = 'Compiling TypeScript...'
  setTimeout(() => {
    consoleOutput.value = `✓ Build success: Output ready.\n> DeKrisna siap berkontribusi pada proyek web Anda!`
    isRunning.value = false
    showToast('🚀 Script executed successfully!')
  }, 600)
}

const copyCode = () => {
  copyToClipboard(tsCode, 'Source code profile')
}
</script>

<template>
  <div class="dev-card glass" v-spotlight>
    <!-- Window Header / Tabs -->
    <div class="dev-card__header">
      <div class="window-controls">
        <span class="ctrl-dot red"></span>
        <span class="ctrl-dot yellow"></span>
        <span class="ctrl-dot green"></span>
      </div>

      <div class="tab-list">
        <button
          class="tab-btn mono"
          :class="{ 'is-active': activeTab === 'code' }"
          @click="activeTab = 'code'"
        >
          <span class="file-icon ts">TS</span>
          profile.ts
        </button>
        <button
          class="tab-btn mono"
          :class="{ 'is-active': activeTab === 'photo' }"
          @click="activeTab = 'photo'"
        >
          <span class="file-icon img">IMG</span>
          avatar_hud.png
        </button>
      </div>

      <div class="header-actions">
        <button
          v-if="activeTab === 'code'"
          class="action-icon mono"
          title="Salin Kode"
          @click="copyCode"
        >
          📋
        </button>
      </div>
    </div>

    <!-- Tab 1: Code Mode -->
    <div v-show="activeTab === 'code'" class="code-view mono">
      <div class="code-editor">
        <div class="line-numbers" aria-hidden="true">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
          <span>07</span>
          <span>08</span>
          <span>09</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
        </div>
        <pre class="code-content"><code><span class="k-kw">interface</span> <span class="k-type">Developer</span> {
  <span class="k-prop">name</span>: <span class="k-type">string</span>;
  <span class="k-prop">role</span>: <span class="k-type">string</span>;
  <span class="k-prop">campus</span>: <span class="k-type">string</span>;
  <span class="k-prop">major</span>: <span class="k-type">string</span>;
  <span class="k-prop">focus</span>: <span class="k-type">string</span>[];
  <span class="k-prop">status</span>: <span class="k-str">'OPEN_FOR_INTERNSHIP'</span>;
}

<span class="k-kw">export const</span> <span class="k-var">deKrisna</span>: <span class="k-type">Developer</span> = {
  <span class="k-prop">name</span>: <span class="k-str">'DeKrisna'</span>,
  <span class="k-prop">role</span>: <span class="k-str">'Junior Web Developer'</span>,
  <span class="k-prop">campus</span>: <span class="k-str">'Primakara University'</span>,
  <span class="k-prop">major</span>: <span class="k-str">'S1 Informatika'</span>,
  <span class="k-prop">focus</span>: [<span class="k-str">'Next.js'</span>, <span class="k-str">'TypeScript'</span>, <span class="k-str">'Tailwind'</span>],
  <span class="k-prop">status</span>: <span class="k-str">'OPEN_FOR_INTERNSHIP'</span>
};</code></pre>
      </div>

      <!-- Live Code Run Toolbar -->
      <div class="code-toolbar">
        <div class="status-indicator">
          <span class="pulse-dot"></span>
          <span class="status-text">TypeScript 5.6 · Ready</span>
        </div>
        <button
          class="run-btn mono"
          :disabled="isRunning"
          @click="runCode"
        >
          <span class="play-icon">▶</span>
          {{ isRunning ? 'Executing...' : 'Run Code' }}
        </button>
      </div>

      <!-- Execution Console Feedback -->
      <div v-if="consoleOutput" class="console-box">
        <div class="console-label">Console Output:</div>
        <div class="console-text">{{ consoleOutput }}</div>
      </div>
    </div>

    <!-- Tab 2: Photo Hologram HUD Mode -->
    <div v-show="activeTab === 'photo'" class="photo-view">
      <div class="hologram-frame">
        <img :src="profile.photo" :alt="profile.name" class="hologram-img" />

        <!-- Cyber scanline overlay -->
        <div class="scanlines" aria-hidden="true"></div>

        <!-- Corner HUD Brackets -->
        <div class="bracket top-left"></div>
        <div class="bracket top-right"></div>
        <div class="bracket bottom-left"></div>
        <div class="bracket bottom-right"></div>

        <!-- Biometric HUD badges -->
        <div class="hud-tag top-tag mono">
          <span class="hud-led green"></span>
          SYS.TARGET // {{ profile.name }}
        </div>
        <div class="hud-tag bottom-tag mono">
          LAT: 8.4095° S | LNG: 115.1889° E [BALI]
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-card {
  position: relative;
  background: rgba(11, 14, 22, 0.88);
  border: 1px solid rgba(0, 242, 254, 0.22);
  border-radius: var(--radius-xl);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.08);
  overflow: hidden;
  width: 100%;
}

.dev-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background: rgba(16, 20, 30, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.window-controls {
  display: flex;
  gap: 7px;
}

.ctrl-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.ctrl-dot.red { background: #ff5f56; }
.ctrl-dot.yellow { background: #ffbd2e; }
.ctrl-dot.green { background: #27c93f; }

.tab-list {
  display: flex;
  gap: 4px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--dim);
  font-size: 0.74rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.is-active {
  background: rgba(0, 242, 254, 0.08);
  border-color: rgba(0, 242, 254, 0.25);
  color: #00f2fe;
}

.file-icon {
  font-size: 0.62rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: bold;
}
.file-icon.ts {
  background: #3178c6;
  color: #fff;
}
.file-icon.img {
  background: #a855f7;
  color: #fff;
}

.action-icon {
  font-size: 0.85rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}
.action-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* CODE VIEW */
.code-view {
  padding: 1.25rem;
}

.code-editor {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.6;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  user-select: none;
  color: #3b4252;
  text-align: right;
}

.code-content {
  margin: 0;
  font-family: inherit;
  color: #d8dee9;
}

.k-kw { color: #81a1c1; font-weight: bold; }
.k-type { color: #88c0d0; }
.k-prop { color: #e5e9f0; }
.k-str { color: #a3be8c; }
.k-var { color: #d08770; }

.code-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: var(--dim);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 8px #00ff9d;
}

.run-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  background: rgba(0, 242, 254, 0.12);
  border: 1px solid rgba(0, 242, 254, 0.35);
  color: #00f2fe;
  font-size: 0.74rem;
  cursor: pointer;
  transition: all 0.2s;
}
.run-btn:hover:not(:disabled) {
  background: #00f2fe;
  color: #07090e;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
}

.play-icon {
  font-size: 0.65rem;
}

.console-box {
  margin-top: 0.85rem;
  padding: 0.75rem 0.9rem;
  border-radius: 6px;
  background: rgba(5, 7, 12, 0.9);
  border: 1px solid rgba(0, 255, 157, 0.25);
  font-size: 0.74rem;
}

.console-label {
  color: #00ff9d;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.console-text {
  color: #e2e8f0;
  white-space: pre-line;
}

/* PHOTO VIEW */
.photo-view {
  padding: 1.5rem;
  display: grid;
  place-items: center;
}

.hologram-frame {
  position: relative;
  width: min(320px, 100%);
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
}

.hologram-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  filter: contrast(105%) brightness(95%);
}

.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 242, 254, 0.03),
    rgba(0, 242, 254, 0.03) 1px,
    transparent 1px,
    transparent 3px
  );
}

.bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid #00f2fe;
  pointer-events: none;
}
.bracket.top-left { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.bracket.top-right { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.bracket.bottom-left { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.bracket.bottom-right { bottom: 10px; right: 10px; border-left: none; border-top: none; }

.hud-tag {
  position: absolute;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  background: rgba(7, 9, 14, 0.85);
  border: 1px solid rgba(0, 242, 254, 0.3);
  font-size: 0.68rem;
  color: #00f2fe;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.hud-tag.top-tag {
  top: 14px;
  right: 14px;
}
.hud-tag.bottom-tag {
  bottom: 14px;
  left: 14px;
  right: 14px;
  font-size: 0.65rem;
  justify-content: center;
  color: var(--muted);
}
.hud-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}
</style>
