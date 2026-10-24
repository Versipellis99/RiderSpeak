import { useEffect, useRef, useState } from 'react'
import BackButton from './components/BackButton.jsx'
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
import Footer from './components/Footer.jsx'

// Переходы по якорям (#contacts, #pricing...) одинаково на ПК и на тач-устройствах.
// onJump(y) вызывается, когда переход ведёт вниз по кнопке в «Контакты» или по пункту меню:
// y — позиция прокрутки, откуда человек нажал кнопку (к ней вернёт стрелка «назад»)
function useAnchorScroll(onJump) {
  const jumpRef = useRef(onJump)

  useEffect(() => {
    jumpRef.current = onJump
  })

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.getElementById(hash.slice(1))
      if (!target) return
      e.preventDefault()
      // Запоминаем место для стрелки «назад» у кнопок в «Контакты» и у пунктов меню (бургер и ссылки на ПК);
      // если цель и так почти рядом, стрелка не нужна
      const fromMenu = !!link.closest('.hero__nav')
      if ((hash === '#contacts' || fromMenu) && target.getBoundingClientRect().top > 100) {
        jumpRef.current?.(window.scrollY)
        // Отступ подвала нужен до начала прокрутки, иначе страница остановится выше и стрелка закроет текст
        document.body.classList.add('has-back-btn')
      }
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
  // Откуда нажали кнопку, которая увела в «Контакты» (позиция прокрутки), или null
  const [backY, setBackY] = useState(null)
  const leftOrigin = useRef(false)

  useRevealOnScroll()
  useAnchorScroll((y) => {
    leftOrigin.current = false
    setBackY(y)
  })

  // Пока стрелка видна, подвалу добавляется отступ снизу, чтобы стрелка не закрывала его текст
  useEffect(() => {
    document.body.classList.toggle('has-back-btn', backY !== null)
  }, [backY])

  // Стрелка исчезает, когда человек сам вернулся к тому месту
  useEffect(() => {
    if (backY === null) return
    const onScroll = () => {
      if (window.scrollY > backY + 300) leftOrigin.current = true
      else if (leftOrigin.current && window.scrollY <= backY + 100) setBackY(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [backY])

  const goBack = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: backY, behavior: reduce ? 'auto' : 'smooth' })
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setBackY(null)
  }

  return (
    <>
      <BackButton visible={backY !== null} onClick={goBack} />
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
      <Footer />
    </>
  )
}
