export const vResizable = {
  mounted: (el, binding) => {
    if (binding.value?.disable) return
    let startX,
      startY,
      startWidth,
      startHeight,
      startTranslateX,
      startTranslateY,
      moving = false
    if (binding.value?.maxWidth) el.style.maxWidth = binding.value?.maxWidth
    if (binding.value?.maxHeight) el.style.maxHeight = binding.value?.maxHeight

    let borderStyle = el.style.border

    const onMouseDown = (e) => {
      e.preventDefault()
      el.style.border = '1px dashed #ccc'
      startX = e.clientX
      startY = e.clientY
      startWidth = el.offsetWidth
      startHeight = el.offsetHeight

      const curTransform = el.style.transform
      const regex = /translate\((-?\d+)px,\s*(-?\d+)px\)/
      const match = curTransform.match(regex)

      if (match) {
        const [_, x, y] = match
        startTranslateX = Number(x)
        startTranslateY = Number(y)
      } else {
        startTranslateX = 0
        startTranslateY = 0
      }

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
        translateX = startTranslateX,
        translateY = startTranslateY

      const direction = el.style.cursor?.split('-')?.[0]
      // 拖拽移动位置
      if (direction === 'move') {
        // el.style.left = startLeft + dx + 'px'
        // el.style.top = startTop + dy + 'px'
        return
      }
      // 水平方向
      if (direction.includes('e')) {
        width = startWidth + dx
      }
      if (direction.includes('w')) {
        width = startWidth - dx
        translateX = startTranslateX + dx
      }
      // 垂直方向
      if (direction.includes('s')) {
        height = startHeight + dy
      }
      if (direction.includes('n')) {
        height = startHeight - dy
        translateY = startTranslateY + dy
      }
      el.style.width = width + 'px'
      el.style.height = height + 'px'
      el.style.transform = `translate(${translateX}px, ${translateY}px)`
    }

    // cursor样式根据边界位置变化
    // e.offsetX / e.offsetY 是鼠标在元素内部的坐标，是相对于元素边界的
    // el.offsetWidth / el.offsetHeight 是元素的大小
    const onTouchBoundary = (e) => {
      if (moving) return
      let limit = 10
      // 是否在右下角
      if (e.offsetX > el.offsetWidth - limit && e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 'se-resize'
        return
      }
      // 是否在右边界
      if (e.offsetX > el.offsetWidth - limit) {
        el.style.cursor = 'e-resize'
        return
      }
      // 是否在下边界
      if (e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 's-resize'
        return
      }
      if (binding.value?.rightBottomOnly) return
      // 是否在左上角
      if (e.offsetX < limit && e.offsetY < limit) {
        el.style.cursor = 'nw-resize'
        return
      }
      // 是否在左下角
      if (e.offsetX < limit && e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 'sw-resize'
        return
      }
      // 是否在右上角
      if (e.offsetX > el.offsetWidth - limit && e.offsetY < limit) {
        el.style.cursor = 'ne-resize'
        return
      }
      // 是否在左边界
      if (e.offsetX < limit) {
        el.style.cursor = 'w-resize'
        return
      }
      // 是否在上边界
      if (e.offsetY < limit) {
        el.style.cursor = 'n-resize'
        return
      }
      // el.style.cursor = 'move'
    }

    const onMouseUp = () => {
      moving = false
      el.style.border = borderStyle
      document.removeEventListener('mousemove', onStartResize)
      document.removeEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousemove', onTouchBoundary)
    el.addEventListener('mousedown', onMouseDown)
  }
}
