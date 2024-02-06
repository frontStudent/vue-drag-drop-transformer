import { getTransformParams, getPxNumber, getLimitedValue, checkFormatLine } from '../utils'

export default (el, binding) => {
  if (binding?.value?.disable) return

  let startPointX,
    startPointY, // 记录鼠标按下时的坐标
    startTranslateX,
    startTranslateY,
    moving = false

  const targetRef = document.getElementById('target')
  const verticalLine = document.getElementById('vertical-line')
  const horizonLine = document.getElementById('horizon-line')

  const targetRect = targetRef.getBoundingClientRect()
  const elBrothers = targetRef.children

  const onMouseDown = (e) => {
    e.stopPropagation()
    // 判断是否在可编辑状态下
    if (el.getAttribute('magicStatus') !== 'dblclick') e.preventDefault()

    // 鼠标点击处相对于左上角的坐标
    startPointX = e.clientX
    startPointY = e.clientY

    startTranslateX = getTransformParams(el)[0]
    startTranslateY = getTransformParams(el)[1]

    document.addEventListener('mousemove', onStartMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // 鼠标按下开始拖动
  const onStartMove = (e) => {
    moving = true
    const direction = el.style.cursor?.split('-')?.[0]

    // 鼠标自按下之后移动距离
    const dx = e.clientX - startPointX
    const dy = e.clientY - startPointY

    // 拖拽移动位置
    if (direction === 'move') {
      // 处理移动范围限制的逻辑
      const startLeft = getPxNumber(el.style.left)
      const startRight = startLeft + el.getBoundingClientRect().width
      const startTop = getPxNumber(el.style.top)
      const startBottom = startTop + el.getBoundingClientRect().height

      let maxTranslateX = targetRect.right - startRight
      let minTranslateX = targetRect.left - startLeft
      let maxTranslateY = targetRect.bottom - startBottom
      let minTranslateY = targetRect.top - startTop

      // 根据moveLimited参数判断
      let translateX = binding?.value?.moveLimited
        ? getLimitedValue(startTranslateX + dx, minTranslateX, maxTranslateX)
        : startTranslateX + dx
      let translateY = binding?.value?.moveLimited
        ? getLimitedValue(startTranslateY + dy, minTranslateY, maxTranslateY)
        : startTranslateY + dy

      el.style.transform = `translate(${translateX}px, ${translateY}px)`

      // 处理基准线逻辑
      if (binding?.value?.showFormatLine) {
        const [verticalLineLeft, horizonLineTop] = checkFormatLine(
          Object.values(elBrothers).map((value) => value.getBoundingClientRect())
        )
        verticalLine.style.left = `${verticalLineLeft}px`
        horizonLine.style.top = `${horizonLineTop}px`
      }

      return
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

    if (binding?.value?.showFormatLine) {
      // 处理基准线逻辑
      verticalLine.style.left = '-99999px'
      horizonLine.style.top = '-99999px'
    }

    document.removeEventListener('mousemove', onStartMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  el.addEventListener('mousemove', onTouchBoundary)
  el.addEventListener('mousedown', onMouseDown)

  el.addEventListener('click', (e) => {
    e.stopPropagation() // 防止触发document的click
    if (el.getAttribute('magicStatus') === 'dblclick') return
    el.setAttribute('magicStatus', 'click')
    el.style.cursor = 'move'
  })
}
