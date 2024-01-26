<template>
    <div class="magic-box" v-editable="{ disable: !props.editable, onFocus: props.onFocus, onBlur: props.onBlur }" v-quit
        v-resizable="{ disable: !props.resizable, rightBottomOnly: false }" v-draggable="{ disable: !props.draggable }"
        :style="props.style">
        <slot></slot>
    </div>
</template>
  
<script setup lang="ts">
// import { ref } from 'vue'
import { vResizable } from './directives/VResizable.js'
import { vDraggable } from './directives/VDraggable.js'
import { vEditable } from './directives/VEditable.js'
import { vQuit } from './directives/VQuit.js'


const props = defineProps({
    editable: {
        type: Boolean,
        default: true
    },
    onFocus: {
        type: Function,
        default: () => { }
    },
    onBlur: {
        type: Function,
        default: () => { }
    },
    resizable: {
        type: Boolean,
        default: true
    },
    draggable: {
        type: Boolean,
        default: true
    },
    style: {
        type: Object,
        default: {}
    },
})

</script>

<style scope>
.magic-box {
    /* position: absolute;
    top: 50%;
    left: 50%; */
    width: 100%;
    /* outline: none; */
    border: none;
    /* resize: none; */

    font-weight: inherit;
    font-family: inherit;
    background-color: inherit;
}

.magic-box:hover {
    border: 1px dashed #ccc;
    cursor: pointer
}

.magic-box>*:hover {
    border: none;
}
</style>