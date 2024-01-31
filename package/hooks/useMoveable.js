import getTransformParams from "../utils/getTransformParams"

export default (el, binding) => {
    if (binding?.value?.disable) return

    let startX,
      startY,
      startTranslateX,
      startTranslateY,
      moving = false

    const onMouseDown = (e) => {
      // 判断是否在可编辑状态下
      if(el.getAttribute('magicStatus') !== 'dblclick') e.preventDefault()
      // 鼠标点击处相对于左上角的坐标
      startX = e.clientX
      startY = e.clientY

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
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      // 拖拽移动位置
      if (direction === 'move') {
        el.style.transform = `translate(${startTranslateX + dx}px, ${startTranslateY + dy}px)`
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
      document.removeEventListener('mousemove', onStartMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousemove', onTouchBoundary)
    el.addEventListener('mousedown', onMouseDown)

    el.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止触发document的click
      if(el.getAttribute('magicStatus') === 'dblclick') return
      el.setAttribute('magicStatus', 'click');
      el.style.cursor = 'move';
    })
  }
