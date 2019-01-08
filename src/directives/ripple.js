function addRipple (el, binding, vnode) {
  vnode.componentInstance.$rippleTemp = {
    position: el.style.position,
    overflow: el.style.overflow
  }
  return function (e) {
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    const { width, height, left, top } = el.getBoundingClientRect()
    const length = Math.max(width, height)
    const color = binding.expression && binding.expression.toString().replace(/'/g, '')
    const { pageX, pageY } = e
    const ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.left = `${pageX - left - length / 2}px`
    ripple.style.top = `${pageY - top - length / 2}px`
    ripple.style.width = `${length}px`
    ripple.style.height = `${length}px`
    ripple.style.borderRadius = '50%'
    ripple.style.backgroundColor = color || 'rgba(255, 255, 255, 0.3)'
    ripple.style.transform = 'scale(0)'
    ripple.style.opacity = '1'
    ripple.style.transition = 'all 0.5s'

    el.appendChild(ripple)
    setTimeout(() => {
      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = '0'
      setTimeout(() => {
        el.removeChild(ripple)
      }, 500)
    }, 0)
  }
}

export default {
  bind (el, binding, vnode) {
    el.addEventListener('mousedown', addRipple(el, binding, vnode))
    // TODO: check ua, add touchstart listener
  },
  unbind (el, binding, vnode) {
    el.removeEventListener('mousedown', addRipple(el, binding, vnode))
    el.style.position = vnode.componentInstance.$rippleTemp.position
    el.style.overflow = vnode.componentInstance.$rippleTemp.overflow
    delete vnode.componentInstance.$rippleTemp
  }
}
