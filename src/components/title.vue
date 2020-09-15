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
    class="title_total"
    :style="form_value"
    :id="id"
  >
    <div :style="stylevalue" id = "inner">
      <!-- <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i> -->
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
      <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
      <span :style="content_form">{{content}}</span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      attr: {
        left: 0,
        top: 0,
        content: "标题文本",
        background_color: "#ffffff",
        color: "#000000",
        font_size: "18",
        position: "center",
        margin_top: "0",
        width: "300",
        height: "30",
      },
      is_show: false,
    };
  },
  props: [
    "id",
    "index",
    "left",
    "top",
    "content",
    "background_color",
    "color",
    "font_size",
    "position",
    "margin_top",
    "width",
    "height",
  ],
  mounted(){
   let _this = this;
    // 让物体移动
    function Drag() {
      this.initialize.apply(this, arguments);
    }
    Drag.prototype = {
      initialize: function (drag, options) {
        this.drag = this.$(drag);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);
        this._width = this._height = 0;
        this.setOptions(options);

        this.handle = this.$(this.options.handle);
        this.maxContainer = this.$(this.options.maxContainer);

        this.maxTop =
          Math.max(
            this.maxContainer.clientHeight,
            this.maxContainer.scrollHeight
          ) - this.drag.offsetHeight;
        this.maxLeft =
          Math.max(
            this.maxContainer.clientWidth,
            this.maxContainer.scrollWidth
          ) - this.drag.offsetWidth;

        this.limit = this.options.limit;
        this.lockX = this.options.lockX;
        this.lockY = this.options.lockY;
        this.lock = this.options.lock;

        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;

        this.handle.style.cursor = "move";

        this.changeLayout();

        this.addHandler(
          this.handle,
          "mousedown",
          this.bind(this, this.startDrag)
        );
      },
      changeLayout: function () {
        this.drag.style.top = this.drag.offsetTop + "px";
        this.drag.style.left = this.drag.offsetLeft + "px";
        this.drag.style.position = "absolute";
        this.drag.style.margin = "0";
      },
      startDrag: function (event) {
        var event = event || window.event;
        this._width = this.drag.offsetWidth;
        this._height = this.drag.offsetHeight;
        this._x = event.clientX - this.drag.offsetLeft;
        this._y = event.clientY - this.drag.offsetTop;

        this.addHandler(document, "mousemove", this._moveDrag);
        this.addHandler(document, "mouseup", this._stopDrag);

        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();

        this.onStart();
        _this.$emit("unshow_coordinate")
      },
      moveDrag: function (event) {
        var event = event || window.event;
        let coordinate_left = this.drag.offsetLeft;
        let coordinate_right = this.drag.offsetLeft+this.drag.offsetWidth;
        let coordinate_top = this.drag.offsetTop;
        let coordinate_bottom = this.drag.offsetTop+this.drag.offsetHeight;
        let coordinate = {
          "left":coordinate_left,
          "right":coordinate_right,
          "top":coordinate_top,
          "bottom":coordinate_bottom
        }
        _this.$emit("coordinate",_this.id,coordinate)
        var iTop = event.clientY - this._y;
        var iLeft = event.clientX - this._x;

        if (this.lock) return;
        
        this.limit &&
          (iTop < 0 && (iTop = 0),
          iLeft < 0 && (iLeft = 0),
          iTop > this.maxTop && (iTop = this.maxTop),
          iLeft > this.maxLeft && (iLeft = this.maxLeft));

        this.lockY || (this.drag.style.top = iTop + "px");
        this.lockX || (this.drag.style.left = iLeft + "px");

        event.preventDefault && event.preventDefault();

        this.onMove();
      },
      stopDrag: function () {
        this.removeHandler(document, "mousemove", this._moveDrag);
        this.removeHandler(document, "mouseup", this._stopDrag);

        this.handle.releaseCapture && this.handle.releaseCapture();
        
        
        let coordinate_left = this.drag.offsetLeft;
        let coordinate_right = this.drag.offsetLeft+this.drag.offsetWidth;
        let coordinate_top = this.drag.offsetTop;
        let coordinate_bottom = this.drag.offsetTop+this.drag.offsetHeight;
        let coordinate = {
          "left":coordinate_left,
          "right":coordinate_right,
          "top":coordinate_top,
          "bottom":coordinate_bottom
        }
        // _this.$emit("attach",_this.id,coordinate)
        _this.$emit("unshow_coordinate")
        this.onStop();
      },
      //参数设置
      setOptions: function (options) {
        this.options = {
          handle: this.drag, //事件对象
          limit: true, //锁定范围
          lock: false, //锁定位置
          lockX: false, //锁定水平位置
          lockY: false, //锁定垂直位置
          maxContainer: document.documentElement || document.body, //指定限制容器
          onStart: function () {}, //开始时回调函数
          onMove: function () {}, //拖拽时回调函数
          onStop: function () {}, //停止时回调函数
        };
        for (var p in options) this.options[p] = options[p];
      },
      //获取id
      $: function (id) {
        return typeof id === "string" ? document.getElementById(id) : id;
      },
      //添加绑定事件
      addHandler: function (oElement, sEventType, fnHandler) {
        return oElement.addEventListener
          ? oElement.addEventListener(sEventType, fnHandler, false)
          : oElement.attachEvent("on" + sEventType, fnHandler);
      },
      //删除绑定事件
      removeHandler: function (oElement, sEventType, fnHandler) {
        return oElement.removeEventListener
          ? oElement.removeEventListener(sEventType, fnHandler, false)
          : oElement.detachEvent("on" + sEventType, fnHandler);
      },
      //绑定事件到对象
      bind: function (object, fnHandler) {
        return function () {
          return fnHandler.apply(object, arguments);
        };
      },
    };
    let title = document.getElementById(this.id);
    let oDrag = new Drag(title, { handle: title });
  },
  computed: {
    form_value() {
      let form_value_s =
        "left:" +
        this.left +
        "px;" +
        "top:" +
        this.top +
        "px;" +
        "margin-top:" +
        this.margin_top +
        "px;" 
      return form_value_s;
    },
    stylevalue(){
      let stylevalue_s = 
        "width:" +
        this.width +
        "px;" +
        "height:" +
        this.height +
        "px;" +
        "text-align:" +
        this.position +
        ";";

      return stylevalue_s;
    },
    content_form() {
      let content_form_s =
        "background-color:" +
        this.background_color +
        ";" +
        "color:" +
        this.color +
        ";" +
        "font-size:" +
        this.font_size +
        "px;";

      return content_form_s;
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
  methods: {
    click_com_change() {
      this.attr.content = this.content;
      this.attr.background_color = this.background_color;
      this.attr.color = this.color;
      this.attr.font_size = this.font_size;
      this.attr.position = this.position;
      this.attr.width = this.width;
      this.attr.height = this.height;

      this.$store.commit("CURCOMTYPE", "title");
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
            cur.style.left = event.clientX - 28 + "px";
            cur.style.top = event.clientY - 33 + "px";
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
            cur.style.left = event.clientX - 28 + "px";
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
            cur.style.top = event.clientY - 33 + "px";
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