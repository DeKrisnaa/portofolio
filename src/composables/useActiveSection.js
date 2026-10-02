import { onMounted, onUnmounted, ref } from 'vue'

/* Highlights whichever section sits under the header, so the nav can mark
   where you are without every link being a real route. */
export const useActiveSection = (ids) => {
  const active = ref(ids[0])
  let observer = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const visible = new Set()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        // document order wins, so a tall section cannot steal the highlight
        const next = ids.find((id) => visible.has(id))
        if (next) active.value = next
      },
      // a thin band across the middle of the viewport: the section being read
      { rootMargin: '-45% 0px -45% 0px' }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return active
}