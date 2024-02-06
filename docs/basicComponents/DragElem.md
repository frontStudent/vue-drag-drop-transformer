# DragElem 可拖动元素
DragArea下的子元素，当用户点击时会自我复制一份以供拖动

## API
| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| elemType | 元素类型 | string | 'default' | >=0.0.1 |

## 代码示例
`vue-drag-drop-transformer`中内置了一些固定的`elemType`属性，当然用户也可以自定义elemType属性值

elemType属性表示元素类型，需要配合DropArea组件一起使用才能发挥出其作用

```vue title="App.vue"
<template>
    <DragArea>
        <DragElem>默认</DragElem>

        <!-- vue-drag-drop-transformer中内置的elemType属性： -->
        <DragElem elemType="default">默认</DragElem>
        <DragElem elemType="editor">文本框</DragElem>
        <DragElem elemType="move">仅可移动</DragElem>
        <DragElem elemType="resize">仅可缩放</DragElem>
        <DragElem elemType="move-resize">可移动-可缩放</DragElem>

        <!-- elemType也可自定义 -->
        <DragElem elemType="typeA">类型A元素</DragElem>
        <DragElem elemType="typeB">类型B元素</DragElem>
    </DragArea>
</template>
  
```
