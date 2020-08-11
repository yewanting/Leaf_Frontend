<template>
  <div @dragstart="onDragStart" @dragover="onDragOver" @drop="onDrop"  @click="click_com_change" :draggable="true" >
    <button :style="'height:'+height+'px;width:'+width+'px;background-color:'+background_color+';'">{{title}}</button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      
      attr:{
        title:"",
        background_color:"",
      }
    };
  },
  props: [
    "title",
    "background_color",
    "index",
     "height",
      "width"
      ],

  created() {
    console.log("成功创建一个按钮");
  },
  methods: {
   click_com_change(){


      this.attr.title = this.title
      this.attr.background_color = this.background_color
      this.$store.commit("CURCOMTYPE",'button');
      this.$store.commit("CURCOMATTR",this.attr);
      this.$store.commit("CURCOMID",this.index);

   },
    onDragStart(event) {
        var e = event || window.event;
        console.log("开始拖拽");
        console.log("当前移动的是", e.target);

        this.$store.commit("CURRENTELEM",e.target.parentNode);
        // this.$store.state.currentElem = e.target.parentNode
       
    },
    onDragOver(event) {
        var event = event || window.event;
        event.preventDefault();
    },
    onDrop(event) {
        console.log(event);
        var e = event || window.event;

        var curNode = this.$store.state.currentElem
        var targetNode = this.$el.parentNode;
        var parentnode = curNode.parentNode;

        console.log(curNode)
        console.log(targetNode)
        console.log(parentnode)

        parentnode.insertBefore(curNode, targetNode);
    },
  },
};
</script>


<style scoped>
</style>