### 功能简介
一个可拖拽、可缩放、可编辑内容的神奇盒子

用户友好的交互：
- 单击盒子后进入可拖拽/可缩放状态
- 双击盒子时进入可编辑状态
- 点击空白处退出
- 拖拽/调整大小时支持基准线

丰富的入参配置：
- 可自定义是否需要可拖拽、可缩放、可编辑内容
- 可限制拖拽范围/调整大小的最值等参数
- 暴露各种事件触发时回调函数
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
    <MagicBox :editable="false">
        11111111111111111111111111111111
    </MagicBox>
    <MagicBox :resizable="false">
        11111111111111111111111111111111
    </MagicBox>
    <MagicBox :moveable="false">
        11111111111111111111111111111111
    </MagicBox>
</template>
```

### 参数说明

| 参数名 | 说明 | 类型 | 默认值 | 版本 |
|---------|---------|---------|---------|---------|
| editable | 盒子是否可编辑内容 | boolean | true | >=1.0.3 |
| resizable | 盒子是否可调整大小 | boolean | true | >=1.0.3 |
| moveable | 盒子是否可自由拖动 | boolean | true | >=1.0.3 |
| style | 盒子样式 | object | {} | >=1.0.5 |
| rightBottomOnly | resizable为true时生效 只能通过右/下边界和右下角调整大小 | boolean | false | >=1.0.5 |

### 版本历史
1.0.0 - 1.0.4
测试发布/初始版本

1.0.5
1. 从基于绝对定位的实现方式改为基于css的transform属性的实现方式
2. 暴露出了v-draggable/v-resizable/v-editable指令