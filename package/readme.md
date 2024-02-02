## vue-drag-drop-transformer
### 背景
Drag and Drop是前端场景中常见功能需求，但细分也有很多不同的场景
- 直接将某个div从A区域拖动放置至B区域
- 单个列表中&双列表之间的拖拽排序
- 工具栏+画布式的应用（思维导图/原型设计/简历制作/可视化低代码平台等）

vue-drag-drop-transformer主要专注于工具栏+画布式应用的场景
1. 在点击元素时复制一份出来进行拖动，原始元素依然保留在工具区域
2. 工具栏元素拖放至画布后，赋予其可自定义的丰富功能（可编辑&可缩放&可移动等）

### 核心功能
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

当然，vue-drag-drop-transformer中已经封装了许多常用的处理函数可直接调用，具体见#dom操作方法与对应的自定义指令#

### 在vue3项目中引入
1. 安装
```
npm install vue-drag-drop-transformer
```

2. 全局引入 
```js title="src/main.js"
import { createApp } from 'vue'
import App from './App.vue'
import Transformer from 'vue-drag-drop-transformer'
const app = createApp(App)

app.use(Transformer)
app.mount('#app')
```

3. Demo示例参考
```vue title="App.vue"
<template>
    <div style="display:flex">
        <DragArea>
            <DragEditor>文本框</DragEditor>
            <DragElem elemType="rect">矩形</DragElem>
            <DragElem class="default-box">默认</DragElem>
        </DragArea>
        <DropArea :mapTypeToDropHandler="{ rect: handleDropRec }"></DropArea>
    </div>
</template>
  
<script setup>
import { useMoveable } from "vue-drag-drop-transformer"

const handleDropRec = (el) => {
    useMoveable(el)
}

</script>
  
<style scoped>
.default-box{
    background-color: #e8bbbb;
    padding: 10px;
    border: 1px solid #e40d0d;
}
</style>
```

### 组件

#### DragArea

#### DragElem

DragArea下的子元素，当用户点击时会自我复制一份以供拖动

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| elemType | 自定义的元素类型 | string | 'default' | >=1.0.3 |

#### DragEditor

DragEditor是elemType设置为'editor'时的DragElem，属于内置固定类型的可拖动元素

#### DropArea

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| mapTypeToDropHandler | 不同类型的元素在放置时触发的dom操作函数 | { [key: string]: (el: HTMLElement) => void } | {} | >=1.0.3 |

如果你不设置mapTypeToDropHandler属性：
当一个DragElem被拖放至DropArea时将保留原样，不会为其添加任何属性
当一个DragEditor被拖放至DropArea时将自动添加可编辑&可缩放&可移动的属性

如果你想覆盖DragEditor被拖放至DropArea后的行为，可以这样设置：
```jsx
<DropArea :mapTypeToDropHandler="{ editor: handleDropEditor }"></DropArea>
```
即用自定义的handleDropEditor覆盖对DragEditor的默认处理

#### MagicBox 

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| editable | 盒子是否可编辑内容 | boolean | true | >=1.0.3 |
| resizable | 盒子是否可调整大小 | boolean | true | >=1.0.3 |
| moveable | 盒子是否可自由拖动 | boolean | true | >=1.0.3 |
| rightBottomOnly | resizable为true时生效 只能通过右/下边界和右下角调整大小 | boolean | false | >=1.0.5 |

### dom操作方法与对应的自定义指令
| hook | directive | 说明 |
|---------|---------|---------|
| useMoveable | v-moveable | 鼠标按住可自由移动 |
| useResizable | v-resizable | 鼠标移至边框可自由缩放 | 
| useEditable | v-editable | 鼠标双击后进入可编辑状态 |

## 开发计划

- 更多回调函数支持，如onValueChange/onResize/onDrag等
- 右上角关闭按钮
- 拖拽时支持基准线/支持范围限制
- v-resizable指令支持按比例缩放