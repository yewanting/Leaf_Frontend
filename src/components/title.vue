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
    :style="'text-align:'+this.position+';'"
    >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
        <span :style="content_form">{{content}}</span>
    </div>
</template>


<script>
export default {
    data(){
        return {
            attr:{
                "content":"标题文本",
                "background_color":"#ffffff",
                "color":"#000000",
                "font_size":"18",
                "position":"",
            },
            is_show:false
        }
    },
    props:[
        "index",
        "content",
        "background_color",
        "color",
        "font_size",
        "position",
        
    ],
    computed:{
        content_form(){
            let content_form_s = 'background-color:'+this.background_color+';'+
            'color:'+this.color+';'+'font-size:'+this.font_size+'px;';

            return content_form_s;
        }
    },
    methods: {
    click_com_change() {
      this.attr.content = this.content;
      this.attr.background_color = this.background_color;
      this.attr.color = this.color;
      this.attr.font_size = this.font_size;
     

      this.$store.commit("CURCOMTYPE", "title");
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
    font-weight: bold;
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


</style>