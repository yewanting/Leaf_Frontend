<template>
  <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    :draggable="true"
  >
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
      // console.log("开始拖拽");
      // console.log("当前移动的是", e.target);
    //  console.log(e.target.parentNode)
      this.$store.commit("CURRENTELEM", e.target.parentNode);
      // this.$store.state.currentElem = e.target.parentNode
    },
    onDragOver(event) {
      var event = event || window.event;
      event.preventDefault();
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
  },
};
</script>


<style scoped>
</style>