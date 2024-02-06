import MagicBox from './components/MagicBox.vue'
import DragArea from './components/DragArea.vue'
import DropArea from './components/DropArea.vue'
import DragElem from './components/DragElem.vue'
import DragEditor from './components/DragEditor.vue'

import useEditable from './hooks/useEditable'
import useMoveable from './hooks/useMoveable'
import useResizable from './hooks/useResizable'
import useEditor from './hooks/useEditor'

import directives from './directives'

export { DragElem, DragEditor, MagicBox, DragArea, DropArea }
export { useEditable, useMoveable, useResizable, useEditor }

const comps = [DragElem, DragEditor, MagicBox, DragArea, DropArea]
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
