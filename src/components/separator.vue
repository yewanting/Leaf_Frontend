<template>
    <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    @mouseenter="show_border"
    @mouseleave="unshow_border"
    :draggable="true"    
    class="total" 
    >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
    <div :style="separator_form" class="separator_form">
    </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            attr:{
                "border_color":"#000000",
                "border_form":"solid",
                "border_wide":"1",
            },
            is_show:false
        }
    },
    props:[
        "index",
        "border_color",
        "border_form",
        "border_wide",
        
    ],
    computed:{
        separator_form(){
            let separator_form_s = 'border:'+ this.border_wide+'px '+this.border_form +' '+this.border_color+';'
            return separator_form_s;
        }
    },
    methods: {
    click_com_change() {
      this.attr.border_color = this.border_color;
      this.attr.border_form = this.border_form;
      this.attr.border_wide = this.border_wide;
     

      this.$store.commit("CURCOMTYPE", "separator");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      this.$store.commit(
        "CURRENTELEM",
        e.target.parentNode
      );
    },
    onDragOver(event) {
      var event = event || window.event;
      event.preventDefault();
    },
    onDrop(event) {
      var e = event || window.event;

      var curNode = this.$store.state.currentElem;
      var targetNode = this.$el.parentNode;
      var parentnode = curNode.parentNode;

      parentnode.insertBefore(curNode, targetNode);
    },
    show_border(){
        this.$el.style.border  = "1px dotted rgb(241, 15, 15)"
        this.$el.style.cursor = "move";
        this.is_show = true;
   },
    unshow_border(){
        this.$el.style.border = "none";
        this.$el.style.cursor = "none";
        this.is_show = false;
    },
    remove_component(){
        this.$store.commit("IFSHOWYESNO",1)
        this.$store.commit("DELETECOMPONENT",this.$el)
    }
  },
}
</script>


<style scoped>
.total{
    margin:0;  
    position: relative;
    width: 100%;
    height:10px;
}
.icon-jurassic_gongbao {
  position: absolute;
  z-index: 100;
  width: 20px;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  font-size: 20px;
  color: #f58f8f;
}
.icon-chahao {
  position: absolute;
  top: 0;
  right: 0;
}
.icon-chahao:hover {
  cursor: pointer;
}
.separator_form{
    margin-top: 4px;
}


</style>