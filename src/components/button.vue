<template>
  <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    @mouseenter="show_border"
    @mouseleave="unshow_border"

    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    :draggable="true"
     class="total" 
  >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
    <button :style="stylevalue">{{title}}</button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      attr: {
        title: "",
        background_color: "#ffffff",
        border_color: "#ffffff",
        text_color: "#000000",
        text_size: "15",
        width: "100",
        height: "30",
        line_height: "0",
        border_radius: "0",
        padding_top: "0",
        padding_left: "0",
      },
      is_show:false,
      lastenter:null,

     
    };
  },
  computed:{
  stylevalue(){
        let s =  'height:' +
        this.height +
        'px;' +
        'width:' +
        this.width +
        'px;' +
        'background-color:' +
        this.background_color +
        ';' +
        'border-color:' +
        this.border_color +
        ';' +
        'color:' +
        this.text_color +
        ';' +
        'font-size:' +
        this.text_size +
        'px;' +
        'width:' +
        this.width +
        'px;' +
        'height:' +
        this.height +
        'px;' +
        'line-height:' +
        this.line_height +
        'px;' +
        'border-radius:' +
        this.border_radius +
        'px;' +
        'padding-top:' +
        this.padding_top +
        'px;' +
        'padding-left:' +
        this.padding_left +
        'px;'
        // 'float:'+
        // this.position
        return s;
  },
  cur_move_id(){
     return this.$store.state.cur_move_id;
  }
       
  },
  props: [
    "index",
    // "position",
    "title",
    "background_color",
    "border_color",
    "text_color",
    "text_size",
    "width",
    "height",
    "line_height",
    "border_radius",
    "padding_top",
    "padding_left",
  ],

  created() {
    console.log("成功创建一个按钮");
  },
  methods: {
    click_com_change() {
      // this.attr.position = this.position;
      this.attr.title = this.title;
      this.attr.background_color = this.background_color;
      this.attr.border_color = this.border_color;
      this.attr.text_color = this.text_color;
      this.attr.text_size = this.text_size;
      this.attr.width = this.width;
      this.attr.height = this.height;
      this.attr.line_height = this.line_height;
      this.attr.border_radius = this.border_radius;
      this.attr.padding_top = this.padding_top;
      this.attr.padding_left = this.padding_left;
      this.attr.width = this.width;

      // console.log(this.stylevalue)
      this.$store.commit("CURCOMTYPE", "button");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      this.$store.commit("CURRENTELEM", e.target.parentNode);
      this.$store.commit("CURMOVEID", this.index);
    },
    onDragOver(event) {
      var event = event || window.event;

      event.preventDefault();
    },
     onDragEnter(event){
      var event = event || window.event;
      this.lastenter = event.target;
      if(this.index!=this.cur_move_id)
      {
        console.log("进入的区域",this.lastenter);
      }

     
     
    },
// nextElementSibling
    onDragLeave(event){
      var event = event || window.event;
       if(this.index!=this.cur_move_id)
      console.log("离开的区域",event.target)
      //  if(this.lastenter ==event.target)
      // {
      //   console.log("离开的区域",event.target)
      //   event.target.style.background = 'red';
      // }
      // var parentnode = event.target.parentNode;
      // parentnode.removeChild(event.target.previousSibling);


      //  console.log("离开该区域",event.target)
    },
    onDrop(event) {
      // console.log(event);
      var e = event || window.event;

      var curNode = this.$store.state.currentElem;
      var targetNode = this.$el.parentNode;
      var parentnode = curNode.parentNode;

      // console.log(curNode);
      // console.log(targetNode);
      // console.log(parentnode);

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
};
</script>


<style scoped>
.total{
    margin:0;
    position: relative;
    width: 100%;
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