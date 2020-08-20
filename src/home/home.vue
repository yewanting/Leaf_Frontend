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
      <my_toast></my_toast>
      <div v-for="(com,index) in curComList" :key="index">
        <!-- 按钮 -->
        <my_button
          v-if="com.type=='button'"
          :index="index"
          :position="com.attr.position"
          :title="com.attr.title"
          :background_color="com.attr.background_color"
          :border_color="com.attr.border_color"
          :text_color="com.attr.text_color"
          :text_size="com.attr.text_size"
          :width="com.attr.width"
          :height="com.attr.height"
          :line_height="com.attr.line_height"
          :border_radius="com.attr.border_radius"
          :padding_top="com.attr.padding_top"
          :padding_left="com.attr.padding_left"
          :margin_top="com.attr.margin_top"
        ></my_button>

        <!-- 轮播图 -->
        <my_banner
          v-if="com.type=='banner'"
          :index="index"
          :imgsrc="com.attr.imgsrc"
          :width="com.attr.width"
          :height="com.attr.height"
          :border_radius="com.attr.border_radius"
          :banner_seconds="com.attr.banner_seconds"
        ></my_banner>

        <!-- 课程列表 -->

        <my_courselist
          v-if="com.type=='courselist'"
          :index="index"
          :title_background_color="com.attr.title_background_color"
          :title_color="com.attr.title_color"
          :title_font_size="com.attr.title_font_size"
          :descripe_background_color="com.attr.descripe_background_color"
          :descripe_color="com.attr.descripe_color"
          :descripe_font_size="com.attr.descripe_font_size"
          :label_background_color="com.attr.label_background_color"
          :label_color="com.attr.label_color"
          :label_font_size="com.attr.label_font_size"
          :price_background_color="com.attr.price_background_color"
          :price_color="com.attr.price_color"
          :price_position="com.attr.price_position"
          :price_size="com.attr.price_size"
          :course_img_width="com.attr.course_img_width"
          :course_img_height="com.attr.course_img_height"
          :course_img_border_radius="com.attr.course_img_border_radius"
          :goods="com.content"
        ></my_courselist>

        <!-- 搜索框 -->
        <my_find
          v-if="com.type=='find'"
          :index="index"
          :text="com.attr.text"
          :border_color="com.attr.border_color"
          :text_color="com.attr.text_color"
          :text_size="com.attr.text_size"
          :big_height="com.attr.big_height"
          :width="com.attr.width"
          :height="com.attr.height"
          :border_radius="com.attr.border_radius"
          :find_icon_size="com.attr.find_icon_size"
        ></my_find>

        <!-- 经典语录 -->
        <my_talk
          v-if="com.type=='talk'"
          :index="index"
          :text_background_color="com.attr.text_background_color"
          :text_color="com.attr.text_color"
          :text_font_size="com.attr.text_font_size"
          :course_img_width="com.attr.course_img_width"
          :course_img_height="com.attr.course_img_height"
          :course_img_border_radius="com.attr.course_img_border_radius"
          :talk="com.content"
        ></my_talk>

        <!-- 地图 -->
        <!-- <my_map></my_map> -->

        <!-- 标题 -->
        <my_title
          v-if="com.type=='title'"
          :index="index"
          :content="com.attr.content"
          :background_color="com.attr.background_color"
          :color="com.attr.color"
          :font_size="com.attr.font_size"
          :position="com.attr.position"
        ></my_title>

        <!-- 分割线 -->
        <my_separator
          v-if="com.type=='separator'"
          :index="index"
          :border_wide="com.attr.border_wide"
          :border_form="com.attr.border_form"
          :border_color="com.attr.border_color"
        ></my_separator>


      </div>
    </div>
    <div class="right">
      <div class="right_title">
        <ul>
          <li v-for="(item_title,index) in titlelist" :key="index">
            <span
              :class="((titleChoice==item_title)?'isclicked':'')"
              @click="clicktitle(item_title)"
            >{{item_title}}</span>
          </li>
        </ul>
      </div>
      <div class="right_content">
        <div>
          <div v-if="('button'==curComType)">
            <my_button_change></my_button_change>
          </div>
          <div v-if="('banner'==curComType)">
            <my_banner_change></my_banner_change>
          </div>
          <div v-if="('courselist'==curComType)">
            <my_courselist_change></my_courselist_change>
          </div>
          <div v-if="('find'==curComType)">
            <my_find_change></my_find_change>
          </div>
          <div v-if="('talk'==curComType)">
            <my_talk_change></my_talk_change>
          </div>
          <!-- <div v-if="('map'==curComType)">
            <my_map_change></my_map_change>
          </div>-->
          <div v-if="('title'==curComType)">
            <my_title_change></my_title_change>
          </div>
          <div v-if="('separator'==curComType)">
            <my_separator_change></my_separator_change>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import my_toast from "../components/toast.vue";
// 按钮
import my_button from "../components/button.vue";
import my_button_change from "../components/button_change.vue";

// 轮播图
import my_banner from "../components/banner.vue";
import my_banner_change from "../components/banner_change.vue";

// 课程列表
import my_courselist from "../components/courselist.vue";
import my_courselist_change from "../components/courselist_change.vue";

// 搜索框
import my_find from "../components/find.vue";
import my_find_change from "../components/find_change.vue";

// 经典语录
import my_talk from "../components/talk.vue";
import my_talk_change from "../components/talk_change.vue";

// 地图
import my_map from "../components/map.vue";
import my_map_change from "../components/map_change.vue";

// 标题
import my_title from "../components/title.vue";
import my_title_change from "../components/title_change.vue";

// 分割线
import my_separator from "../components/separator.vue";
import my_separator_change from "../components/separator_change.vue";



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
      titlelist: ["组件样式", "组件配置"],
    };
  },

  computed: {
    titleChoice() {
      return this.$store.state.title_choice;
    },
    curComList() {
      return this.$store.state.cur_com_list;
    },
    curComType() {
      return this.$store.state.cur_com_type;
    },
    curComAttr() {
      return this.$store.state.cur_com_attr;
    },
    curComID() {
      return this.$store.state.cur_com_id;
    },
    course_form() {
      return this.$store.state.course_form;
    },
  },

  components: {
    my_toast,
    my_button,
    my_button_change,
    my_banner,
    my_banner_change,
    my_courselist,
    my_courselist_change,
    my_find,
    my_find_change,
    my_talk,
    my_talk_change,
    my_map,
    my_map_change,
    my_title,
    my_title_change,
    my_separator,
    my_separator_change,
  },
  mounted() {
    this.initList();
  },
  methods: {
    choose_component(component) {
      var curlist = this.curComList;

      if (component == "轮播") {
        curlist.push({
          type: "banner",
          attr: {
            imgsrc: [
              "../../static/images/lunbo1.png",
              "../../static/images/lunbo2.png",
              "../../static/images/lunbo3.png",
              "../../static/images/lunbo4.png",
              "../../static/images/lunbo1.png",
            ],
            width: "500",
            height: "200",
            border_radius: "0",
            banner_seconds: "3000",
          },
        });
      }

      if (component == "按钮") {
        curlist.push({
          type: "button",
          attr: {
            title: "按钮"+curlist.length,
            background_color: "#ffffff",
            border_color: "#000000",
            text_color: "#000000",
            text_size: "15",
            width: "100",
            height: "40",
            line_height: "0",
            border_radius: "0",
            padding_top: "0",
            padding_left: "0",
            margin_top:"0",
          },
        });
      }
      if (component == "课程列表") {
        curlist.push({
          type: "courselist",
          attr: {
            title_background_color: "#ffffff",
            title_color: "#000000",
            title_font_size: "20",
            descripe_background_color: "#ffffff",
            descripe_color: "#a89e9e",
            descripe_font_size: "15",
            label_background_color: "#f8c9c9",
            label_color: "#ffffff",
            label_font_size: "16",
            price_position: "right",
            price_background_color: "#ffffff",
            price_color: "#fb940e",
            price_size: "15",
            course_img_width: "150",
            course_img_height: "150",
            course_img_border_radius: "0",
          },
          content: [
            {
              title: "课程标题",
              descripe: "课程简介",
              price: "￥" + 99,
              label: "课程标签",
              course_img: "../../static/images/good_pic.png",
            },
            {
              title: "课程标题",
              descripe: "课程简介",
              price: "￥" + 99,
              label: "课程标签",
              course_img: "../../static/images/good_pic.png",
            },
            {
              title: "课程标题",
              descripe: "课程简介",
              price: "￥" + 99,
              label: "课程标签",
              course_img: "../../static/images/good_pic.png",
            },
            {
              title: "课程标题",
              descripe: "课程简介",
              price: "￥" + 99,
              label: "课程标签",
              course_img: "../../static/images/good_pic.png",
            },
          ],
        });
      }
      // console.log("home",this)

      if (component == "搜索") {
        curlist.push({
          type: "find",
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
          },
        });
      }

      if (component == "经典语录") {
        curlist.push({
          type: "talk",
          attr: {
            text_background_color: "#ffffff",
            text_color: "#000000",
            text_font_size: "20",
            course_img_width: "150",
            course_img_height: "150",
            course_img_border_radius: "0",
          },
          content: [
            {
              descripe: "经典语录经典语录经典语录经典语录经典语录",
              course_img: "../../static/images/talk_pic.png",
              love_count: "666",
              comment_count: "666",
            },
            {
              descripe: "经典语录经典语录经典语录经典语录经典语录",
              course_img: "../../static/images/talk_pic.png",
              love_count: "666",
              comment_count: "666",
            },
            {
              descripe: "经典语录经典语录经典语录经典语录经典语录",
              course_img: "../../static/images/talk_pic.png",
              love_count: "666",
              comment_count: "666",
            },
            {
              descripe: "经典语录经典语录经典语录经典语录经典语录",
              course_img: "../../static/images/talk_pic.png",
              love_count: "666",
              comment_count: "666",
            },
          ],
        });
      }

      if (component == "标题") {
        curlist.push({
          type: "title",
          attr: {
            content: "标题文本",
            background_color: "#ffffff",
            color: "#000000",
            font_size: "18",
            position: "left",
          },
        });
      }

      if (component == "分割线") {
        curlist.push({
          type: "separator",
          attr: {
            border_color: "#000000",
            border_form: "solid",
            border_wide: "1",
          },
        });
      }

      this.$store.commit("CURCOMLIST", curlist);
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
      this.$store.commit("TITLECHOICE", item_title);
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
  overflow-y: scroll;
  overflow-x: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid grey;
  margin: auto;
  box-shadow: 0px 10px 30px rgb(226, 225, 224);
}
.mid::-webkit-scrollbar {
  display: none;
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