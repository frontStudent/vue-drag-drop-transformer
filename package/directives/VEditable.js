export const vEditable = {
  mounted: (el, binding) => {
    if(binding.value?.disable) return
    el.style.border = 'none'
    el.style.padding = '5px'
    el.style.outline = 'none'
    el.contentEditable = true

    el.addEventListener('click', () => {
      el.style.border = '1px dashed #ccc'
      // 将input元素聚焦
      el.focus()
      typeof binding.value?.onFocus === 'function' && binding.value.onFocus(el)

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
      el.style.border = 'none'
      typeof binding.value?.onBlur === 'function' && binding.value.onBlur(el)
    })
  }
}
