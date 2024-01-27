export const vEditable = {
  mounted: (el, binding) => {
    if(binding.value?.disable) return
    el.style.outline = 'none'
    el.contentEditable = true

    el.addEventListener('dblclick', () => {
      // 将input元素聚焦
      el.focus()
      typeof binding.value?.onFocus === 'function' && binding.value?.onFocus(el)

      // 将光标移动到文本的末尾
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    })
    // 给input元素添加失焦事件
    el.addEventListener('blur', () => {
      typeof binding.value?.onBlur === 'function' && binding.value?.onBlur(el)
    })

    el.addEventListener('dblclick', () => {   
      el.setAttribute('magicStatus', 'dblclick');
      el.style.cursor = 'auto'
    })
  }
}
