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
    :style="(course_form=='横向滑动')?row:''"
  >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
 


    <div
      :style="detail_form"
      v-for="(goods_item,index) in goods"
      :key="index"
      v-show="course_form=='详细列表'"
    >
      <div class="left">
        <img :src="goods_item.course_img" :style="img_form" />
      </div>
      <div :style="'height:'+course_img_height+'px;'">
        <div>
          <span :style="title_form">{{goods_item.title}}</span>
        </div>
        <div>
          <span :style="descripe_form">{{goods_item.descripe}}</span>
        </div>
        <div>
          <span :style="label_form">{{goods_item.label}}</span>
        </div>
        <div :style="price_form">
          <span :style="'float:'+price_position+';'">{{goods_item.price}}</span>
        </div>
      </div>
    </div>

    <div
      :style="small_form"
      v-for="(goods_item,index) in goods"
      :key="index+'small'"
      v-show="course_form=='小图'"
    >
      <div :style="small_top">
        <img
          :src="goods_item.course_img"
          :style="'border-radius:' +course_img_border_radius +
        'px;'"
        />
      </div>
      <div :style="small_bottom">
        <div>
          <span :style="title_form">{{goods_item.title}}</span>
        </div>
        <div>
          <span :style="descripe_form">{{goods_item.descripe}}</span>
        </div>
        <div>
          <span :style="label_form">{{goods_item.label}}</span>
        </div>
        <div :style="price_form">
          <span :style="'float:'+price_position+';'">{{goods_item.price}}</span>
        </div>
      </div>
    </div>

    <div
      :style="big_form"
      v-for="(goods_item,index) in goods"
      :key="index+'big'"
      v-show="course_form=='大图'"
    >
      <div :style="big_top">
        <img
          :src="goods_item.course_img"
          :style="'border-radius:' +course_img_border_radius +
        'px;'"
        />
      </div>
      <div>
        <div>
          <span :style="title_form">{{goods_item.title}}</span>
        </div>
        <div>
          <span :style="descripe_form">{{goods_item.descripe}}</span>
        </div>
        <div :style="price_form">
          <span :style="'float:'+price_position+';'">{{goods_item.price}}</span>
        </div>
      </div>
    </div>

    <div
      :style="row_form"
      v-for="(goods_item,index) in goods"
      :key="index+'row'"
      v-show="course_form=='横向滑动'"
    >
      <div :style="row_top">
        <img :src="goods_item.course_img" />
      </div>
      <div style="float:left;">
        <div>
          <span :style="title_form">{{goods_item.title}}</span>
        </div>
        <div>
          <span :style="descripe_form">{{goods_item.descripe}}</span>
        </div>
        <div>
          <span :style="label_form">{{goods_item.label}}</span>
        </div>
        <div :style="price_form">
          <span :style="'float:'+price_position+';'">{{goods_item.price}}</span>
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
        title_background_color: "#ffffff",
        title_color: "#000000",
        title_font_size: "20",
        descripe_background_color: "#ffffff",
        descripe_color: "#000000",
        descripe_font_size: "15",
        label_background_color: "#ffffff",
        label_color: "#a89e9e",
        label_font_size: "18",
        price_background_color: "#ffffff",
        price_color: "#123456",
        price_position: "right",
        price_size: "15",
        course_img_width: "100",
        course_img_height: "100",
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
    title_form() {
      let title_form_s =
        "background-color:" +
        this.title_background_color +
        ";" +
        "font-size:" +
        this.title_font_size +
        "px;" +
        "color:" +
        this.title_color +
        ";";

      return title_form_s;
    },
    descripe_form() {
      let descripe_form_s =
        "background-color:" +
        this.descripe_background_color +
        ";" +
        "font-size:" +
        this.descripe_font_size +
        "px;" +
        "color:" +
        this.descripe_color +
        ";";

      return descripe_form_s;
    },
    price_form() {
      let price_form_s =
        "background-color:" +
        this.price_background_color +
        ";" +
        "font-size:" +
        this.price_size +
        "px;" +
        "color:" +
        this.price_color +
        ";" +
        "float:" +
        this.price_position +
        ";";

      //  console.log(price_form_s);
      return price_form_s;
    },
    label_form() {
      let label_form_s =
        "background-color:" +
        this.label_background_color +
        ";" +
        "font-size:" +
        this.label_font_size +
        "px;" +
        "color:" +
        this.label_color +
        ";";

      return label_form_s;
    },
    course_form() {
      return this.$store.state.course_form;
    },
    detail_form() {
      let detail_form_s =
        "padding-bottom: 2%;border-bottom: 1px solid rgb(240, 221, 221);";
      return detail_form_s;
    },
    small_form() {
      let small_form_s = "width:50%;float:left;height:300px;";
      return small_form_s;
    },
    small_top() {
      let small_top_s =
        "width: 100%; float:left;height:200px; box-shadow: 0px 3px 5px #fae3e3;";
      return small_top_s;
    },
    small_bottom() {
      let small_bottom_s = "width: 100%; height:100px;";
      return small_bottom_s;
    },
    big_form() {
      let big_form_s = "width:100%;";
      return big_form_s;
    },
    big_top() {
      let big_top_s = "width: 100%; float:left;height:250px;";
      return big_top_s;
    },
    row_form() {
      let row_form_s =
        "float:left;" +
        "width:50%;" +
        " box-shadow: 0px 3px 5px #fae3e3;" +
        "height:300px;";
      return row_form_s;
    },
    row_top() {
      let row_top_s = "width: 200px;height:200px; float:left; ";
      return row_top_s;
    },
    row() {
      let row_s =
        "overflow-y:hidden; overflow-x:scroll;display:flex;white-space:nowrap;";
      return row_s;
    },
  },
  props: [
    "index",
    "goods",
    "title_background_color",
    "title_color",
    "title_font_size",
    "descripe_background_color",
    "descripe_color",
    "descripe_font_size",
    "label_background_color",
    "label_color",
    "label_font_size",
    "price_background_color",
    "price_position",
    "price_color",
    "price_size",
    "course_img_width",
    "course_img_height",
    "course_img_border_radius",
  ],

  created() {
    console.log("成功创建一个课程列表");
  },
  methods: {
    click_com_change() {
      this.attr.title_background_color = this.title_background_color;
      this.attr.title_color = this.title_color;
      this.attr.title_font_size = this.title_font_size;
      this.attr.descripe_background_color = this.descripe_background_color;
      this.attr.descripe_color = this.descripe_color;
      this.attr.descripe_font_size = this.descripe_font_size;
      this.attr.label_background_color = this.label_background_color;
      this.attr.label_color = this.label_color;
      this.attr.label_font_size = this.label_font_size;
      this.attr.price_background_color = this.price_background_color;
      this.attr.price_color = this.price_color;
      this.attr.price_position = this.price_position;
      this.attr.price_size = this.price_size;
      this.attr.course_img_width = this.course_img_width;
      this.attr.course_img_height = this.course_img_height;
      this.attr.course_img_border_radius = this.course_img_border_radius;

      this.$store.commit("CURCOMTYPE", "courselist");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      // console.log(e.target.parentNode)
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
  },
};
</script> 


<style scoped>
.total {
  position: relative;
  width: 100%;
  overflow:auto;
  zoom:1;
}
.left {
  float: left;
  box-shadow: 0px 10px 30px #fae3e3;
  margin-right: 10px;
}
.signal_course {
  padding-bottom: 2%;
  border-bottom: 1px solid rgb(240, 221, 221);
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
.row {
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  white-space: nowrap;
}
</style>