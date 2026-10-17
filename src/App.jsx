import { useEffect } from 'react'
import Hero from './components/Hero.jsx'
import Problems from './components/Problems.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Formats from './components/Formats.jsx'
import Escort from './components/Escort.jsx'
import Lessons from './components/Lessons.jsx'
import Results from './components/Results.jsx'
import Dictionary from './components/Dictionary.jsx'
import Pricing from './components/Pricing.jsx'
import Contacts from './components/Contacts.jsx'

// Переходы по якорям (#contacts, #pricing...) одинаково на ПК и на тач-устройствах
function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.getElementById(hash.slice(1))
      if (!target) return
      e.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

// Лёгкое появление секций при скролле (Hero виден сразу и не анимируется)
function useRevealOnScroll() {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const sections = document.querySelectorAll('main > .section:not(.hero)')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )

    sections.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useRevealOnScroll()
  useAnchorScroll()

  return (
    <main>
      <Hero />
      <Problems />
      <About />
      <Services />
      <Formats />
      <Escort />
      <Lessons />
      <Results />
      <Dictionary />
      <Pricing />
      <Contacts />
    </main>
  )
}
