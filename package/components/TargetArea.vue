<template>
    <div id="target" :ondrop="handleDrop" :ondragover="handleAllowDrop">
    </div>
</template>

<script setup>
import useMagicBox from "../hooks/useMagicBox"
const props = defineProps({
    mapTypeToDropHandler: Object
})
const handleDrop = (e) => {
    e.preventDefault();
    const translateX = e.clientX - e.dataTransfer.getData("startX");
    const translateY = e.clientY - e.dataTransfer.getData("startY");
    const dragElemId = e.dataTransfer.getData("dragEl");
    const dragElem = document.getElementById(dragElemId);

    dragElem.draggable = false
    dragElem.style.transform = `translate(${translateX}px,${translateY}px)`

    const _mapTypeToDropHandler = {
        "editor" : useMagicBox,
        ...props.mapTypeToDropHandler
    }
    // 根据不同的elemType调用不同的drop处理函数
    const elemType = dragElem.getAttribute("elemType")
    const dropHandler = _mapTypeToDropHandler?.[elemType]
    dropHandler && dropHandler(dragElem)

    const targetArea = document.getElementById("target");
    targetArea.appendChild(dragElem);
};
const handleAllowDrop = (e) => {
    e.preventDefault();
};
</script>

<style scoped>
#target {
    margin: 30px;
    width: 300px;
    height: 500px;
    border: 1px solid #ccc;
}
</style>