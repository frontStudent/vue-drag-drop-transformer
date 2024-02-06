# DropArea 画布区域
画布区域，当一个DragElem被拖放至DropArea时将会根据其elemType属性来决定其行为

## API
| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| mapTypeToDropHandler | 不同类型的元素在放置时触发的dom操作函数 | object | {} | >=0.0.1 |
| moveLimited | 移动元素时是否可超出DropArea的范围 | boolean | false | >=0.0.1 |
| showFormatLine | 是否显示对齐辅助线 | boolean | true | >=0.0.1 |
| formatLineStyle | 对齐辅助线样式 | object | {} | >=0.0.1 |

## 代码示例
下面的例子中，我们用自定义的handleDropEditor去覆盖了对editor类型元素的默认处理

```vue title="App.vue"
<template>
    <DragArea>
        <DragElem>默认</DragElem>
        <DragElem elemType="editor">文本框</DragElem>
        <DragElem elemType="typeA">类型A元素</DragElem>
    </DragArea>
    <DropArea 
        :mapTypeToDropHandler="{ 
            editor: handleDropEditor, 
            typeA: handleDropTypeA
        }" 
        :moveLimited="false" 
        :showFormatLine="true"
        :formatLineStyle="{color: 'green', width: '3px'}">
    </DropArea>
</template>

<script setup>
const handleDropEditor = (el) => {
    // 对类型为editor的元素做一些自定义的dom操作
    console.log(el)
}

const handleDropTypeA = (el) => {
    // 对类型为typeA的元素做一些自定义的dom操作
    console.log(el)
}
</script>
  
```
