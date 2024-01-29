<script setup>
import { ref, reactive, watchEffect } from "vue";
let startX = ref(null);
let startY = ref(null);
// let startOffsetX = ref(null)
// let startOffsetY = ref(null)
let curCloneEl = ref(null);
let magicBoxList = reactive([]);

watchEffect(() => {
    console.log(magicBoxList);
});
const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
        startX.value = e.offsetX;
        startY.value = e.offsetY;

        let cloneEl = e.target.cloneNode(true);
        cloneEl.style.position = "absolute";
        cloneEl.id = new Date().getTime();
        cloneEl.style.top = "160px";
        cloneEl.style.left = "60px";
        cloneEl.style.zIndex = 22;
        cloneEl.draggable = true;
        console.log(cloneEl);
        cloneEl.addEventListener("dragstart", handleDragStart);
        cloneEl.addEventListener("mouseup", handleMouseUp);
        curCloneEl.value = cloneEl;
        e.target.parentNode.appendChild(cloneEl);
    }
};
const handleMouseUp = (e) => {
    curCloneEl.value.remove();
};

const handleDragStart = (e) => {
    e.dataTransfer.setData("dragEl", e.target.id);
};

const handleSourceAreaDrop = (e) => {
    e.preventDefault();
    curCloneEl.value.remove();
};

const handleDrop = (e) => {
    e.preventDefault();
    curCloneEl.value.remove();
    const dx = e.clientX - startX.value;
    const dy = e.clientY - startY.value - 50;
    const dragElemId = e.dataTransfer.getData("dragEl");

    magicBoxList.forEach((item) => {
        if (item && item.init) {
            item.init = false;
        }
    });

    if (!magicBoxList.some((b) => b?.id === dragElemId)) {
        magicBoxList.push({ id: dragElemId, translateX: dx, translateY: dy, init: true });
    }
};

const handleAllowDrop = (e) => {
    e.preventDefault();
};
</script>

<template>
    <MagicBox v-for="{ id, translateX, translateY, init } in magicBoxList" :key="id"
        :initPosition="init ? [translateX, translateY] : []" class="magic">文本框
    </MagicBox>
    <div class="container">
        <div class="components" id="source" :ondrop="handleSourceAreaDrop" :ondragover="handleAllowDrop">
            <div class="editor-source" :onmousedown="handleMouseDown" :onmouseup="handleMouseUp">
                文本框
            </div>
        </div>
        <div class="display-area" :ondrop="handleDrop" :ondragover="handleAllowDrop">
            <div class="preview">
                <div ref="captureElement">
                    <MagicBox>test
                    </MagicBox>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    width: 100%;
    margin-top: 50px;
}

.components {
    width: 45%;
    margin-left: 1%;
    padding: 10px;
    height: 100vh;
    border-radius: 5px;
    border: 1px solid #eee;
}

.display-area {
    margin-left: 20px;
    width: 600px;
}

.preview {
    padding: 20px 40px;
    border-radius: 5px;
    height: 800px;
    margin-bottom: 20px;
    border: 1px solid #eee;
}

.magic {
    position: absolute;
    width: 100px;
    text-align: center;
    padding: 2px;
}

.editor-source {
    border: 1px solid #ccc;
    padding: 2px;
    width: 100px;
    position: absolute;
    left: 60px;
    top: 160px;
    text-align: center;
    cursor: move;
}

.editor-source:hover {
    background-color: #b7d4f0a7;
}

.box {
    width: 200px;
}
</style>
