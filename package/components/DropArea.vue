<template>
    <div id="target" :ondrop="handleDrop" :ondragover="handleAllowDrop">
    </div>
    <div id="vertical-line" :style="verticalLineStyle"></div>
    <div id="horizon-line" :style="horizonLineStyle"></div>
</template>

<script setup>
import { useEditor, useMoveable, useResizable } from "../hooks"
const props = defineProps({
    mapTypeToDropHandler: Object,
    moveLimited: {
        type: Boolean,
        default: false
    },
    showFormatLine: {
        type: Boolean,
        default: true
    },
    formatLineStyle: {
        type: Object
    }
})

const verticalLineStyle = {
    backgroundColor: props.formatLineStyle.color,
    ...props.formatLineStyle
}

const horizonLineStyle = {
    backgroundColor: props.formatLineStyle.color,
    height: props.formatLineStyle.width,
    ...props.formatLineStyle,
    width: '100%'
}

const _mapTypeToDropHandler = {
    "editor": useEditor,
    "move": useMoveable,
    "resize": useResizable,
    "move-resize": (el, binding) => {
        useResizable(el, binding)
        useMoveable(el, binding)
    },
    ...props.mapTypeToDropHandler
}

const binding = { value: {...props} }

const handleDrop = (e) => {
    e.preventDefault();
    const translateX = e.clientX - e.dataTransfer.getData("startX");
    const translateY = e.clientY - e.dataTransfer.getData("startY");
    const dragElemId = e.dataTransfer.getData("dragEl");
    const dragElem = document.getElementById(dragElemId);

    dragElem.draggable = false
    dragElem.style.transform = `translate(${translateX}px,${translateY}px)`
    const elemType = dragElem.getAttribute("elemType")

    handleChildrenDrop(dragElem, elemType)

    const targetArea = document.getElementById("target");
    targetArea.appendChild(dragElem);
};

const handleChildrenDrop = (dragElem, elemType) => {
    if (!dragElem) return

    // 根据不同的elemType调用不同的drop处理函数
    const dropHandler = _mapTypeToDropHandler?.[elemType]
    dropHandler && dropHandler(dragElem, binding)

    Object.values(dragElem.children).forEach(child => {
        handleChildrenDrop(child, elemType);
    });
}

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

#vertical-line {
    width: 2px;
    height: 100%;
    background-color: #d72626;
    position: absolute;
    top: 0px;
    left: -99999px
}

#horizon-line {
    width: 100%;
    height: 2px;
    background-color: #d72626;
    position: absolute;
    left: 0;
    top: -99999px;
}
</style>