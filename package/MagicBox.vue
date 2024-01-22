<template>
    <textarea ref="magicbox" class="magic-box" v-editable="{ disable: !props.editable }"
        v-resizable="{ disable: !props.resizable }" v-draggable="{ disable: !props.draggable }" :value="props.value"
        :style="{ fontSize: props.fontSize }" />
    <div v-show="showMenu" ref="menu" class="menu">2222</div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { vResizable } from './directives/VResizable.js'
import { vDraggable } from './directives/vDraggable.js'
import { vEditable } from './directives/VEditable.js'

const props = defineProps({
    editable: {
        type: Boolean,
        default: true
    },
    resizable: {
        type: Boolean,
        default: true
    },
    draggable: {
        type: Boolean,
        default: true
    },
    value: {
        type: String,
        default: '可拖拽、可形变、可编辑的神奇盒子'
    },
    fontSize: {
        type: [String, Number],
        default: '16px'
    },
})
let showMenu = ref(false)
let magicbox = ref(null)
let menu = ref(null)
let mousePoint = ref({ x: 0, y: 0 })

watchEffect(() => {
    // 在鼠标右击处绘制菜单
    if (menu.value) {
        menu.value.style.left = mousePoint.value.x + 'px'
        menu.value.style.top = mousePoint.value.y + 'px'
    }
})
onMounted(() => {
    // 监听鼠标右击事件，显示菜单
    magicbox.value.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showMenu.value = true;
        mousePoint.value.x = e.clientX;
        mousePoint.value.y = e.clientY;
    })
    // 监听鼠标点击事件，隐藏菜单
    window.addEventListener('click', () => { showMenu.value = false; })
})

</script>

<style scope>
.magic-box {
    position: absolute;
    top: 50%;
    left: 50%;
    outline: none;
    border: none;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    background-color: inherit;
}

.menu {
    position: absolute;
}
</style>