<template>
  <div class="total">
    <!-- 左边的选择 -->
    <div class="left">
      <div class="left_top">
        <div class="top_title">
          <div class="top_title_mid">
            <i class="iconfont icon-chuangkouwindow33"></i>
            组件库
          </div>
        </div>
        <div class="top_content">
          <ul id="component_ul">
            <li
              v-for="(component_item,index) in component_content"
              :key="index"
              class="component_list"
              @click="choose_component(component_item.content)"
            >
              <i class="iconfont" :class="component_item.icon_class"></i>
              {{component_item.content}}
            </li>
          </ul>
        </div>
      </div>
      <div class="left_bottom">
        <div class="bottom_title">
          <div class="bottom_title_mid">
            <i class="iconfont icon-chuangkouwindow33"></i>
            营销组件
          </div>
        </div>
        <div class="bottom_content">
          <ul id="extra_component">
            <li
              v-for="(extra_component_item,index) in extal_component"
              :key="index"
              class="component_list"
              @click="choose_component(component_item.content)"
            >
              <i class="iconfont" :class="extra_component_item.icon_class"></i>
              {{extra_component_item.content}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="mid" id="mainview">
      <div v-for="(com,index) in curComList" :key="index" @click="change_form">
        <MyButton v-if="com.type=='button'" :index="index" :title="com.attr.title" :background_color="com.attr.background_color" :height="30" :width="100"></MyButton>
      </div>
    </div>
    <div class="right">
      <div class="right_title">
        <ul>
          <li v-for="(item_title,index) in titlelist" :key="index">
            <span
              :class="((title_choice==item_title)?'isclicked':'')"
              @click="clicktitle(item_title)"
            >{{item_title}}</span>
          </li>
        </ul>
      </div>
      <div class="right_content">
        <div>
          <span>{{curComID}}</span>
          <ul v-show="('button'==curComType)">

            <li v-for="(v,k) in curComAttr" :key="k">
              <div v-show="k=='title'">
                <span>按钮文本：</span>
                <input 
                  type="text"
                  :value="v"
                  @change="onChange('title',$event.target.value)"
                />
              </div>

               <input v-show="k=='background_color'"
                type="color"
                :value="v"
                @change="onChange('background_color',$event.target.value)"
              />

            </li>

          </ul>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "../components/button.vue";
export default {
  data() {
    return {
      component_content: [
        {
          icon_class: "icon-lunbotu",
          content: "轮播",
        },
        {
          icon_class: "icon-shipin",
          content: "视频",
        },
        {
          icon_class: "icon-Z-fenleidaohang",
          content: "分类导航",
        },
        {
          icon_class: "icon-sousuo",
          content: "搜索",
        },
        {
          icon_class: "icon-dizhi",
          content: "地址",
        },
        {
          icon_class: "icon-tongzhi",
          content: "通知公告",
        },
        {
          icon_class: "icon-biaoti",
          content: "标题",
        },
        {
          icon_class: "icon-tupian",
          content: "图片",
        },
        {
          icon_class: "icon-chuangkouwindow33",
          content: "橱窗",
        },
        {
          icon_class: "icon-anniu",
          content: "按钮",
        },
        {
          icon_class: "icon-fengexian",
          content: "分割线",
        },
        {
          icon_class: "icon-tuwenliebiao",
          content: "图文列表",
        },
        {
          icon_class: "icon-zhongdianguanggaowei",
          content: "广告位",
        },
        {
          icon_class: "icon-liebiao",
          content: "课程列表",
        },
        {
          icon_class: "icon-liebiao",
          content: "经典语录",
        },
        {
          icon_class: "icon-liebiao",
          content: "推荐列表",
        },
        {
          icon_class: "icon-liebiao",
          content: "讲师列表",
        },
      ],
      extal_component: [
        {
          icon_class: "icon-youhuiquan",
          content: "优惠券",
        },
        {
          icon_class: "icon-pintuan",
          content: "拼团",
        },
        {
          icon_class: "icon-miaosha",
          content: "秒杀",
        },
        {
          icon_class: "icon-kanjia",
          content: "砍价",
        },
      ],
      count: 0,
      imgs: ["../../static/images/1.jpg"],
      pic: "../../static/images/1.jpg",

      componentlist: [],

      titlelist: ["组件样式", "组件配置"],
      title_choice: "组件样式",
      btn_choices: [
        {
          title: "按钮位置",
          content_type: "radio",
        },
        {
          title: "按钮背景颜色",
          attrName: "background",
          content_type: "color",
        },
        {
          title: "按钮边框颜色",
          attrName: "border_color",
          content_type: "color",
        },
        {
          title: "文字内容",
          attrName: "text_content",
          content_type: "text",
        },
        {
          title: "文字颜色",
          attrName: "text_color",
          content_type: "color",
        },
        {
          title: "文字大小",
          attrName: "text_size",
          content_type: "text",
        },
        {
          title: "按钮宽度",
          attrName: "Width",
          content_type: "text",
        },
        {
          title: "按钮高度",
          attrName: "Height",
          content_type: "text",
        },
        {
          title: "按钮行高",
          attrName: "line_height",
          content_type: "text",
        },
        {
          title: "按钮圆角",
          attrName: "border_radius",
          content_type: "text",
        },
        {
          title: "上内边距",
          attrName: "padding_top",
          content_type: "text",
        },
        {
          title: "下内边距",
          attrName: "padding_bottom",
          content_type: "text",
        },
      ],
      component_choose: "",
      component_choose_change: "",
      value: "",
    };
  },

  computed:{
    curComList(){
      return this.$store.state.cur_com_list
    },
    curComType(){
      return this.$store.state.cur_com_type
    },
    curComAttr(){
      return this.$store.state.cur_com_attr
    },
    curComID(){
      return this.$store.state.cur_com_id
    }
  },

  components: {
    MyButton,
  },
  mounted() {
    this.initList();
  },
  methods: {
    onChange(attr,value){
      console.log(attr,value)
      var curlist = this.curComList
      curlist[this.curComID]["attr"][attr] = value

      var curattr = this.curComAttr
      curattr[attr] = value

      this.$store.commit("CURCOMATTR",curattr)
      this.$store.commit("CURCOMLIST",curlist)

    },
    change_form() {
      this.component_choose_change = this.$store.state.cur_click_Element;
      this.component_choose = this.$store.state.cur_click_component;
    },
   
    choose_component(component) {

      var curlist = this.curComList

      if (component == "按钮") {


        curlist.push({
          type: "button",
          attr:{
            title: "猪猪按钮" + curlist.length,
            background_color:"#ffffff",
            height: 30,
            width: 200,
          }
          
          
        });
        this.$store.commit("CURCOMLIST", curlist);
      }
    },

    initmove() {
      let list = document.getElementById("target").childNodes;
      //  console.log(lilist.length);
      for (let i = 0; i < list.length; i++) {
        this.move(list[i]);
      }
    },
    move(source) {
      source.ondragstart = function (event) {
        var e = event || window.event;
        console.log("开始拖拽");
        console.log("当前移动的是", e.target.id);
        e.dataTransfer.setData("text", e.target.id);
      };

      source.ondragover = function (event) {
        var event = event || window.event;
        event.preventDefault();
      };
      source.ondrop = function (event) {
        var e = event || window.event;
        var data = e.dataTransfer.getData("text");
        var fa = document.getElementById("target");
        console.log("最终放下的位置", e.target.id);
        //要放的元素是data
        fa.insertBefore(document.getElementById(data), e.target);
        //暂时先实现组件只能从下往上拖
        //从上往下拖还没实现，需要判断拖动的方向，并且写个函数insertAfter
        //insertAfter(document.getElementById(data),target)
      };
    },
    initList() {
      // 初始化上部组件库
      let curtopul = document.getElementById("component_ul");
      let cur_top_ul_width = curtopul.offsetWidth;
      let cur_top_ul_height = curtopul.offsetHeight;

      let cur_top_li_width = cur_top_ul_width / 3.1;
      let cur_top_li_height = cur_top_ul_height / 6.2;
      let li_top_list = document
        .getElementById("component_ul")
        .getElementsByTagName("li");

      for (let i = 0; i < li_top_list.length; i++) {
        li_top_list[i].style.width = cur_top_li_width + "px";
        li_top_list[i].style.height = cur_top_li_height + "px";
      }

      // 初始化下部组件库
      let curbottomul = document.getElementById("extra_component");
      let cur_bottom_ul_width = curbottomul.offsetWidth;
      let cur_bottom_ul_height = curbottomul.offsetHeight;

      let cur_bottom_li_width = cur_top_li_width;
      let cur_bottom_li_height = cur_top_li_height;
      let li_bottom_list = document
        .getElementById("extra_component")
        .getElementsByTagName("li");

      for (let i = 0; i < li_bottom_list.length; i++) {
        li_bottom_list[i].style.width = cur_bottom_li_width + "px";
        li_bottom_list[i].style.height = cur_bottom_li_height + "px";
      }
    },
    clicktitle(item_title) {
      this.title_choice = item_title;
    },
  },
};
</script>


<style scoped>
/* 左端组件库 */
.left {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 99vh;
  box-shadow: 0px 10px 30px rgb(226, 225, 224);
  border: 1px solid rgb(151, 138, 138);
}
.left_top {
  width: 100%;
  height: 60%;
  border-top: 1px solid rgb(151, 138, 138);
}
.left_bottom {
  width: 100%;
  height: 40%;
  border-top: 1px solid rgb(151, 138, 138);
}
.top_title {
  width: 100%;
  height: 5%;
}
.bottom_title {
  width: 100%;
  height: 8%;
}
.top_title_mid,
.bottom_title_mid {
  border-bottom: 1px solid orangered;
  color: orangered;
}
.top_content {
  width: 100%;
  height: 95%;
}
.bottom_content {
  width: 100%;
  height: 90%;
}
ul {
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
}
.component_list {
  float: left;
  border: 1px solid grey;
  font-size: 12px;
}
.component_list:hover {
  cursor: pointer;
}
.iconfont {
  font-size: 25px;
}

/* 中间手机端 */
.mid {
  position: absolute;
  height: 800px;
  width: 500px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid grey;
  margin: auto;
  box-shadow: 0px 10px 30px rgb(226, 225, 224);
}

/* 右端改变样式 */
.right {
  position: absolute;
  right: 0;
  top: 0;
  width: 350px;
  height: 99vh;
  box-shadow: 0px 10px 30px rgb(226, 225, 224);
  /* border: 1px solid rgb(151, 138, 138); */
}
.right_title ul {
  height: 3vh;
  box-shadow: 0px 10px 30px rgb(238, 231, 224);
}
.right_title li {
  float: left;
  margin-left: 60px;
  width: 100px;
}
.isclicked {
  color: rgb(252, 153, 118);
  padding-bottom: 5px;
  border-bottom: 3px solid orangered;
}
span:hover {
  cursor: pointer;
}
.right_content {
  width: 100%;
  height: 96vh;
  background-color: rgb(241, 248, 255);
}
.right_content li {
  height: 50px;
  margin-left: 20px;
  color: rgb(121, 111, 111);
}
</style>