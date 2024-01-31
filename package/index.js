import MagicBox from './components/MagicBox.vue'
import ElemArea from './components/ElemArea.vue'
import TargetArea from './components/TargetArea.vue'
import DragElem from './components/DragElem.vue'
import DragEditor from './components/DragEditor.vue'

import useEditable from './hooks/useEditable'
import useMoveable from './hooks/useMoveable'
import useResizable from './hooks/useResizable'
import useMagicBox from './hooks/useMagicBox'

import directives from './directives'

export { MagicBox, ElemArea, TargetArea }
export { useEditable, useMoveable, useResizable, useMagicBox }

const comps = [DragElem, DragEditor, MagicBox, ElemArea, TargetArea]
const install = (Vue) => {
  comps.map((component) => {
    Vue.component(component.__name, component)
  })
  // 注册指令
  Object.keys(directives).forEach((directiveName) => {
    Vue.directive(directiveName, directives[directiveName])
  })
}
let windowObj = window
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
  const vm = windowObj.Vue.createApp({})
  install(vm)
}

export default install
