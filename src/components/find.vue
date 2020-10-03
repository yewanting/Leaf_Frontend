<template>
  <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    @mouseenter="show_border"
    @mouseleave="unshow_border"
    :draggable="true"
    class="find_total"
    :style="form_value"
    :id="id"
  >
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
    <div class="find_div" :style="find_div_form">
      <div
        class="left_top_circle"
        id="left_top_circle"
        v-if="(is_show==true)"
        @mouseenter="show_Mouse_left_top($event.currentTarget,id)"
        @mouseleave="unshow_Mouse_left_top($event.currentTarget)"
      ></div>
      <div
        class="left_bottom_circle"
        id="left_bottom_circle"
        v-if="(is_show==true)"
        @mouseenter="show_Mouse_left_bottom($event.currentTarget,id)"
        @mouseleave="unshow_Mouse_left_bottom($event.currentTarget)"
      ></div>
      <div
        class="right_top_circle"
        id="right_top_circle"
        v-if="(is_show==true)"
        @mouseenter="show_Mouse_right_top($event.currentTarget,id)"
        @mouseleave="unshow_Mouse_right_top($event.currentTarget)"
      ></div>
      <div
        class="right_bottom_circle"
        id="right_bottom_circle"
        v-if="(is_show==true)"
        @mouseenter="show_Mouse_right_bottom($event.currentTarget)"
        @mouseleave="unshow_Mouse_right_bottom($event.currentTarget)"
      ></div>
      <input type="text" :placeholder="text" class="input_find" :style=" input_form" />
      <i class="iconfont icon-sousuo" :style="find_icon_form"></i>
    </div>
  </div>
</template>
<script>
import Drag from '../common/Drag.js'
export default {
  data() {
    return {
      attr: {
        left: "0",
        top: "0",
        text: "请输入搜索内容",
        border_color: "#b8b5b5",
        text_color: "#000000",
        text_size: "15",
        big_height: "50",
        big_width: "300",
        border_radius: "50",
        find_icon_size: "20",
        margin_top: "0",
      },
      is_show: false,
      lastenter: null,
      cur_width:this.big_width,
      cur_height:this.big_height,
    };
  },
  computed: {
    form_value() {
      let big_div_form_s =
        "height:" +
        this.big_height +
        "px;" +
        "width:" +
        this.big_width +
        "px;" +
        "margin-top:" +
        this.margin_top +
        "px;" +
        "left:" +
        this.left +
        "px;" +
        "top:" +
        this.top +
        "px;";
      return big_div_form_s;
    },
    find_div_form() {
      let find_div_form_s =
        "width:100%;" +
        "height:80%;" +
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
        "px;"+
        "width:70%;height:60%";
        

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
    "id",
    "index",
    "left",
    "top",
    "text",
    "border_color",
    "text_color",
    "text_size",
    "big_height",
    "big_width",
    "width",
    "height",
    "border_radius",
    "find_icon_size",
    "margin_top",
  ],

  created() {
    console.log("成功创建一个搜索框");
  },
  mounted() {
    let _this = this;
    let find = document.getElementById(this.id);
    let oDrag = new Drag(_this,find, { handle: find });
  },
  methods: {
    click_com_change() {
      this.attr.left = this.left;
      this.attr.top = this.top;
      this.attr.text = this.text;
      this.attr.border_color = this.border_color;
      this.attr.text_color = this.text_color;
      this.attr.text_size = this.text_size;
      this.attr.big_height = this.cur_height;
      this.attr.big_width = this.cur_width;
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
      this.$el.style.width = this.$el.offsetWidth;
      this.$el.style.height = this.$el.offsetHeight;
      this.is_show = true;
    },
    unshow_border() {
      this.$el.style.border = "none";
      this.is_show = false;
    },
    remove_component() {
      this.$store.commit("IFSHOWYESNO", 1);
      this.$store.commit("DELETECOMPONENT", this.$el);
    },
    show_Mouse_left_top(event, id) {
      var _this = this;
      event.style.cursor = "nw-resize";
      function Move_left_top() {
        this.initialize.apply(this, arguments);
      }
      Move_left_top.prototype = {
        initialize: function (move, options) {
          this.move = this.$(move);
          this._width = this._height = 0;
          this.nowX = this.nowY = 0;
          // this.old_left = this.move.parentNode.style.left;
          this._moveDrag = this.bind(this, this.moveDrag);
          this._stopDrag = this.bind(this, this.stopDrag);

          this.setOptions(options);

          this.handle = this.$(this.options.handle);
          this.maxContainer = this.$(this.options.maxContainer);

          this.maxTop =
            Math.max(
              this.maxContainer.clientHeight,
              this.maxContainer.scrollHeight
            ) - this.move.parentNode.offsetHeight;
          this.maxLeft =
            Math.max(
              this.maxContainer.clientWidth,
              this.maxContainer.scrollWidth
            ) - this.move.parentNode.offsetWidth;

          this.addHandler(
            this.handle,
            "mousedown",
            this.bind(this, this.startDrag)
          );
        },
        startDrag: function (event) {
          var event = event || window.event;
          event.stopPropagation();
          event.cancelBubble = true;
          this._width = this.move.parentNode.offsetWidth;
          this._height = this.move.parentNode.offsetHeight;
          this.nowX = event.clientX;
          this.nowY = event.clientY;
          this.addHandler(document, "mousemove", this._moveDrag);
          this.addHandler(document, "mouseup", this._stopDrag);

          event.preventDefault && event.preventDefault();
          this.handle.setCapture && this.handle.setCapture();
        },
        moveDrag: function (event) {
          var event = event || window.event;
          let cur = document.getElementById(id);
          let a = this._width + this.nowX - event.clientX;
          let b = this._height + this.nowY - event.clientY;
          if (a > this.maxContainer.clientWidth) {
            a = this.maxContainer.clientWidth;
          }
          if (b > this.maxContainer.clientHeight) {
            b = this.maxContainer.clientHeight;
          }
          if (this.move.parentNode != null) {
            cur.style.left = event.clientX-28 + "px";
            cur.style.top = event.clientY-33 + "px";
            this.move.parentNode.style.width = a + "px";
            this.move.parentNode.style.height = b + "px";
            _this.cur_width = a;
            _this.cur_height = b;
            _this.click_com_change();
          }
        },
        stopDrag: function () {
          this.removeHandler(document, "mousemove", this._moveDrag);
          this.removeHandler(document, "mouseup", this._stopDrag);

          this.handle.releaseCapture && this.handle.releaseCapture();
        },
        setOptions: function (options) {
          this.options = {
            handle: this.move, //事件对象
            maxContainer: document.documentElement || document.body, //指定限制容器
          };

          for (let p in options) this.options[p] = options[p];
        },
        // 获取id
        $: function (id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        },

        // 添加绑定事件
        addHandler: function (oElement, sEventType, fnHandler) {
          return oElement.addEventListener
            ? oElement.addEventListener(sEventType, fnHandler, false)
            : oElement.attachEvent("on" + sEventType, fnHandler);
        },

        // 删除绑定事件
        removeHandler: function (oElement, sEventType, fnHandler) {
          return oElement.removeEventListener
            ? oElement.removeEventListener(sEventType, fnHandler, false)
            : oElement.detachEvent("on" + sEventType.fnHandler);
        },

        // 绑定事件到对象
        bind: function (object, fnHandler) {
          return function () {
            return fnHandler.apply(object, arguments);
          };
        },
      };

      let left_top_circle = document.getElementById("left_top_circle");
      let oMove_left_top_circle = new Move_left_top(left_top_circle, {
        handle: left_top_circle,
      });

    },
    unshow_Mouse_left_top(event) {
      event.style.cursor = "move";
    },
    show_Mouse_left_bottom(event, id) {
      var _this = this;
      event.style.cursor = "sw-resize";
      function Move_left_bottom() {
        this.initialize.apply(this, arguments);
      }
      Move_left_bottom.prototype = {
        initialize: function (move, options) {
          this.move = this.$(move);
          this._width = this._height = 0;
          this.nowX = this.nowY = 0;
          this._moveDrag = this.bind(this, this.moveDrag);
          this._stopDrag = this.bind(this, this.stopDrag);

          this.setOptions(options);

          this.handle = this.$(this.options.handle);
          this.maxContainer = this.$(this.options.maxContainer);

          this.maxTop =
            Math.max(
              this.maxContainer.clientHeight,
              this.maxContainer.scrollHeight
            ) - this.move.parentNode.offsetHeight;
          this.maxLeft =
            Math.max(
              this.maxContainer.clientWidth,
              this.maxContainer.scrollWidth
            ) - this.move.parentNode.offsetWidth;

          this.addHandler(
            this.handle,
            "mousedown",
            this.bind(this, this.startDrag)
          );
        },
        startDrag: function (event) {
          var event = event || window.event;
          event.stopPropagation();
          event.cancelBubble = true;
          this._width = this.move.parentNode.offsetWidth;
          this._height = this.move.parentNode.offsetHeight;
          this.nowX = event.clientX;
          this.nowY = event.clientY;
          this.addHandler(document, "mousemove", this._moveDrag);
          this.addHandler(document, "mouseup", this._stopDrag);

          event.preventDefault && event.preventDefault();
          this.handle.setCapture && this.handle.setCapture();
        },
        moveDrag: function (event) {
          var event = event || window.event;
          let cur = document.getElementById(id);
          let a = this._width + this.nowX - event.clientX;
          let b = this._height + event.clientY - this.nowY;
          if (a > this.maxContainer.clientWidth) {
            a = this.maxContainer.clientWidth;
          }
          if (b > this.maxContainer.clientHeight) {
            b = this.maxContainer.clientHeight;
          }
          if (this.move.parentNode != null) {
            cur.style.left = event.clientX-28 + "px";
            this.move.parentNode.style.width = a + "px";
            this.move.parentNode.style.height = b + "px";

            _this.cur_width = a;
            _this.cur_height = b;
            _this.click_com_change();
          }
        },
        stopDrag: function () {
          this.removeHandler(document, "mousemove", this._moveDrag);
          this.removeHandler(document, "mouseup", this._stopDrag);

          this.handle.releaseCapture && this.handle.releaseCapture();
        },
        setOptions: function (options) {
          this.options = {
            handle: this.move, //事件对象
            maxContainer: document.documentElement || document.body, //指定限制容器
          };

          for (let p in options) this.options[p] = options[p];
        },
        // 获取id
        $: function (id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        },

        // 添加绑定事件
        addHandler: function (oElement, sEventType, fnHandler) {
          return oElement.addEventListener
            ? oElement.addEventListener(sEventType, fnHandler, false)
            : oElement.attachEvent("on" + sEventType, fnHandler);
        },

        // 删除绑定事件
        removeHandler: function (oElement, sEventType, fnHandler) {
          return oElement.removeEventListener
            ? oElement.removeEventListener(sEventType, fnHandler, false)
            : oElement.detachEvent("on" + sEventType.fnHandler);
        },

        // 绑定事件到对象
        bind: function (object, fnHandler) {
          return function () {
            return fnHandler.apply(object, arguments);
          };
        },
      };

      let left_bottom_circle = document.getElementById("left_bottom_circle");
      let oMove_left_bottom_circle = new Move_left_bottom(left_bottom_circle, {
        handle: left_bottom_circle,
      });
    },
    unshow_Mouse_left_bottom(event) {
      event.style.cursor = "move";
    },
    show_Mouse_right_top(event, id) {
      var _this = this;
      event.style.cursor = "ne-resize";
      function Move_right_top() {
        this.initialize.apply(this, arguments);
      }
      Move_right_top.prototype = {
        initialize: function (move, options) {
          this.move = this.$(move);
          this._width = this._height = 0;
          this.nowX = this.nowY = 0;
          this._moveDrag = this.bind(this, this.moveDrag);
          this._stopDrag = this.bind(this, this.stopDrag);

          this.setOptions(options);

          this.handle = this.$(this.options.handle);
          this.maxContainer = this.$(this.options.maxContainer);

          this.maxTop =
            Math.max(
              this.maxContainer.clientHeight,
              this.maxContainer.scrollHeight
            ) - this.move.parentNode.offsetHeight;
          this.maxLeft =
            Math.max(
              this.maxContainer.clientWidth,
              this.maxContainer.scrollWidth
            ) - this.move.parentNode.offsetWidth;

          this.addHandler(
            this.handle,
            "mousedown",
            this.bind(this, this.startDrag)
          );
        },
        startDrag: function (event) {
          var event = event || window.event;
          event.stopPropagation();
          event.cancelBubble = true;
          this._width = this.move.parentNode.offsetWidth;
          this._height = this.move.parentNode.offsetHeight;
          this.nowX = event.clientX;
          this.nowY = event.clientY;
          this.addHandler(document, "mousemove", this._moveDrag);
          this.addHandler(document, "mouseup", this._stopDrag);

          event.preventDefault && event.preventDefault();
          this.handle.setCapture && this.handle.setCapture();
        },
        moveDrag: function (event) {
          var event = event || window.event;
          let cur = document.getElementById(id);
          let a = this._width + event.clientX - this.nowX;
          let b = this._height + this.nowY - event.clientY;
          if (a > this.maxContainer.clientWidth) {
            a = this.maxContainer.clientWidth;
          }
          if (b > this.maxContainer.clientHeight) {
            b = this.maxContainer.clientHeight;
          }
          if (this.move.parentNode != null) {
            cur.style.top = event.clientY-33 + "px";
            this.move.parentNode.style.width = a + "px";
            this.move.parentNode.style.height = b + "px";
            _this.cur_width = a;
            _this.cur_height = b;
            _this.click_com_change();
          }
        },
        stopDrag: function () {
          this.removeHandler(document, "mousemove", this._moveDrag);
          this.removeHandler(document, "mouseup", this._stopDrag);

          this.handle.releaseCapture && this.handle.releaseCapture();
        },
        setOptions: function (options) {
          this.options = {
            handle: this.move, //事件对象
            maxContainer: document.documentElement || document.body, //指定限制容器
          };

          for (let p in options) this.options[p] = options[p];
        },
        // 获取id
        $: function (id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        },

        // 添加绑定事件
        addHandler: function (oElement, sEventType, fnHandler) {
          return oElement.addEventListener
            ? oElement.addEventListener(sEventType, fnHandler, false)
            : oElement.attachEvent("on" + sEventType, fnHandler);
        },

        // 删除绑定事件
        removeHandler: function (oElement, sEventType, fnHandler) {
          return oElement.removeEventListener
            ? oElement.removeEventListener(sEventType, fnHandler, false)
            : oElement.detachEvent("on" + sEventType.fnHandler);
        },

        // 绑定事件到对象
        bind: function (object, fnHandler) {
          return function () {
            return fnHandler.apply(object, arguments);
          };
        },
      };

      let right_top_circle = document.getElementById("right_top_circle");
      let oMove_right_top_circle = new Move_right_top(right_top_circle, {
        handle: right_top_circle,
      });
    },
    unshow_Mouse_right_top(event) {
      event.style.cursor = "move";
    },
    show_Mouse_right_bottom(event) {
      var _this = this;
      event.style.cursor = "se-resize";
      function Move_right_bottom() {
        this.initialize.apply(this, arguments);
      }
      Move_right_bottom.prototype = {
        initialize: function (move, options) {
          this.move = this.$(move);
          this._width = this._height = 0;
          this.nowX = this.nowY = 0;
          this._moveDrag = this.bind(this, this.moveDrag);
          this._stopDrag = this.bind(this, this.stopDrag);

          this.setOptions(options);

          this.handle = this.$(this.options.handle);
          this.maxContainer = this.$(this.options.maxContainer);


          this.addHandler(
            this.handle,
            "mousedown",
            this.bind(this, this.startDrag)
          );
        },
        startDrag: function (event) {
          var event = event || window.event;
          event.stopPropagation();
          event.cancelBubble = true;
          this._width = this.move.parentNode.offsetWidth;
          this._height = this.move.parentNode.offsetHeight;
          this.nowX = event.clientX;
          this.nowY = event.clientY;
          this.addHandler(document, "mousemove", this._moveDrag);
          this.addHandler(document, "mouseup", this._stopDrag);

          event.preventDefault && event.preventDefault();
          this.handle.setCapture && this.handle.setCapture();
        },
        moveDrag: function (event) {
          var event = event || window.event;
          let a = this._width + event.clientX - this.nowX;
          let b = this._height + event.clientY - this.nowY;

          if (a > window.clientWidth) {
            a = window.clientWidth;
          }
          if (b > window.clientHeight) {
            b = window.clientHeight;
          }
          if (this.move.parentNode != null) {
            this.move.parentNode.style.width = a + "px";
            this.move.parentNode.style.height = b + "px";
            _this.cur_width = a;
            _this.cur_height = b;
            _this.click_com_change();
          }
        },
        stopDrag: function () {
          this.removeHandler(document, "mousemove", this._moveDrag);
          this.removeHandler(document, "mouseup", this._stopDrag);

          this.handle.releaseCapture && this.handle.releaseCapture();
        },
        setOptions: function (options) {
          this.options = {
            handle: this.move, //事件对象
            maxContainer: document.documentElement || document.body, //指定限制容器
          };

          for (let p in options) this.options[p] = options[p];
        },
        // 获取id
        $: function (id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        },

        // 添加绑定事件
        addHandler: function (oElement, sEventType, fnHandler) {
          return oElement.addEventListener
            ? oElement.addEventListener(sEventType, fnHandler, false)
            : oElement.attachEvent("on" + sEventType, fnHandler);
        },

        // 删除绑定事件
        removeHandler: function (oElement, sEventType, fnHandler) {
          return oElement.removeEventListener
            ? oElement.removeEventListener(sEventType, fnHandler, false)
            : oElement.detachEvent("on" + sEventType.fnHandler);
        },

        // 绑定事件到对象
        bind: function (object, fnHandler) {
          return function () {
            return fnHandler.apply(object, arguments);
          };
        },
      };

      let right_bottom_circle = document.getElementById("right_bottom_circle");
      let oMove_right_bottom_circle = new Move_right_bottom(
        right_bottom_circle,
        {
          handle: right_bottom_circle,
        }
      );
    },
    unshow_Mouse_right_bottom(event) {
      event.style.cursor = "move";
    },
  },
};
</script> 


<style scoped>
</style>