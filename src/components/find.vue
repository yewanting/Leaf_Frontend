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
    :style="big_div_form"
  >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
    <div class="find_div" :style="find_div_form">
      <input type="text" :placeholder="text" class="input_find" :style=" input_form" />
      <i class="iconfont icon-sousuo" :style="find_icon_form"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attr: {
        text: "请输入搜索内容",
        border_color: "#b8b5b5",
        text_color: "#000000",
        text_size: "15",
        big_height: "50",
        width: "70",
        height: "30",
        border_radius: "50",
        find_icon_size: "20",
        margin_top: "0",
      },
      is_show: false,
      lastenter: null,
    };
  },
  computed: {
    big_div_form() {
      let big_div_form_s = "height:" + this.big_height + "px;"+'margin-top:'+this.margin_top+'px;';
      return big_div_form_s;
    },
    find_div_form() {
      let find_div_form_s =
        "width:" +
        this.width +
        "%;" +
        "height:" +
        this.height +
        "px;" +
        "border-radius:" +
        this.border_radius +
        "px;" +
        "border-color:" +
        this.border_color;

      return find_div_form_s;
    },
    input_form() {
      let input_form_s =
        "color:" +
        this.text_color +
        ";" +
        "font-size:" +
        this.text_size +
        "px;";

      return input_form_s;
    },

    find_icon_form() {
      let find_icon_form_s = "font-size:" + this.find_icon_size + "px;";
      return find_icon_form_s;
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
    "text",
    "border_color",
    "text_color",
    "text_size",
    "big_height",
    "width",
    "height",
    "border_radius",
    "find_icon_size",
    "margin_top",
  ],

  created() {
    console.log("成功创建一个搜索框");
  },
  methods: {
    click_com_change() {
      this.attr.text = this.text;
      this.attr.border_color = this.border_color;
      this.attr.text_color = this.text_color;
      this.attr.text_size = this.text_size;
      this.attr.big_height = this.big_height;
      this.attr.width = this.width;
      this.attr.height = this.height;
      this.attr.border_radius = this.border_radius;
      this.attr.find_icon_size = this.find_icon_size;
      this.attr.margin_top = this.margin_top;

      this.$store.commit("CURCOMTYPE", "find");
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
.total {
  margin: 0;
  position: relative;
  width: 100%;
}
.find_div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid rgb(168, 161, 161);
}
.input_find {
  border: none;
  outline: none;
  margin-left: 10px;
  margin-top: 5px;
  width: 60%;
}
.icon-sousuo {
  margin: 5px;
  float: right;
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