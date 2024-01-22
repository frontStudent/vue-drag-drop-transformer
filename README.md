# vue-magic-box
可用于vue3的可拖拽可形变可编辑的组件
## 项目结构
package文件夹即我们要发布到npm的组件包，在该文件夹根目录下执行发布命令
通过npm link可以在src/App.vue中进行调试
## 开发计划
1.0.4
- 暴露出v-resizable和v-draggable指令
- 支持右击出现菜单删除该盒子（更多操作？）
- 支持在调整盒子大小时内部文字自适应
- 支持<MagicBox>hello</MagicBox>的传值方式
- 更多回调函数支持，如onValueChange/onResize/onDrag等