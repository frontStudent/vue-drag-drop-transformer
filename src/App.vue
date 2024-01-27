<script setup>
import { ref, reactive, watchEffect } from 'vue'
let startX = ref(null)
let startY = ref(null)
let curCloneEl = ref(null)
let magicBoxList = reactive([])

watchEffect(() => {
    console.log(magicBoxList)
})
const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
        startX.value = e.clientX
        startY.value = e.clientY

        let cloneEl = e.target.cloneNode(true)
        cloneEl.style.position = "absolute"
        cloneEl.id = new Date().getTime()
        cloneEl.style.top = '1px'
        cloneEl.style.left = '1px'
        cloneEl.style.zIndex = 22
        cloneEl.draggable = true
        cloneEl.addEventListener('dragstart', handleDragStart)
        cloneEl.addEventListener('mouseup', handleMouseUp)
        curCloneEl.value = cloneEl
        e.target.parentNode.appendChild(cloneEl)
    }
}
const handleMouseUp = (e) => {
    curCloneEl.value.remove()
}

const handleDragStart = (e) => {
    e.dataTransfer.setData("dragEl", e.target.id)
}

const handleSourceAreaDrop = (e) => {
    e.preventDefault();
    curCloneEl.value.remove()
}

const handleDrop = (e) => {
    e.preventDefault();
    curCloneEl.value.remove()
    const dx = e.clientX - startX.value
    const dy = e.clientY - startY.value
    const dragElemId = e.dataTransfer.getData("dragEl")

    magicBoxList.forEach((item) => {
        if (item && item.init) {
            item.init = false
        }
    })

    if (!magicBoxList.some(b => b?.id === dragElemId)) {
        magicBoxList.push({ id: dragElemId, translateX: dx, translateY: dy, init: true })
    }
}

const handleAllowDrop = (e) => {
    e.preventDefault();
}
</script>

<template>
    <div class="container">
        <div class="left" id="source" :ondrop="handleSourceAreaDrop" :ondragover="handleAllowDrop">
            <MagicBox v-for="({ id, translateX, translateY, init }) in magicBoxList" :key="id" :ref="id"
                :initPosition="init ? [translateX, translateY] : []" class="magic">文本框
            </MagicBox>
            <div class="editor-source" :onmousedown="handleMouseDown" :onmouseup="handleMouseUp">
                文本框
            </div>
        </div>
        <div class="target" :ondrop="handleDrop" :ondragover="handleAllowDrop">
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
}

.magic {
    position: absolute;
    width: 100px;
    text-align: center;
    padding: 2px;
}

.left {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    width: 300px;
}

.editor-source {
    border: 1px solid #ccc;
    padding: 2px;
    width: 100px;
    text-align: center;
    cursor: move;
}
.editor-source:hover {
    background-color: #b7d4f0a7;
}
.target {
    height: 200px;
    width: 300px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.box {
    width: 200px;
}
</style>