<template>
    <div class="magic-box" 
        v-editable="{ disable: !props.editable }" 
        v-resizable="{ disable: !props.resizable, rightBottomOnly: false }" 
        v-moveable="{ disable: !props.moveable, translateParams: props.initPosition }"
        v-click-outside
        :style="props.style"
    >
        <slot></slot>
    </div>
</template>
  
<script setup lang="ts">
// import { ref } from 'vue'
import { vResizable } from '../directives/VResizable.js'
import { vMoveable } from '../directives/VMoveable.js'
import { vEditable } from '../directives/VEditable.js'
import { vClickOutside } from '../directives/VClickOutside.js'

const props = defineProps({
    editable: {
        type: Boolean,
        default: true
    },
    resizable: {
        type: Boolean,
        default: true
    },
    moveable: {
        type: Boolean,
        default: true
    },
    initPosition: {
        type: Array
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