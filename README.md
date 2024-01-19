# vue-magic-box
可用于vue3的可拖拽可形变可编辑的组件
## 项目结构
package文件夹即我们要发布到npm的组件包，在该文件夹根目录下执行发布命令
通过npm link可以在src/App.vue中进行调试
## 开发计划
1.0.4
- 暴露出v-resizable和v-draggable指令
- editable为false时暴露div而不是textarea
- 支持<MagicBox>hello</MagicBox>的传值方式
- 更多样式支持，如hover时border样式变化
- 更多回调函数支持，如onValueChange/onResize/onDrag等