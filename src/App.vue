<script setup>

const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
        let cloneEl = e.target.cloneNode(true)
        cloneEl.style.position = "absolute"
        cloneEl.id = 'draggable'
        cloneEl.style.top = '1px'
        cloneEl.style.left = '1px'
        cloneEl.style.zIndex = 22
        cloneEl.draggable = true
        cloneEl.addEventListener('dragstart', handleDragStart)
        e.target.parentNode.appendChild(cloneEl)
    }

}

const handleDragStart = (e) => {
    e.dataTransfer.setData("dragEl", e.target.id)
}

const handleDrop = (e) => {
    e.preventDefault();
    const dragEl = document.getElementById(e.dataTransfer.getData("dragEl"))
    dragEl.style.transform = `translate(${dragEl.offsetLeft}px,${dragEl.offsetTop}px)`
    e.target.appendChild(dragEl)
}

const handleAllowDrop = (e) => {
    e.preventDefault();
}
</script>

<template>
    <div class="left" id="source" :ondrop="handleDrop" :ondragover="handleAllowDrop">
        <div class="editor" :onmousedown="handleMouseDown">
            <div>文本框</div>
            <div>文本框</div>
        </div>
    </div>
    <div class="target" :ondrop="handleDrop" :ondragover="handleAllowDrop">
    </div>
</template>

<style scoped>
.left {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    height: 200px;
}

.editor {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    width: 200px;
    text-align: center;
}

.target {
    height: 400px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.box {
    width: 200px;
}
</style>