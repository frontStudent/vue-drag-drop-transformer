<template>
    <DragElem elemType="editor"><slot></slot></DragElem>
</template>
  
<script setup lang="ts">
import DragElem from './DragElem.vue';
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