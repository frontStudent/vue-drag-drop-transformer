export default (el, binding) => {
  el.addEventListener('mousedown', (e) => {
    // if (e.target === e.currentTarget) {
      const clientX = e.clientX
      const clientY = e.clientY

      let cloneEl = e.target.cloneNode(true)
      cloneEl.style.position = 'absolute'
      cloneEl.id = new Date().getTime()
      cloneEl.setAttribute('elemType', binding?.value?.elemType || 'default')
      cloneEl.style.top = `${e.target.getBoundingClientRect().top}px`
      cloneEl.style.left = `${e.target.getBoundingClientRect().left}px`
      cloneEl.style.zIndex = 22
      cloneEl.draggable = true
      cloneEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('dragEl', e.target.id)
        e.dataTransfer.setData('startX', clientX)
        e.dataTransfer.setData('startY', clientY)
      })
      e.target.parentNode.appendChild(cloneEl)
    // }
  })
}
