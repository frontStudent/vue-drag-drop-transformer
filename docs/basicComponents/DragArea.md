# DragArea 工具栏区域
工具栏区域，作为DragElem组件的父容器

## API
暂未设置用户自定义参数

## 代码示例
你可以在DragArea组件中放置多个DragElem组件

```vue title="App.vue"
<template>
    <DragArea>
        <DragElem>默认</DragElem>
        <DragElem elemType="default">默认</DragElem>
    </DragArea>
</template>
  
```