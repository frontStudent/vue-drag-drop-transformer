import MagicBox from './MagicBox.vue'
import directives from './directives'

const comps = [MagicBox]
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
