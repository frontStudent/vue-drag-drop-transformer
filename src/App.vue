<template>
    <div style="display:flex">
        <DragArea>
            <DragElem>默认</DragElem>
            <DragElem elemType="editor">文本框</DragElem>
            <DragElem elemType="move">仅可移动</DragElem>
            <DragElem elemType="move-resize" class="img-container">
                <img src="./assets/test-img.png" style="height: 100px; width: 100px" />
            </DragElem>
            <!-- <DragElem elemType="move-resize" style="width: 200px">
                <DragElem>子元素1</DragElem>
                <DragElem>子元素2</DragElem>
            </DragElem> -->
        </DragArea>
        <DropArea 
            :mapTypeToDropHandler="{ typeA: handleDropTypeA }" 
            :moveLimited="false" 
            :showFormatLine="true"
            :formatLineStyle="{color: 'green', width: '3px'}">
        </DropArea>
    </div>
</template>
  
<script setup>
const handleDropTypeA = (el) => {
    // 对类型为typeA的元素做一些自定义的dom操作
    console.log(el)
}

</script>
  
<style scoped>
.img-container {
    border: none;
    padding: 0px
}
</style>