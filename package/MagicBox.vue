<template>
    <el-dropdown trigger="contextmenu" class="menu" @command="handleCommand">
        <textarea class="magic-box" v-editable="{ disable: !props.editable }" v-resizable="{ disable: !props.resizable }"
            v-draggable="{ disable: !props.draggable }" :value="props.value" :style="{ fontSize: props.fontSize }"
            v-if="showMenu" />
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="del">删除</el-dropdown-item>
                <!-- <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item> -->
                <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item> -->
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
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
        default: '25px'
    },
})

let showMenu = ref(true)
const handleCommand = (command) => {
    switch (command) {
        case 'del':
            showMenu.value = false
            break
        default:
            break
    }

}
// let magicbox = ref(null)

// let showMenu = ref(false)
// let menu = ref(null)
// let mousePoint = ref({ x: 0, y: 0 })

// watchEffect(() => {
//     // 在鼠标右击处绘制菜单
//     if (menu.value) {
//         menu.value.style.left = mousePoint.value.x + 'px'
//         menu.value.style.top = mousePoint.value.y + 'px'
//     }
// })
// onMounted(() => {
//     // 监听鼠标右击事件，显示菜单
//     magicbox.value.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//         showMenu.value = true;
//         mousePoint.value.x = e.clientX;
//         mousePoint.value.y = e.clientY;
//     })
//     // 监听鼠标点击事件，隐藏菜单
//     window.addEventListener('click', () => { showMenu.value = false; })
// })

</script>

<style scope>
.menu {
    position: absolute;
    top: 50%;
    left: 50%;

}

.magic-box {
    position: absolute;
    top: 50%;
    left: 50%;
    outline: none;
    border: none;
    resize: none;
    font-weight: 800;
    text-align: center;
    font-family: inherit;
    background-color: inherit;
}
</style>