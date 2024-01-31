export default (el, binding) => {
  if (binding?.value?.disable) return
  el.style.outline = 'none'
  el.contentEditable = true

  el.addEventListener('dblclick', () => {
    el.setAttribute('magicStatus', 'dblclick')
    el.style.cursor = 'auto'
    // 将input元素聚焦
    el.focus()

    // 将光标移动到文本的末尾
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  })
}
