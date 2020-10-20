<template>
<!-- <div> -->
  <div
    @mouseenter="show_Mouse_bottom($event.currentTarget)"
    @mouseleave="unshow_Mouse_bottom($event.currentTarget)"  
  >
   <!-- <hr size=1 id="dottedline"> -->
  </div>
 
<!-- </div>  -->
</template>



<script>
export default {
  computed:{
    main_view_form(){
      return this.$store.state.main_view;
    }
  },
  mounted(){
        // let dottedtop = parseInt(this.main_view_form.main_view_height);
        // document.querySelector("#dottedline").style.top= dottedtop+"px";
 },
  methods: {
    show_Mouse_bottom(event) {
      var _this = this;
      event.style.cursor = "s-resize";
      function Move_bottom() {
        this.initialize.apply(this, arguments);
      }
      Move_bottom.prototype = {
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
          this._height = this.move.offsetHeight;
          this.nowY = event.clientY;
          this.addHandler(document, "mousemove", this._moveDrag);
          this.addHandler(document, "mouseup", this._stopDrag);

          event.preventDefault && event.preventDefault();
          this.handle.setCapture && this.handle.setCapture();
        },

        moveDrag: function (event) {
          var event = event || window.event;
          let b = this._height + event.clientY - this.nowY;

          this.move.style.height = b + "px";
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
      // console.log(_this.$el);
      
      let main_view_bottom = _this.$el;
      let oMove_main_view_bottom = new Move_bottom(main_view_bottom, {
        handle: main_view_bottom,
      });
    },
    unshow_Mouse_bottom(event) {
      event.style.cursor = "none";
    },
  },
};
</script>


<style scoped>
/* #dottedline{
    color: blue;
    border-style:dotted;
    position: absolute;
    left:-50px;
    width: 500px;
} */
</style>