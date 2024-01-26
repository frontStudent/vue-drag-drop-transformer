# vue-magic-box
可用于vue3的可拖拽可形变可编辑的组件
## 项目结构
package文件夹即我们要发布到npm的组件包，在该文件夹根目录下执行发布命令
通过npm link可以在src/App.vue中进行调试
## 开发计划
1.0.6
- 更多回调函数支持，如onValueChange/onResize/onDrag等
- 右上角关闭按钮
- 拖拽时支持基准线/支持范围限制
- v-resizable指令支持按比例缩放