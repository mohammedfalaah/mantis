import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Custom hook for GSAP animations with cleanup
export const useGSAPAnimation = (animationFn, dependencies = []) => {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current) {
        animationFn(ref.current)
      }
    }, ref)

    return () => ctx.revert() // Clean up animations
  }, dependencies)

  return ref
}

// Hook for scroll-triggered animations
export const useScrollAnimation = (options, dependencies = []) => {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options.start || 'top center',
      end: options.end || 'bottom center',
      onEnter: options.onEnter,
      onEnterBack: options.onEnterBack,
      onLeave: options.onLeave,
      onLeaveBack: options.onLeaveBack,
      ...options
    })

    return () => trigger.kill()
  }, dependencies)

  return ref
}

// Hook for GSAP timeline
export const useTimeline = (options = {}) => {
  const tlRef = useRef()

  useEffect(() => {
    tlRef.current = gsap.timeline(options)

    return () => {
      if (tlRef.current) {
        tlRef.current.kill()
      }
    }
  }, [])

  return tlRef.current
}
