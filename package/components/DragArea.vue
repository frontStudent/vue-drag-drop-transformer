<template>
    <div id="source" :ondrop="handleDragAreaDrop" :ondragover="handleAllowDrop">
        <slot></slot>
    </div>
</template>

<script setup>
const handleDragAreaDrop = (e) => {
    const dragElemId = e.dataTransfer.getData("dragEl");
    const dragElem = document.getElementById(dragElemId);
    dragElem.remove();
};
const handleAllowDrop = (e) => {
    e.preventDefault();
};
</script>

<style scoped>
#source {
    margin: 30px;
    width: 300px;
    height: 500px;
    border: 1px solid #ccc;
}
</style>