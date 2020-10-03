
// 让物体移动
function Drag() {
  this.initialize.apply(this, arguments);
}
Drag.prototype = {
  initialize: function (_this,drag, options) {
    this._this = _this;
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
    this._this.$emit("unshow_coordinate")
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
    this._this.$emit("coordinate",this._this.id,coordinate)
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
    this._this.$emit("unshow_coordinate")
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

module.exports = Drag;