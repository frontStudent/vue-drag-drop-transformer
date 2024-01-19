export const vDraggable = {
  mounted: (el, binding) => {
    if(binding.value?.disable) return
    let startX,
      startY,
      startWidth,
      startHeight,
      startLeft,
      startTop,
      moving = false
    el.style.maxWidth = binding.value?.maxWidth || '600px'
    el.style.maxHeight = binding.value?.maxHeight || '800px'
    el.style.position = 'absolute'
    el.style.transform = 'translate(-50%, -50%)'

    const onMouseDown = (e) => {
      e.preventDefault()
      startX = e.clientX
      startY = e.clientY
      startWidth = el.offsetWidth
      startHeight = el.offsetHeight
      startLeft = el.offsetLeft
      startTop = el.offsetTop
      document.addEventListener('mousemove', onStartResize)
      document.addEventListener('mouseup', onMouseUp)
    }

    // 鼠标按下开始拖动
    const onStartResize = (e) => {
      moving = true
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      let width = startWidth,
        height = startHeight,
        left = startLeft,
        top = startTop
      const direction = el.style.cursor?.split('-')?.[0]
      // 拖拽移动位置
      if (direction === 'move') {
        el.style.left = startLeft + dx + 'px'
        el.style.top = startTop + dy + 'px'
        return
      }
      el.style.width = width
      el.style.height = height
      el.style.left = left
      el.style.top = top
    }

    // cursor样式根据边界位置变化
    // e.offsetX / e.offsetY 是鼠标在元素内部的坐标，是相对于元素边界的
    // el.offsetWidth / el.offsetHeight 是元素的大小
    const onTouchBoundary = (e) => {
      if (moving) return
      let limit = 10
      if (
        e.offsetX > limit &&
        e.offsetY > limit &&
        e.offsetX < el.offsetWidth - limit &&
        e.offsetY < el.offsetHeight - limit
      ) {
        el.style.cursor = 'move'
      }
    }

    const onMouseUp = () => {
      moving = false
      document.removeEventListener('mousemove', onStartResize)
      document.removeEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousemove', onTouchBoundary)
    el.addEventListener('mousedown', onMouseDown)
  }
}
