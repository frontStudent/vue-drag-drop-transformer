### 功能简介
一个可拖拽、可形变、可编辑内容的神奇盒子

### 在vue3项目中引入
1. 安装
```
npm install vue-magic-box
```

2. 全局引入 
```js title="src/main.js"
import { createApp } from 'vue'
import App from './App.vue'
import MagicBox from 'vue-magic-box'
const app = createApp(App)

app.use(MagicBox)
app.mount('#app')
```

3. 使用
```vue title="App.vue"
<template>
    <MagicBox :style="{top: '100px',left: '200px'}">
        11111111111111111111111111111111
    </MagicBox>
</template>
```

### 参数说明

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| editable | 盒子是否可编辑内容 | boolean | true | >=1.0.3 |
| resizable | 盒子是否可调整大小 | boolean | true | >=1.0.3 |
| draggable | 盒子是否可拖拽移动位置 | boolean | true | >=1.0.3 |
| style | 盒子样式 | object | {} | >=1.0.5 |
| onFocus | editable为true时生效 获得焦点时的回调函数 | function | () => {} | >=1.0.5 |
| onBlur | editable为true时生效 失去焦点时的回调函数 | function | () => {} | >=1.0.5 |

### 版本历史
1.0.0 - 1.0.3
测试发布/初始版本