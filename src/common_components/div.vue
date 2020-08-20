<template>
    <div>
        {{text}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            text:"将拖放到这里"
        }
    }
}
</script>


<style scoped>
div{
    width: 100%;
    height:30px;
    border:1px solid #cfa3a3;
}
</style>
