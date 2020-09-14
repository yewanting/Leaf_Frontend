<template>
  <div class="home_total">
    <header @mouseenter="unshow_ruler">
      <div class="main_view_saved">
        <abbr title="电脑端">
          <i class="iconfont icon-icon-test" @click="change_into_computer"></i>
        </abbr>
        <abbr title="手机端">
          <i class="iconfont icon-shouji" @click="change_into_phone"></i>
        </abbr>
        <div @click="download_code">
          <span>下载源码</span>
        </div>
        <div>
          <span>保存</span>
        </div>
      </div>
    </header>

    <main>
      <!-- 左边的选择 -->
      <nav>
        <div @mouseenter="show_nav" @mouseleave="unshow_nav" class="main_view_add_content">
          <i class="iconfont icon-jiahao"></i>
          添加内容
        </div>
      </nav>
      <i id="toast_kuang" class="iconfont icon-kuang2" v-show="(is_show_xiaoxi==true)"></i>
      <div id="nav_block" @mouseenter="show_nav" @mouseleave="unshow_nav">
        <div class="main_view_top_content">
          <ul id="component_ul">
            <li
              v-for="(component_item,index) in component_content"
              :key="index"
              class="main_view_component_list"
            >
              <div>
                <i class="iconfont" :class="component_item.icon_class"></i>
                {{component_item.content}}
              </div>
              <div class="example">
                <div
                  class="example_item"
                  v-for="(src,ind) in component_item.imgsrc"
                  :key="ind"
                  @mouseenter="get_left($event.currentTarget,src['src'])"
                  @mouseleave="unshow_getleft"
                  @click="choose_component(src['title'],$event.currentTarget)"
                >
                  <img :src="src['src']" />
                  {{src['title']}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 中间部分 -->
      <article>
        <div v-for="(com,index) in curComList" :key="index" id ="component_set">
          <button_test
            v-if="com.type=='button2'"
            :id="index"
            :left="com.attr.left"
            :top="com.attr.top"
          ></button_test>

          <my_button
            v-if="com.type=='button'"
            :id="index"
            :left="com.attr.left"
            :top="com.attr.top"
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
            @coordinate ="get_coordinate"
            @unshow_coordinate ="unget_coordinate"
            @attach ="get_attach"
          ></my_button>
        </div>
        <canvas
          id="canvas_x"
          width="3000"
          height="30"
          @mousemove="show_ruler_x"
        ></canvas>
        <canvas
          id="canvas_y"
          width="50"
          height="2000"
          @mousemove="show_ruler_y"
        ></canvas>
        <div style="width:100%;height:100%;" @mouseenter="unshow_ruler">
          <div class="main_view_mid" id="mainview">
            <my_toast></my_toast>
            <div v-for="(com,index) in curComList" :key="index">
              <!-- 按钮 -->
              <!-- <my_button
              v-if="com.type=='button'"
              :id="index"
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
              ></my_button>-->

              <!-- 轮播图 -->
              <my_banner
                v-if="com.type=='banner'"
                :index="index"
                :imgsrc="com.attr.imgsrc"
                :width="com.attr.width"
                :height="com.attr.height"
                :border_radius="com.attr.border_radius"
                :banner_seconds="com.attr.banner_seconds"
                :margin_top="com.attr.margin_top"
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
                :margin_top="com.attr.margin_top"
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
                :margin_top="com.attr.margin_top"
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
                :margin_top="com.attr.margin_top"
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
                :margin_top="com.attr.margin_top"
              ></my_title>

              <!-- 分割线 -->
              <my_separator
                v-if="com.type=='separator'"
                :index="index"
                :border_wide="com.attr.border_wide"
                :border_form="com.attr.border_form"
                :border_color="com.attr.border_color"
                :margin_top="com.attr.margin_top"
              ></my_separator>
            </div>
          </div>
        </div>
      </article>
      <aside @mouseenter="unshow_ruler">
        <div class="main_view_right_title">
          <ul>
            <li v-for="(item_title,index) in titlelist" :key="index">
              <span
                :class="((titleChoice==item_title)?'main_view_isclicked':'')"
                @click="clicktitle(item_title)"
              >{{item_title}}</span>
            </li>
          </ul>
        </div>
        <div class="main_view_right_content">
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
            <div v-if="('title'==curComType)">
              <my_title_change></my_title_change>
            </div>
            <div v-if="('separator'==curComType)">
              <my_separator_change></my_separator_change>
            </div>
          </div>
        </div>
      </aside>
    </main>
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

// 测试随意拖动
import button_test from "../components/button_test.vue";

//下载依赖
// npm i axios, JSZip, FileSaver -s
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json; application/octet-stream",
      },
    })
      .then((data) => {
        // console.log(data.data);
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

export default {
  data() {
    return {
      component_content: [
        {
          icon_class: "icon-lunbotu",
          content: "轮播图",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "轮播图1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "轮播图2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "轮播图3",
            },
          ],
        },
        {
          icon_class: "icon-shipin",
          content: "视频",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "视频1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "视频2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "视频3",
            },
          ],
        },
        {
          icon_class: "icon-Z-fenleidaohang",
          content: "分类导航",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分类导航1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分类导航2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分类导航3",
            },
          ],
        },
        {
          icon_class: "icon-sousuo",
          content: "搜索框",
          imgsrc: [
            {
              src: "../../static/images/left/sousuo1.png",
              title: "搜索框1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "搜索框2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "搜索框3",
            },
          ],
        },
        {
          icon_class: "icon-dizhi",
          content: "地址",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "地址1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "地址2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "地址3",
            },
          ],
        },
        {
          icon_class: "icon-tongzhi",
          content: "通知公告",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "通知公告1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "通知公告2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "通知公告3",
            },
          ],
        },
        {
          icon_class: "icon-biaoti",
          content: "标题",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "标题1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "标题2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "标题3",
            },
          ],
        },
        {
          icon_class: "icon-tupian",
          content: "图片",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图片1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图片2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图片3",
            },
          ],
        },
        {
          icon_class: "icon-chuangkouwindow33",
          content: "橱窗",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "橱窗1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "橱窗2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "橱窗3",
            },
          ],
        },
        {
          icon_class: "icon-anniu",
          content: "按钮",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "按钮1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "按钮2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "按钮3",
            },
          ],
        },
        {
          icon_class: "icon-fengexian",
          content: "分割线",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分割线1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分割线2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "分割线3",
            },
          ],
        },
        {
          icon_class: "icon-tuwenliebiao",
          content: "图文列表",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图文列表1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图文列表2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "图文列表3",
            },
          ],
        },
        {
          icon_class: "icon-zhongdianguanggaowei",
          content: "广告位",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "广告位1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "广告位2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "广告位3",
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "课程列表",
          imgsrc: [
            {
              src: "../../static/images/left/kecheng1.png",
              title: "课程列表1",
            },
            {
              src: "../../static/images/left/kecheng2.png",
              title: "课程列表2",
            },
            {
              src: "../../static/images/left/kecheng3.png",
              title: "课程列表3",
            },
            {
              src: "../../static/images/left/kecheng4.png",
              title: "课程列表3",
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "经典语录",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "经典语录1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "经典语录2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "经典语录3",
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "推荐列表",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "推荐列表1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "推荐列表2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "推荐列表3",
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "讲师列表",
          imgsrc: [
            {
              src: "../../static/images/left/lunbo2.png",
              title: "讲师列表1",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "讲师列表2",
            },
            {
              src: "../../static/images/left/lunbo2.png",
              title: "讲师列表3",
            },
          ],
        },
      ],
      titlelist: ["组件样式", "组件配置"],
      img_sz: [],
      mp: "",
      is_show_phone: true,
      is_show_xiaoxi: false,
      id_array:"",
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
    // phone_form() {
    //   return 'background-image:  url("../../static/images/shouji_background.png");background-size: 520px 1000px; background-repeat: no-repeat;background-position-x: center;';
    // },
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

    button_test,
  },
  mounted() {
    this.mp = new Map();
    this.id_map = new Map();
    var canvas_x = document.getElementById("canvas_x"),
      canvas_y = document.getElementById("canvas_y"),
      context_x = canvas_x.getContext("2d"),
      context_y = canvas_y.getContext("2d"),
      AXIS_MARGIN = 0, //axis_magin,
      AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas_y.height - AXIS_MARGIN }, //axis_origin = {x:axis_margin,y:canvas.height-axis_margin},
      AXIS_TOP = AXIS_MARGIN, //axis_top = axis_margin,
      AXIS_RIGHT = canvas_x.width - AXIS_MARGIN, //axis_right = canvas.width-axis_margin,
      HORIZONTAL_TICK_SPACING = 10, //horizontal_tick_spacing = 10,
      VERTICAL_TICK_SPACING = 10, //vertical_tick_spacing = 10,
      AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x, //axis_width = axis_right - axis_origin.x,
      AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP, //axis_height = axis_origin.y - axis_top,
      NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING, //num_vertical_ticks = axis_height/vertical_tick_spacing,
      NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING, //num_horizontal_ticks = axis_width/horizontal_tick_spacing,
      TICK_WIDTH = 20, //tick_width = 20,
      TICKS_LINEWIDTH = 0.5, //ticks_linewidth = 0.5,
      TICKS_COLOR = "navy", //ticks_color = 'navy',
      AXIS_LINEWIDTH = 1.0, //axis_linewidth = 1.0,
      AXIS_COLOR = "blue"; //axis_color = 'blue';
    function drawAxes_x() {
      context_x.save();
      context_x.strokeStyle = AXIS_COLOR;
      context_x.lineWidth = AXIS_LINEWIDTH;
      drawHorizontalAxis(context_x);
      // drawVerticalAxis();
      context_x.lineWidth = 0.5;
      context_x.lineWidth = TICKS_LINEWIDTH;
      context_x.strokeStyle = TICKS_COLOR;
      // drawVerticalAxisTicks();
      drawHorizontalAxisTicks(context_x);
      context_x.restore();
    }
    function drawAxes_y() {
      context_y.save();
      context_y.strokeStyle = AXIS_COLOR;
      context_y.lineWidth = AXIS_LINEWIDTH;
      // drawHorizontalAxis();
      drawVerticalAxis(context_y);
      context_y.lineWidth = 0.5;
      context_y.lineWidth = TICKS_LINEWIDTH;
      context_y.strokeStyle = TICKS_COLOR;
      drawVerticalAxisTicks(context_y);
      // drawHorizontalAxisTicks();
      context_y.restore();
    }
    function drawHorizontalAxis(target) {
      target.beginPath();
      target.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
      target.lineTo(AXIS_RIGHT, AXIS_MARGIN);
      target.closePath();
      target.stroke();
    }
    function drawVerticalAxis(target) {
      target.beginPath();
      target.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
      target.lineTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
      target.closePath();
      target.stroke();
    }
    function drawVerticalAxisTicks(target) {
      var deltaX;
      for (var i = 1; i < NUM_VERTICAL_TICKS; ++i) {
        target.beginPath();
        if (i % 10 === 0) {
          deltaX = TICK_WIDTH;
          target.moveTo(0, 0 + HORIZONTAL_TICK_SPACING * i);
          target.lineTo(20, 0 + HORIZONTAL_TICK_SPACING * i);
          target.textAlign = "left";
          target.fillText(
            i * HORIZONTAL_TICK_SPACING - 100,
            30,
            0 + HORIZONTAL_TICK_SPACING * i
          );
        } else {
          deltaX = TICK_WIDTH / 2;
        }
        target.moveTo(AXIS_ORIGIN.x, i * VERTICAL_TICK_SPACING);
        target.lineTo(AXIS_ORIGIN.x + deltaX, i * VERTICAL_TICK_SPACING);
        target.stroke();
      }
    }
    function drawHorizontalAxisTicks(target) {
      var deltaY;
      for (var i = 1; i < NUM_HORIZONTAL_TICKS; ++i) {
        target.beginPath();
        if (i % 10 === 0) {
          deltaY = TICK_WIDTH;
          target.moveTo(0 + VERTICAL_TICK_SPACING * i, 0);
          target.lineTo(VERTICAL_TICK_SPACING * i, 20);
          target.textAlign = "left";
          target.fillText(
            i * VERTICAL_TICK_SPACING - 500,
            0 + VERTICAL_TICK_SPACING * i,
            30
          );
        } else {
          deltaY = TICK_WIDTH / 2;
        }
        target.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN);
        target.lineTo(
          AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
          AXIS_MARGIN + deltaY
        );
        target.stroke();
      }
    }
    drawAxes_x();
    drawAxes_y();
    // document.getElementsByTagName("article")[0].scrollLeft= 500;
  },
  methods: {
    choose_component(component, event) {
      var curlist = this.curComList;

      if (component == "轮播图1") {
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
            margin_top: "0",
          },
        });
      }

      if (component == "按钮1") {
        curlist.push({
          type: "button",
          attr: {
            title: "按钮" + curlist.length,
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
            margin_top: "0",
            left: event.getBoundingClientRect().right - 100,
            top: event.getBoundingClientRect().top + 50,
          },
        });
      }
      if (component == "按钮2") {
        curlist.push({
          type: "button2",
          attr: {
            left: event.getBoundingClientRect().right - 100,
            top: event.getBoundingClientRect().top + 50,
          },
        });
      }
      if (component == "课程列表1") {
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
            margin_top: "0",
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

      if (component == "搜索框1") {
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
            margin_top: "0",
          },
        });
      }

      if (component == "经典语录1") {
        curlist.push({
          type: "talk",
          attr: {
            text_background_color: "#ffffff",
            text_color: "#000000",
            text_font_size: "20",
            course_img_width: "150",
            course_img_height: "150",
            course_img_border_radius: "0",
            margin_top: "0",
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

      if (component == "标题1") {
        curlist.push({
          type: "title",
          attr: {
            content: "标题文本",
            background_color: "#ffffff",
            color: "#000000",
            font_size: "18",
            position: "left",
            margin_top: "0",
          },
        });
      }

      if (component == "分割线1") {
        curlist.push({
          type: "separator",
          attr: {
            border_color: "#000000",
            border_form: "solid",
            border_wide: "1",
            margin_top: "10",
          },
        });
      }

      this.$store.commit("CURCOMLIST", curlist);
    },

    clicktitle(item_title) {
      this.$store.commit("TITLECHOICE", item_title);
    },
    // 获取特定屏幕上的代码
    get_code() {
      var cur_code =
        '<head><link rel="stylesheet" type="text/css" href="index.css">' +
        '<link rel="stylesheet" type="text/css" href="iconfont/iconfont.css">' +
        '<meta charset = "utf-8"></head>';
      
     
      let mainview = document.querySelector("#mainview");
      for(let i = 0 ; i < this.curComList.length ;i++)
      {
        let cur = document.getElementById(i);
        let tmp_top = cur.getBoundingClientRect().top;
        let tmp_bottom = cur.getBoundingClientRect().bottom;
        let tmp_left = cur.getBoundingClientRect().left;
        let tmp_right = cur.getBoundingClientRect().right;
        if(tmp_top>=(mainview.getBoundingClientRect().top)
        &&tmp_bottom<=(mainview.getBoundingClientRect().bottom)
        &&tmp_left>=(mainview.getBoundingClientRect().left)
        &&tmp_right<=(mainview.getBoundingClientRect().right)
        )
        {
           cur_code += cur.outerHTML;
        }        
      }

      return cur_code.replace(/..\/..\/static\//g, "");

      
    },

    loadNode(node) {
      // 遍历所有的子节点
      for (var i = 0; i < node.childNodes.length; i++) {
        if (
          node.childNodes[i].src &&
          this.mp.get(node.childNodes[i].src) === undefined
        ) {
          this.img_sz.push(node.childNodes[i].src);
          this.mp.set(node.childNodes[i].src, 1);
        }
        if (
          node.childNodes[i].nodeType === 1 &&
          node.childNodes[i].childNodes.length > 0
        ) {
          this.loadNode(node.childNodes[i]);
        }
      }
      return this.img_sz;
    },
    get_img() {
      var total_mainview = document.querySelector("#mainview");
      let img_sz = this.loadNode(total_mainview);
      return img_sz;
    },
    download_code() {
      const data = ["/static/css/index.css"]; // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
      const img_data = this.get_img();
      const css_data = "/static/css/index.css";
      const zip = new JSZip();
      const promises = [];

      // 把图片存到images的文件夹中
      const imgs = zip.folder("images");
      img_data.forEach((item) => {
        const img_promise = getFile(item).then((data) => {
          const arr_name = item.split("/");
          const file_name = arr_name[arr_name.length - 1]; // 获取文件名
          imgs.file(file_name, data, { binary: true });
        });
        promises.push(img_promise);
      });

      // 压缩css
      const css_promise = getFile(css_data).then((data) => {
        const arr_name = css_data.split("/");
        const file_name = arr_name[arr_name.length - 1]; // 获取文件名

        zip.file(file_name, data, { binary: true }); // 逐个添加文件
      });
      promises.push(css_promise);

      // 压缩html
      let index_content = this.get_code();
      let cur_index_content = new Blob([index_content]);
      zip.file("index.html", cur_index_content, { binary: true }); // 逐个添加文件

      // 压缩iconfont
      const iconfont_data = [
        "/static/iconfont/demo.css",
        "/static/iconfont/demo_index.html",
        "/static/iconfont/iconfont.css",
        "/static/iconfont/iconfont.eot",
        "/static/iconfont/iconfont.js",
        "/static/iconfont/iconfont.json",
        "/static/iconfont/iconfont.svg",
        "/static/iconfont/iconfont.ttf",
        "/static/iconfont/iconfont.woff",
        "/static/iconfont/iconfont.woff2",
      ];

      const iconfonts = zip.folder("iconfont");
      iconfont_data.forEach((item) => {
        const iconfont_promise = getFile(item).then((data) => {
          const arr_name = item.split("/");
          const file_name = arr_name[arr_name.length - 1]; // 获取文件名
          iconfonts.file(file_name, data, { binary: true });
        });
        promises.push(iconfont_promise);
      });

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          // 生成二进制流
          FileSaver.saveAs(content, "project.zip"); // 利用file-saver保存文件  自定义文件名
        });
      });
    },
    change_into_computer() {
      let main_view = document.querySelector("#mainview");
      main_view.style.width = "100%";
      main_view.style.height = "100%";
      this.is_show_phone = false;
    },
    change_into_phone() {
      let main_view = document.querySelector("#mainview");
      main_view.style.width = "375px";
      main_view.style.height = "667px";
      this.is_show_phone = true;
    },
    show_nav() {
      document.querySelector("#nav_block").style.left = "28px";
       let remove = document.getElementById("show_num");
      let renum = document.getElementById("num");
      if (remove != null) {
        document.getElementsByTagName("article")[0].removeChild(remove);
        document.getElementsByTagName("article")[0].removeChild(renum);
      }
    },
    unshow_nav() {
      document.querySelector("#nav_block").style.left = "-100%";
    },
    get_left(event, src) {
      document.querySelector("#toast_kuang").style.left =
        event.getBoundingClientRect().right + "px";
      document.querySelector("#toast_kuang").style.top =
        event.getBoundingClientRect().top - 80 + "px";
      this.is_show_xiaoxi = true;
      document.querySelector("#toast_kuang").style.backgroundImage =
        'url("' + src + '")';
    },
    unshow_getleft() {
      this.is_show_xiaoxi = false;
    },
    show_ruler_x(event) {
      let remove = document.getElementById("show_num");
      let renum = document.getElementById("num");
      if (remove != null) {
        document.getElementsByTagName("article")[0].removeChild(remove);
        document.getElementsByTagName("article")[0].removeChild(renum);
      }
      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = event.layerX + "px";
      div.style.top = "0px";
      div.style.width = "2px";
      div.style.height = "100vh";
      div.style.backgroundColor = "red";
      div.style.zIndex = 101;
      div.id = "show_num";
      var div_text = document.createElement("div");
      div_text.style.position = "absolute";
      div_text.style.left = event.layerX - 60 + "px";
      div_text.style.top = "25px";
      div_text.style.width = "50px";
      div_text.style.height = "20px";
      div_text.style.backgroundColor = "#028c6a";
      div_text.style.color = "#ffffff";
      div_text.innerText = event.layerX - 500;
      div_text.id = "num";
      div_text.style.textAlign = "center";
      document.getElementsByTagName("article")[0].appendChild(div);
      document.getElementsByTagName("article")[0].appendChild(div_text);
    },
    unshow_ruler() {
      let remove = document.getElementById("show_num");
      let renum = document.getElementById("num");
      if (remove != null) {
        document.getElementsByTagName("article")[0].removeChild(remove);
        document.getElementsByTagName("article")[0].removeChild(num);
      }
    },

    show_ruler_y(event) {
      let remove = document.getElementById("show_num");
      let renum = document.getElementById("num");
      if (remove != null) {
        document.getElementsByTagName("article")[0].removeChild(remove);
        document.getElementsByTagName("article")[0].removeChild(renum);
      }
      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = "0px";
      div.style.top = event.layerY + "px";
      div.style.width = "100vw";
      div.style.height = "2px";
      div.style.backgroundColor = "red";
      div.style.zIndex = 101;
      div.id = "show_num";
      var div_text = document.createElement("div");
      div_text.style.position = "absolute";
      div_text.style.left = "25px";
      div_text.style.top = event.layerY - 50 + "px";
      div_text.style.width = "50px";
      div_text.style.height = "20px";
      div_text.style.backgroundColor = "#028c6a";
      div_text.style.color = "#ffffff";
      div_text.innerText = event.layerY - 100;
      div_text.style.textAlign = "center";
      div_text.id = "num";
      document.getElementsByTagName("article")[0].appendChild(div);
      document.getElementsByTagName("article")[0].appendChild(div_text);
    },
    unget_coordinate(){
      let pre_line_1 = document.getElementById("tmp1");
      let pre_line_2 = document.getElementById("tmp2");
      let pre_line_3 = document.getElementById("tmp3");
      let pre_line_4 = document.getElementById("tmp4");
      if(pre_line_1!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_line_1);
      }
      if(pre_line_2!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_line_2);
      }
      if(pre_line_3!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_line_3);
      }
      if(pre_line_4!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_line_4);
      }

      
      let pre_min_right = document.getElementById("min_right");
      if(pre_min_right!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_min_right);
      }   
      
      let pre_min_left = document.getElementById("min_left");
      if(pre_min_left!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_min_left);
      } 

      let pre_min_bottom = document.getElementById("min_bottom");
      if(pre_min_bottom!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_min_bottom);
      } 

      let pre_min_top = document.getElementById("min_top");
      if(pre_min_top!=null)
      {
        document.getElementsByTagName("article")[0].removeChild(pre_min_top);
      } 
    },
    get_coordinate(id,data){
      this.id_map.set(id,data);
      this.unget_coordinate();
      var line_div_1 = document.createElement("div");
      line_div_1.style.position = "absolute";
      line_div_1.style.zIndex = 101;
      line_div_1.style.backgroundColor= "#028c6a";
      line_div_1.id = "tmp1";
      line_div_1.style.top = "0px";
      line_div_1.style.left = "0px";


      var line_div_2 = document.createElement("div");
      line_div_2.style.position = "absolute";
      line_div_2.style.zIndex = 101;
      line_div_2.style.backgroundColor= "#028c6a";
      line_div_2.id = "tmp2";
      line_div_2.style.top = "0px";
      line_div_2.style.left = "0px";
      
      var line_div_3 = document.createElement("div");
      line_div_3.style.position = "absolute";
      line_div_3.style.zIndex = 101;
      line_div_3.style.backgroundColor= "#028c6a";
      line_div_3.id = "tmp3";
      line_div_3.style.top = "0px";
      line_div_3.style.left = "0px";


      var line_div_4 = document.createElement("div");
      line_div_4.style.position = "absolute";
      line_div_4.style.zIndex = 101;
      line_div_4.style.backgroundColor= "#028c6a";
      line_div_4.id = "tmp4";
      line_div_4.style.top = "0px";
      line_div_4.style.left = "0px";

      let min_top = {
        "dist":2000,
        "id":-1
      }
      let min_bottom = {
        "dist":2000,
        "id":-1
      }
      let min_left = {
        "dist":2000,
        "id":-1,
        "top":0
      }
      let min_right = {
        "dist":2000,
        "id":-1,
        "top":0
      }

      for(let [key,value] of this.id_map)
      {
          if(key!=id)
          {
             if(Math.abs(data.top-value.top)<=5||Math.abs(data.bottom-value.top)<=5)
             {
               line_div_1.id = "tmp1";
               line_div_1.style.left = "0px";
               line_div_1.style.top = value.top +"px";
               line_div_1.style.width = "100vw";
               line_div_1.style.height = "1px";
               document.getElementsByTagName("article")[0].appendChild(line_div_1);
               

                if(data.right<=value.left)
                {
                  let dist = value.left-data.right;
                  if(dist<=min_right.dist)
                  {
                    min_right.dist = dist;
                    min_right.id = key;
                    min_right.top = value.top;
                  }
                }

                if(value.right<=data.left)
                {
                  let dist =  data.left - value.right;
                  if(dist<=min_left.dist)
                  {
                    min_left.dist = dist;
                    min_left.id = key;
                    min_left.top = value.top;
                  }
                }
               
             }    
             if(Math.abs(data.top-value.bottom)<=5||Math.abs(data.bottom-value.bottom)<=5)
             {
               line_div_2.id = "tmp2";
               line_div_2.style.left = "0px";
               line_div_2.style.top = value.bottom+"px";
               line_div_2.style.width = "100vw";
               line_div_2.style.height = "1px";
               document.getElementsByTagName("article")[0].appendChild(line_div_2);  

                if(data.right<=value.left)
                {
                  let dist = value.left-data.right;
                  if(dist<=min_right.dist)
                  {
                    min_right.dist = dist;
                    min_right.id = key;
                    min_right.top = value.bottom;
                  }
                }

                if(value.right<=data.left)
                {
                  let dist =  data.left - value.right;
                  if(dist<=min_left.dist)
                  {
                    min_left.dist = dist;
                    min_left.id = key;
                    min_left.top = value.bottom;
                  }
                }

             }
             if(Math.abs(data.left-value.left)<=5||Math.abs(data.right-value.left)<=5)
             {
               line_div_3.id = "tmp3";
               line_div_3.style.top = "0px";
               line_div_3.style.left = value.left +"px";
               line_div_3.style.width = "1px";
               line_div_3.style.height = "100vh";
               document.getElementsByTagName("article")[0].appendChild(line_div_3); 



               if(data.bottom<=value.top)
                {
                  let dist = value.top-data.bottom;
                  if(dist<=min_bottom.dist)
                  {
                    min_bottom.dist = dist;
                    min_bottom.id = key;
                    min_bottom.left = value.left;
                  }
                }

                if(value.bottom<=data.top)
                {
                  let dist =  data.top - value.bottom;
                  if(dist<=min_top.dist)
                  {
                    min_top.dist = dist;
                    min_top.id = key;
                    min_top.left = value.left;
                  }
                }
             }
             if(Math.abs(data.left-value.right)<=5||Math.abs(data.right-value.right)<=5)
             {
               line_div_4.id = "tmp4";
               line_div_4.style.top = "0px";
               line_div_4.style.left = value.right +"px";
               line_div_4.style.width = "1px";
               line_div_4.style.height = "100vh";
               document.getElementsByTagName("article")[0].appendChild(line_div_4); 
               if(data.bottom<=value.top)
                {
                  let dist = value.top-data.bottom;
                  if(dist<=min_bottom.dist)
                  {
                    min_bottom.dist = dist;
                    min_bottom.id = key;
                    min_bottom.left = value.right;
                  }
                }

                if(value.bottom<=data.top)
                {
                  let dist =  data.top - value.bottom;
                  if(dist<=min_top.dist)
                  {
                    min_top.dist = dist;
                    min_top.id = key;
                    min_top.left = value.right;
                  }
                }
             }
          }
      }
      if(min_right.id!=-1)
      {
        let min_right_div = document.createElement("div");
        min_right_div.style.position = "absolute";
        min_right_div.style.zIndex = 101;
        min_right_div.style.top = min_right.top + "px"
        min_right_div.style.left = data.right+ "px";
        min_right_div.style.width = min_right.dist + "px";
        min_right_div.style.height = "2px";
        min_right_div.style.backgroundColor = '#003e19';
        min_right_div.innerText = min_right.dist;
        min_right_div.style.textAlign = "center";
        min_right_div.id = "min_right";
        document.getElementsByTagName("article")[0].appendChild(min_right_div); 
      }
      if(min_left.id!=-1)
      {
        let min_left_div = document.createElement("div");
        min_left_div.style.position = "absolute";
        min_left_div.style.zIndex = 101;
        min_left_div.style.top =  min_left.top + "px"
        min_left_div.style.left = this.id_map.get(min_left.id).right + "px";
        min_left_div.style.width = min_left.dist + "px";
        min_left_div.style.height = "2px";
        min_left_div.style.backgroundColor = '#003e19';
        min_left_div.innerText =  min_left.dist;
        min_left_div.style.textAlign = "center";
        min_left_div.id = "min_left"
        document.getElementsByTagName("article")[0].appendChild(min_left_div);         
      }

      if(min_bottom.id!=-1)
      {
        let min_bottom_div = document.createElement("div");
        min_bottom_div.style.position = "absolute";
        min_bottom_div.style.zIndex = 101;
        min_bottom_div.style.left =  min_bottom.left + "px"
        min_bottom_div.style.top = data.bottom + "px";
        min_bottom_div.style.height = min_bottom.dist + "px";
        min_bottom_div.style.width = "2px";
        min_bottom_div.style.backgroundColor = '#003e19';
        min_bottom_div.innerText =  min_bottom.dist;
        min_bottom_div.style.textAlign = "center";
        min_bottom_div.id = "min_bottom"
        document.getElementsByTagName("article")[0].appendChild(min_bottom_div);  
      }

       if(min_top.id!=-1)
      {
        let min_top_div = document.createElement("div");
        min_top_div.style.position = "absolute";
        min_top_div.style.zIndex = 101;
        min_top_div.style.left =  min_top.left + "px"
        min_top_div.style.top = this.id_map.get(min_top.id).bottom+ "px";
        min_top_div.style.height = min_top.dist + "px";
        min_top_div.style.width = "2px";
        min_top_div.style.backgroundColor = '#003e19';
        min_top_div.innerText =  min_top.dist;
        min_top_div.style.textAlign = "center";
        min_top_div.id = "min_top"
        document.getElementsByTagName("article")[0].appendChild(min_top_div);  
      }



    },
    get_attach(id,data){
      let cur = document.getElementById(id);
      let cur_width = this.curComAttr.width;
      let cur_height = this.curComAttr.height;
      // console.log(cur_width);
      // console.log(cur_height);
      for(let [key,value] of this.id_map)
      {
          if(key!=id)
          {
               if(Math.abs(data.top-value.top)<=10)  
               {
                 cur.style.top = value.top+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }       
               if(Math.abs(data.bottom-value.top)<=10)
               {
                 cur.style.bottom = value.top+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }    

                if(Math.abs(data.top-value.bottom)<=10)  
               {
                 cur.style.top = value.bottom+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }       
               if(Math.abs(data.bottom-value.bottom)<=10)
               {
                 cur.style.bottom = value.bottom+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               } 

              if(Math.abs(data.left-value.left)<=10)  
               {
                 cur.style.left = value.left+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }       
               if(Math.abs(data.right-value.left)<=10)
               {
                 cur.style.right = value.left+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }

               if(Math.abs(data.left-value.right)<=10)  
               {
                 cur.style.left = value.right+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }       
               if(Math.abs(data.right-value.right)<=10)
               {
                 cur.style.right = value.right+"px";
                 cur.style.width = cur_width +"px";
                 cur.style.height = cur_height+"px";
               }          
             
          }
      }
   }

  },
};
</script>


<style scoped>
#nav_block {
  transition-duration: 1s;
  width: 400px;
  position: absolute;
  left: -100%;
  background-color: #fdfdfd;
  box-shadow: 0px 10px 30px rgb(226, 225, 224);
  z-index: 2;
  align-items: stretch;
  height: 96vh;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #dad8d8;
}

.main_view_top_content,
.main_view_bottom_content {
  display: flex;
  flex-wrap: wrap;
}
.example .example_item {
  float: left;
  width: 40%;
  height: 110px;
  margin: 15px;
  text-align: center;
}
.example_item img {
  width: 100%;
  height: 100px;
  border: 1px solid #028c6a;
}
.icon-kuang2 {
  position: absolute;
  font-size: 300px;
  color: #9c9797;
  z-index: 101;
  background-size: 90% 80%;
  background-repeat: no-repeat;
  background-position: center;
}
#canvas_x,
#canvas_y {
  background: #ffffff;
  cursor: pointer;
  position: absolute;
}
</style>