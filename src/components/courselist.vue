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
    class="course_total"
    :style="(course_form=='横向滑动')?row:'margin-top:'+this.margin_top+'px;'"
  >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
 


    <div
      :style="detail_form"
      v-for="(goods_item,index) in goods"
      :key="index"
      v-show="course_form=='详细列表'"
    >
      <div class="course_left">
        <img :src="goods_item.course_img" :style="img_form" class="course_img"/>
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
          class="course_img"
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
         class="course_img"
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
        <img :src="goods_item.course_img"
        class="course_img" />
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
        margin_top:"0",
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
        "overflow-y:hidden; overflow-x:scroll;display:flex;white-space:nowrap;margin-top:"+this.margin_top+'px;';
      return row_s;
    },
     cur_move_id() {
      return this.$store.state.cur_move_id;
    },
    curComList() {
      return this.$store.state.cur_com_list;
    },
    curComAttr() {
      return this.$store.state.cur_com_attr;
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
    "margin_top",
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
      this.$store.commit("CURMOVEID", this.index);
    },
    onDragOver(event) {
      var event = event || window.event;
      event.preventDefault();
    },
        onDragEnter(event) {
      var event = event || window.event;
      this.lastenter = event.target;
      if (this.index != this.cur_move_id) {
        // console.log("进入的区域",this.lastenter);
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 30;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 30;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
    },
    onDragLeave(event) {
      var event = event || window.event;
      if (this.index != this.cur_move_id && this.lastenter == event.target) {
        // console.log("离开的区域",event.target)
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 0;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 0;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
    },
    onDrop(event) {
      var e = event || window.event;

      var curNode = this.$store.state.currentElem;
      var targetNode = this.$el.parentNode;
      var parentnode = curNode.parentNode;

      let tmp = parentnode.insertBefore(curNode, targetNode);
      if (typeof tmp == "object") {
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 0;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 0;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
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

</style>