<template>
    <div style="display:flex">
        <ElemArea>
            <DragEditor>文本框</DragEditor>
            <DragElem elemType="rect">矩形</DragElem>
            <DragElem class="default-box">默认</DragElem>
        </ElemArea>
        <TargetArea :mapTypeToDropHandler="{ rect: handleDropRec }"></TargetArea>
    </div>
</template>
  
<script setup>
import { useMoveable } from "vue-drag-drop-transformer"

const handleDropRec = (el) => {
    useMoveable(el)
}

</script>
  
<style scoped>
.default-box{
    background-color: #e8bbbb;
    padding: 10px;
    border: 1px solid #e40d0d;
}
</style>