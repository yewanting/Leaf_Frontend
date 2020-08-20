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
    :style="'height:' +
        height +
        'px;' +
        'width:' +
        width +
        'px;' +
        'border-radius:'+
        border_radius+
        'px;'+
        'margin-top:'+
        margin_top+'px;'
        "
      
  >
   <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
    <ul id="banner">
      <li
        v-for="(imgpath,index) in imgsrc"
        :key="index"
        :style="'height:' +
        height +
        'px;' +
        'width:' +
        width +
        'px;'+
        'border-radius:'+
        border_radius+
        'px;'
        "
      >
        <img :src="imgsrc[index]" />
      </li>
    </ul>
    <img src="../../static/images/nexImg.png" class="next" />
    <img src="../../static/images/preImg.png" class="pre" @click="get_pre" />
  </div>
</template>



<script>
export default {
  data() {
    return {
      attr: {
        border_color: "#ffffff",
        width: "100",
        height: "30",
        banner_seconds:"3000",
        margin_top:"0",
      },
      curindex: 0,
      timer: null,
      kuan: 500,
      maxlen: 4,
      is_show:false
    };
  },
  computed: {
    stylevalue() {
      let s =
        "height:" +
        this.height +
        "px;" +
        "width:" +
        this.width +
        "px;" +
        "background-color:" +
        this.background_color +
        ";" +
        "border-color:" +
        this.border_color +
        ";" +
        "color:" +
        this.text_color +
        ";" +
        "font-size:" +
        this.text_size +
        "px;" +
        "width:" +
        this.width +
        "px;" +
        "height:" +
        this.height +
        "px;" +
        "line-height:" +
        this.line_height +
        "px;" +
        "border-radius:" +
        this.border_radius +
        "px;" +
        "padding-top:" +
        this.padding_top +
        "px;" +
        "padding-left:" +
        this.padding_left +
        "px;";
      return s;
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
    "imgsrc",
    "border_radius",
    "width",
    "height",
    "banner_seconds",
    "margin_top",
  ],

  created() {
    console.log("成功创建一个轮播图");
    setInterval(this.change_auto, this.banner_seconds);
  },
  methods: {
    change_auto() {
      if (this.curindex < this.maxlen) {
        this.curindex++;
        this.get_next();
      } else {
        this.curindex = 0;
        this.get_reset();
      }
    },
    get_next() {
      var totalbanner = document.getElementById("banner");
      totalbanner.style.marginLeft = "-" + this.kuan * this.curindex + "px";
      totalbanner.style.transition = 0.3 + "s";
    },
    get_reset() {
      var totalbanner = document.getElementById("banner");
      totalbanner.style.marginLeft = "0px";
      totalbanner.style.transition = "0s";
    },
    get_pre() {
      clearInterval(this.timer);
      // console.log(this.curindex);
      if (this.curindex == 0) {
        this.curindex = this.maxlen - 1;
        var totalbanner = document.getElementById("banner");
        totalbanner.style.marginRight = "0px";
        totalbanner.style.transition = "0s";
      } else {
        this.curindex--;
        var totalbanner = document.getElementById("banner");
        totalbanner.style.marginLeft = "-" + this.kuan * this.curindex + "px";
        totalbanner.style.transition = 0.3 + "s";
      }
      this.timer = setInterval(this.change_auto,this.banner_seconds);
    },
    click_com_change() {

      this.attr.width = this.width;
      this.attr.height = this.height;
      this.attr.border_radius = this.border_radius;
      this.attr.banner_seconds = this.banner_seconds;


      this.$store.commit("CURCOMTYPE", "banner");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;

      this.$store.commit(
        "CURRENTELEM",
        e.target.parentNode.parentNode.parentNode.parentNode
      );
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
* {
  margin: 0;
  padding: 0;
}
.total {
  position: relative;
  height: 250px;
  width: 100%;
  overflow: hidden;
}
#banner {
  position: absolute;
  height: 250px;
  width: 3275px; /*655×4 = 3275*/
}
li {
  float: left;
  width: 500px;
  height: 250px;
  list-style: none;
}
img {
  width: 100%;
  height: 100%;
}
.next {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
}
.pre {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
}
.next:hover,
.pre:hover {
  cursor: pointer;
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