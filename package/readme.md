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
    <div>
        <MagicBox></MagicBox>
    </div>
</template>
```

### 参数说明

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| editable | 盒子是否可编辑内容 | boolean | true | >=1.0.3 |
| resizable | 盒子是否可调整大小 | boolean | true | >=1.0.3 |
| draggable | 盒子是否可拖拽移动位置 | boolean | true | >=1.0.3 |
| value | 盒子内部文字内容 | string | '可拖拽、可形变、可编辑的神奇盒子' | >=1.0.3 |
| fontSize | 盒子内部文字大小 | string | '16px' | >=1.0.3 |

### 版本历史
1.0.0 - 1.0.3
测试发布/初始版本