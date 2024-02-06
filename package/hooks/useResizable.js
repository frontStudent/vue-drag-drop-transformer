import { getTransformParams, getPxNumber, checkFormatLine } from '../utils'

export default (el, binding) => {
  if (binding?.value?.disable) return
  let startX,
    startY,
    startWidth,
    startHeight,
    startTranslateX,
    startTranslateY,
    moving = false
  if (binding?.value?.maxWidth) el.style.maxWidth = binding?.value?.maxWidth
  if (binding?.value?.maxHeight) el.style.maxHeight = binding?.value?.maxHeight

  let targetRef = document.getElementById('target')
  const targetRect = targetRef.getBoundingClientRect()
  const elBrothers = targetRef.children

  const verticalLine = document.getElementById('vertical-line')
  const horizonLine = document.getElementById('horizon-line')

  const onMouseDown = (e) => {
    if (el.getAttribute('magicStatus') !== 'dblclick') e.preventDefault()
    startX = e.clientX
    startY = e.clientY
    startWidth = el.offsetWidth
    startHeight = el.offsetHeight

    startTranslateX = getTransformParams(el)[0]
    startTranslateY = getTransformParams(el)[1]

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

    const startLeft = getPxNumber(el.style.left)
    const startTop = getPxNumber(el.style.top)

    // 拖拽移动位置
    if (direction === 'move' || direction === 'default' || direction === 'pointer') {
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

    if (binding?.value?.moveLimited) {
      // 处理范围限制的逻辑
      if (
        width + translateX + startLeft <= targetRect.right &&
        translateX + startLeft >= targetRect.left &&
        height + translateY + startTop <= targetRect.bottom &&
        translateY + startTop >= targetRect.top
      ) {
        el.style.width = width + 'px'
        el.style.height = height + 'px'
        el.style.transform = `translate(${translateX}px, ${translateY}px)`
      }
    } else {
      el.style.width = width + 'px'
      el.style.height = height + 'px'
      el.style.transform = `translate(${translateX}px, ${translateY}px)`
    }

    if (binding?.value?.showFormatLine) {
      // 处理基准线逻辑
      const [verticalLineLeft, horizonLineTop] = checkFormatLine(
        Object.values(elBrothers).map((value) => value.getBoundingClientRect())
      )
      verticalLine.style.left = `${verticalLineLeft}px`
      horizonLine.style.top = `${horizonLineTop}px`
    }
  }

  // cursor样式根据边界位置变化
  // e.offsetX / e.offsetY 是鼠标在元素内部的坐标，是相对于元素边界的
  // el.offsetWidth / el.offsetHeight 是元素的大小
  const onTouchBoundary = (e) => {
    if (moving) return // 在按住鼠标拖动期间不需要进行cursor样式变化
    const magicStatus = el.getAttribute('magicStatus')
    if (!magicStatus || magicStatus === 'cancel') {
      el.style.cursor = 'pointer'
      return
    }
    if (magicStatus === 'dblclick') {
      el.style.cursor = 'auto'
      return
    }
    let limit = 10
    // 是否在右上角
    if (e.offsetX > el.offsetWidth - limit && e.offsetY < limit) {
      el.style.cursor = 'ne-resize'
      return
    }
    // 是否在右下角
    if (e.offsetX > el.offsetWidth - limit && e.offsetY > el.offsetHeight - limit) {
      el.style.cursor = 'se-resize'
      return
    }
    // 是否在左下角
    if (e.offsetX < limit && e.offsetY > el.offsetHeight - limit) {
      el.style.cursor = 'sw-resize'
      return
    }
    // 是否在左上角
    if (e.offsetX < limit && e.offsetY < limit) {
      el.style.cursor = 'nw-resize'
      return
    }

    // 是否在上边界
    if (e.offsetY < limit) {
      el.style.cursor = 'n-resize'
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
    // 是否在左边界
    if (e.offsetX < limit) {
      el.style.cursor = 'w-resize'
      return
    }
    el.style.cursor = 'default'
  }

  const onMouseUp = () => {
    moving = false

    if (binding?.value?.showFormatLine) {
      // 处理基准线逻辑
      verticalLine.style.left = '-99999px'
      horizonLine.style.top = '-99999px'
    }

    document.removeEventListener('mousemove', onStartResize)
    document.removeEventListener('mouseup', onMouseUp)
  }

  el.addEventListener('mousemove', onTouchBoundary)
  el.addEventListener('mousedown', onMouseDown)

  el.addEventListener('click', (e) => {
    e.stopPropagation() // 防止触发document的click
    if (el.getAttribute('magicStatus') === 'dblclick') return
    el.setAttribute('magicStatus', 'click')
    el.style.cursor = 'default'
  })
}
