<template>
    <textarea class="magic-box" v-editable="{ disable: !props.editable }" v-resizable="{ disable: !props.resizable }"
        v-draggable="{ disable: !props.draggable }" :value="props.value" :style="{ fontSize: props.fontSize }" />
</template>
  
<script setup lang="ts">
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
</script>

<style scope>
.magic-box {
    position: absolute;
    top: 50%;
    left: 50%;
    outline: none;
    border: none;
    resize: none;
}
</style>