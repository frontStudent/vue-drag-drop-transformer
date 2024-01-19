import MagicBox from './MagicBox.vue'

const comps = [
	MagicBox
]
const install = (Vue) =>{
	console.log('install',Vue)
    comps.map((component)=>{
        Vue.component(component.__name, component);
    })
}
let windowObj = window
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
    const vm = windowObj.Vue.createApp({})
    install(vm)
}
 
export default install
