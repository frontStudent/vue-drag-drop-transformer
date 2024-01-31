export default (offsetX, offsetY, offsetWidth, offsetHeight, limit) => {
  // 是否在中心
  if (
    offsetX > limit &&
    offsetY > limit &&
    offsetX < offsetWidth - limit &&
    offsetY < offsetHeight - limit
  ) {
    el.style.cursor = 'move'
  }
  // 是否在上边界
  if (offsetY < limit) {
    el.style.cursor = 'n-resize'
    return
  }
  // 是否在右上角
  if (offsetX > offsetWidth - limit && offsetY < limit) {
    el.style.cursor = 'ne-resize'
    return
  }
  // 是否在右边界
  if (offsetX > offsetWidth - limit) {
    el.style.cursor = 'e-resize'
    return
  }
  // 是否在右下角
  if (offsetX > offsetWidth - limit && offsetY > offsetHeight - limit) {
    el.style.cursor = 'se-resize'
    return
  }
  // 是否在下边界
  if (offsetY > offsetHeight - limit) {
    el.style.cursor = 's-resize'
    return
  }
  // 是否在左下角
  if (offsetX < limit && offsetY > offsetHeight - limit) {
    el.style.cursor = 'sw-resize'
    return
  }
  // 是否在左边界
  if (offsetX < limit) {
    el.style.cursor = 'w-resize'
    return
  }
  // 是否在左上角
  if (offsetX < limit && offsetY < limit) {
    el.style.cursor = 'nw-resize'
    return
  }
  el.style.cursor = 'default'
}
