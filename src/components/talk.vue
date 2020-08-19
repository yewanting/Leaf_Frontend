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
     <div
      v-for="(talk_item,index) in talk"
      :key="index"
      class="total_talk_form"
    >
      <div class="left">
        <img :src="talk_item.course_img" :style="img_form" />
      </div>
      <div class="right" :style="'height:'+course_img_height+'px;'">
        <div>
          <span :style="descripe_form">{{talk_item.descripe}}</span>
        </div>
        <div class="right_bottom"> 
        <i class="iconfont icon-aixin"></i>
          <span>{{talk_item.love_count}}</span>
          <i class="iconfont icon-pinglun"></i>
           <span>{{talk_item.comment_count}}</span>
            
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
         attr: {
           text_background_color: "#ffffff",
            text_color: "#000000",
            text_font_size: "20",
            course_img_width: "150",
            course_img_height: "150",
            course_img_border_radius: "0",
      },
         is_show: false,
    };
  },
  computed: {
   img_form() {
      let img_form_s =
        "width:" +
        this.course_img_width +
        "px;" +
        "height:" +
        this.course_img_height +
        "px;" +
        "border-radius:" +
        this.course_img_border_radius +
        "px;";

      return img_form_s;
    },
    descripe_form() {
      let  descripe_form_s =
        "background-color:" +
        this.text_background_color +
        ";" +
        "font-size:" +
        this.text_font_size +
        "px;" +
        "color:" +
        this.text_color +
        ";";

      return descripe_form_s;
    },
  },
  props: [   
    "index",
    "talk",
    "text_background_color",
    "text_color",
    "text_font_size",
    "course_img_width",
    "course_img_height",
    "course_img_border_radius"
  ],

  created() {
    console.log("成功创建一个经典语录");
  },
  methods: {
    click_com_change() {
      this.attr.text_background_color = this.text_background_color;
      this.attr.text_color = this.text_color;
      this.attr.text_font_size = this.text_font_size;
      this.attr.course_img_width = this.course_img_width;
      this.attr.course_img_height = this.course_img_height;
      this.attr.course_img_border_radius = this.course_img_border_radius;
     

      this.$store.commit("CURCOMTYPE", "talk");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
    //   console.log(e.target.parentNode)
      this.$store.commit("CURRENTELEM", e.target.parentNode);
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
        show_border() {
      this.$el.style.border = "1px dotted rgb(241, 15, 15)";
      this.$el.style.cursor = "move";
      this.is_show = true;
    },
    unshow_border() {
      this.$el.style.border = "none";
      this.$el.style.cursor = "none";
      this.is_show = false;
    },
    remove_component() {
      this.$store.commit("IFSHOWYESNO", 1);
      this.$store.commit("DELETECOMPONENT", this.$el);
    },
  }
}
</script> 

<style scoped>
.total{
  margin:0;
  position: relative;
  width: 100%;
}
.total_talk_form{
    padding-bottom: 2%;
    border-bottom: 1px solid rgb(240, 221, 221);
}
.left {
  float: left;
  box-shadow: 0px 10px 30px #fae3e3;
  margin-right: 10px;
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
img {
  width: 100%;
  height: 100%;
}
.icon-aixin,.icon-pinglun{
    color:#bbacac
}
.right_bottom{
    float: right;
    color:#979595
}
</style>