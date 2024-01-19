export const vEditable = {
  mounted: (el, binding) => {
    if(binding.value?.disable) return
    el.style.outline = 'none'
    el.style.border = 'none'
    el.style.padding = '5px'
    el.style.resize = 'none'
    el.addEventListener('click', () => {
      el.style.border = '1px dashed #ccc'
      // 将input元素聚焦
      el.focus()
    })
    // 给input元素添加失焦事件，当失焦时恢复为div元素
    el.addEventListener('blur', () => {
      el.style.border = 'none'
    })
  }
}
