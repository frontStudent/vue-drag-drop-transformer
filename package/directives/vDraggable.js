export const vDraggable = {
  mounted: (el, binding) => {
    if (binding.value?.disable) return
    let startX,
      startY,
      translateX,
      translateY,
      moving = false

    let borderStyle = el.style.border
    // el.style.position = 'absolute'
    // el.style.transform = 'translate(-50%, -50%)'

    const onMouseDown = (e) => {
      e.preventDefault()
      el.style.border = '1px dashed #ccc'
      // 鼠标点击处相对于左上角的坐标
      startX = e.clientX
      startY = e.clientY

      const curTransform = el.style.transform
      const regex = /translate\((-?\d+)px,\s*(-?\d+)px\)/
      const match = curTransform.match(regex)
      
      if (match) {
        const [_, x, y] = match
        translateX = Number(x)
        translateY = Number(y)
      }
      else {
        translateX = 0
        translateY = 0
      }

      document.addEventListener('mousemove', onStartResize)
      document.addEventListener('mouseup', onMouseUp)
    }

    // 鼠标按下开始拖动
    const onStartResize = (e) => {
      moving = true

      const direction = el.style.cursor?.split('-')?.[0]

      // 鼠标自按下之后移动距离
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      // 拖拽移动位置
      if (direction === 'move') {
        el.style.transform = `translate(${translateX + dx}px, ${translateY + dy}px)`
        return
      }
      // 水平方向
      if (direction.includes('e')) {
        return
      }
      if (direction.includes('w')) {
        return
      }
      // 垂直方向
      if (direction.includes('s')) {
        return
      }
      if (direction.includes('n')) {
        return
      }
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
      el.style.border = borderStyle
      document.removeEventListener('mousemove', onStartResize)
      document.removeEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousemove', onTouchBoundary)
    el.addEventListener('mousedown', onMouseDown)
  }
}
