# vue-drag-drop-transformer
## 背景
Drag and Drop是前端场景中常见功能需求，但细分也有很多不同的场景
- 直接将某个div从A区域拖动放置至B区域
- 单个列表中&双列表之间的拖拽排序
- 工具栏+画布式的应用（思维导图/原型设计/简历制作/可视化低代码平台等）

vue-drag-drop-transformer主要专注于工具栏+画布式应用的场景
1. 在点击元素时复制一份出来进行拖动，原始元素依然保留在工具区域
2. 工具栏元素拖放至画布后，赋予其可自定义的丰富功能（可编辑&可缩放&可移动等）

## 核心功能
vue-drag-drop-transformer不同于其他拖拽库的核心点在于，能够在元素被drop后，展现出和被drag前不同的特性。
试想一个类型为文本框的元素，它被drag前只是工具栏中示意性的图标，只有被drop到画布后，才能被用户进行编辑&缩放&拖动等操作。

将这个例子抽象为更普遍的需求：
一个类型为A的元素，在拖拽至画布后，需要能够进行X操作
一个类型为B的元素，在拖拽至画布后，需要能够进行Y操作
一个类型为C的元素，在拖拽至画布后，只需和原先保持一致
···

vue-drag-drop-transformer提供了三类主要组件完成上述需求
- DragArea 工具栏区域
- DragElem 工具栏中的元素
- DropArea 画布区域
使用者在DragElem组件上设置elemType属性表示其类型，在DropArea组件上设置mapTypeToDropHandler属性，将元素类型映射到对应的处理函数，处理函数中可以进行自定义dom操作

当然，vue-drag-drop-transformer中已经封装了许多常用的处理函数可直接调用
- useMoveable 鼠标按住可自由移动
- useResizable 鼠标移至边框可自由缩放
- useEditable 鼠标双击后进入可编辑状态
...

## 项目结构
package文件夹即我们要发布到npm的组件包，在该文件夹根目录下执行发布命令
通过npm link可以在src/App.vue中进行调试
## 开发计划

- 更多回调函数支持，如onValueChange/onResize/onDrag等
- 右上角关闭按钮
- 拖拽时支持基准线/支持范围限制
- v-resizable指令支持按比例缩放