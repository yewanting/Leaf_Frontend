<template>
    <div class="toast_total" v-if="if_show_yes_no==1">
        <div class="text">是否删除该组件？</div>
            <my_button v-for="(value,k) in btn" :key="k"
            :title="btn[k].title"
            :background_color=btn[k].background_color
            :width="btn[k].width"
            :height="btn[k].height"
            :border_radius=btn[k].border_radius
             class="btn"
            ></my_button>
    </div>
</template>



<script>
import my_button from '../common_components/button.vue'
export default {
    data(){
        return{
            btn:[
                {
                    title:"是",
                    background_color:"#ffffff",
                    border_radius:"50",
                    width:"100",
                    height:"30",
                },
                 {
                    title:"否",
                    background_color:"#ffffff",
                    border_radius:"50",
                    width:"100",
                    height:"30",
                }
            ]
           
        }
    },
    components:{
        my_button
    },
    computed:{
        if_show_yes_no(){
            return this.$store.state.if_show_yes_no
        }
    },
    methods:{
       
    }
}
</script>


<style scoped>
.toast_total{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    width: 50%;
    height: 20%;
    z-index :101;
    border: 1px solid #838383;
    box-shadow: 0px 10px 30px #fae3e3;
    background-color: #ffffff;
}
.text{
    text-align: center;
    color:#af1818;
    margin-top: 10%;
}
.btn{
    float: left;
    margin-top:15%;
    margin-left: 5%;
}

</style>