export const vResizable = {
  mounted: (el, binding) => {
    if(binding.value?.disable) return
    let startX, startY, startWidth, startHeight, startLeft, startTop, moving = false
    el.style.maxWidth = binding.value?.maxWidth || '600px'
    el.style.maxHeight = binding.value?.maxHeight || '800px'
    el.style.position = 'absolute'
    el.style.transform = 'translate(-50%, -50%)'
    
    const onMouseDown = (e) => {
      e.preventDefault();
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
        // el.style.left = startLeft + dx + 'px'
        // el.style.top = startTop + dy + 'px'
        return
      }
      // 水平方向
      if (direction.includes('e')) {
        width = startWidth + dx + 'px'
        left = startLeft + dx / 2 + 'px'
      }
      if (direction.includes('w')) {
        width = startWidth - dx + 'px'
        left = startLeft + dx / 2 + 'px'
      }
      // 垂直方向
      if (direction.includes('s')) {
        height = startHeight + dy + 'px'
        top = startTop + dy / 2 + 'px'
      }
      if (direction.includes('n')) {
        height = startHeight - dy + 'px'
        top = startTop + dy / 2 + 'px'
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
      if(moving) return
      let limit = 10
      // 是否在左上角
      if (e.offsetX < limit && e.offsetY < limit) {
        el.style.cursor = 'nw-resize'
        return
      }
      // 是否在右下角
      if (
        e.offsetX > el.offsetWidth - limit &&
        e.offsetY > el.offsetHeight - limit
      ) {
        el.style.cursor = 'se-resize'
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
      // 是否在右边界
      if (e.offsetX > el.offsetWidth - limit) {
        el.style.cursor = 'e-resize'
        return
      }
      // 是否在上边界
      if (e.offsetY < limit) {
        el.style.cursor = 'n-resize'
        return
      }
      // 是否在下边界
      if (e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 's-resize'
        return
      }
      // el.style.cursor = 'move'
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
