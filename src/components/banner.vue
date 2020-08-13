<template>
  <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
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
        'px;'
        "
      
  >
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
        banner_seconds:"3000"
      },
      curindex: 0,
      timer: null,
      kuan: 500,
      maxlen: 4,
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
  },
  props: [
    "index",
    "imgsrc",
    "border_radius",
    "width",
    "height",
    "banner_seconds"
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
      console.log(this.curindex);
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
      // this.attr.title = this.title;
      // this.attr.background_color = this.background_color;
      // this.attr.border_color = this.border_color;
      // this.attr.text_color = this.text_color;
      // this.attr.text_size = this.text_size;
      this.attr.width = this.width;
      this.attr.height = this.height;
      // this.attr.line_height = this.line_height;
      this.attr.border_radius = this.border_radius;
      this.attr.banner_seconds = this.banner_seconds;
      // this.attr.padding_top = this.padding_top;
      // this.attr.padding_left = this.padding_left;

      this.$store.commit("CURCOMTYPE", "banner");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
      this.$store.commit(
        "CURRENTELEM",
        e.target.parentNode.parentNode.parentNode.parentNode
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
  width: 500px;
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
</style>