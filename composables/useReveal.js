import { onMounted, onUnmounted, nextTick } from 'vue'

export function useReveal() {
  let observer = null

  const scan = () => {
    if (!observer) return
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    els.forEach(el => {
      // Only observe if not already visible
      if (!el.classList.contains('visible')) {
        observer.observe(el)
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    })

    scan()
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  // Return scan function so it can be triggered on view changes
  return { scan }
}
