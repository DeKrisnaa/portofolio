import { ref } from 'vue'

const isTerminalOpen = ref(false)
const isCommandPaletteOpen = ref(false)
const isMatrixActive = ref(false)
const toastMessage = ref('')
let toastTimer = null

export const useDevMode = () => {
  const openTerminal = () => {
    isTerminalOpen.value = true
  }

  const closeTerminal = () => {
    isTerminalOpen.value = false
  }

  const toggleTerminal = () => {
    isTerminalOpen.value = !isTerminalOpen.value
  }

  const openCommandPalette = () => {
    isCommandPaletteOpen.value = true
  }

  const closeCommandPalette = () => {
    isCommandPaletteOpen.value = false
  }

  const toggleCommandPalette = () => {
    isCommandPaletteOpen.value = !isCommandPaletteOpen.value
  }

  const toggleMatrix = () => {
    isMatrixActive.value = !isMatrixActive.value
    showToast(isMatrixActive.value ? '🟢 Matrix Rain Mode: ENABLED' : '⚪ Matrix Rain Mode: DISABLED')
  }

  const showToast = (msg, duration = 3000) => {
    toastMessage.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage.value = ''
    }, duration)
  }

  const copyToClipboard = async (text, label = 'Teks') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      showToast(`✓ ${label} berhasil disalin ke clipboard!`)
      return true
    } catch {
      showToast(`✕ Gagal menyalin ${label}`)
      return false
    }
  }

  return {
    isTerminalOpen,
    isCommandPaletteOpen,
    isMatrixActive,
    toastMessage,
    openTerminal,
    closeTerminal,
    toggleTerminal,
    openCommandPalette,
    closeCommandPalette,
    toggleCommandPalette,
    toggleMatrix,
    showToast,
    copyToClipboard
  }
}
