<template>
    <div class="box" v-clone-draggable="{elemType: props.elemType}"><slot></slot></div>
</template>
  
<script setup lang="ts">
// import { ref } from 'vue'
import { vCloneDraggable } from '../directives/VCloneDraggable.js'

const props = defineProps({
    elemType: { type: String, default: 'default' },
})

</script>

<style scope>
.box {
    width: 100px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    cursor: move;
}
</style>