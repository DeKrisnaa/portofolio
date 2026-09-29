let sharedObserver = null

const getObserver = () => {
  if (sharedObserver) return sharedObserver
  if (typeof IntersectionObserver === 'undefined') return null

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        sharedObserver.unobserve(entry.target)
      })
    },
    { threshold: 0, rootMargin: '0px 0px -12% 0px' }
  )

  return sharedObserver
}

export const reveal = {
  mounted(el, binding) {
    const delay = Number(binding.value ?? 0)
    if (delay > 0) el.style.transitionDelay = `${delay}ms`

    const observer = getObserver()

    if (!observer) {
      el.classList.add('is-visible')
      return
    }

    el.classList.add('reveal')

    try {
      observer.observe(el)
    } catch (error) {
      el.classList.remove('reveal')
      el.classList.add('is-visible')
    }
  },
  unmounted(el) {
    if (sharedObserver) sharedObserver.unobserve(el)
  }
}

const spotlightHandlers = new WeakMap()

export const spotlight = {
  mounted(el) {
    el.classList.add('spotlight')

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      el.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }

    el.addEventListener('pointermove', onMove)
    spotlightHandlers.set(el, onMove)
  },
  unmounted(el) {
    const handler = spotlightHandlers.get(el)
    if (handler) el.removeEventListener('pointermove', handler)
    spotlightHandlers.delete(el)
  }
}
