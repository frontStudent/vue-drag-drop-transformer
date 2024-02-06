# 演示
`vue-drag-drop-transformer`适用于vue3，假设你已经通过`npm create vue`或类似的指令搭建了一个基本的vue3项目，可以按照下面的过程在你的项目中引入`vue-drag-drop-transformer`并看到一个简单的演示效果。

## 1. 安装
```bash
npm install vue-drag-drop-transformer
```

## 2. 在main.js中引入 
```js title="src/main.js"
import { createApp } from 'vue'
import App from './App.vue'

import Transformer from 'vue-drag-drop-transformer'
import 'vue-drag-drop-transformer/dist/style.css'

const app = createApp(App)

app.use(Transformer)
app.mount('#app')
```

## 3. 在App.vue中编写示例代码
```vue title="App.vue"
<template>
    <div style="display:flex">
        <DragArea>
            <DragElem>默认</DragElem>
            <DragElem elemType="editor">文本框</DragElem>
            <DragElem elemType="move">仅可移动</DragElem>
        </DragArea>
        <DropArea
            :showFormatLine="true"
            :formatLineStyle="{color: 'green', width: '3px'}">
        >
        </DropArea>
    </div>
</template>
```

示例中的`DragArea`，`DragElem`和`DropArea`是`vue-drag-drop-transformer`中的核心组件，具体用法请参照组件文档。