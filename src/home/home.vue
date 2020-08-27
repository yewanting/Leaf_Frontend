<template>
  <div class="home_total">
    <header>
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
              @click="choose_component(component_item.content)"
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
      <article :style="is_show_phone==true?phone_form:''">
        <div class="main_view_mid" id="mainview">
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
      </article>
      <aside>
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
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-shipin",
          content: "视频",
          imgsrc: [
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-Z-fenleidaohang",
          content: "分类导航",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-sousuo",
          content: "搜索",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-dizhi",
          content: "地址",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-tongzhi",
          content: "通知公告",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-biaoti",
          content: "标题",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-tupian",
          content: "图片",
          imgsrc: [
           {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-chuangkouwindow33",
          content: "橱窗",
          imgsrc: [
           {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-anniu",
          content: "按钮",
          imgsrc: [
           {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-fengexian",
          content: "分割线",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-tuwenliebiao",
          content: "图文列表",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-zhongdianguanggaowei",
          content: "广告位",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "课程列表",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "经典语录",
          imgsrc: [
           {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "推荐列表",
          imgsrc: [
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
        {
          icon_class: "icon-liebiao",
          content: "讲师列表",
          imgsrc: [
           {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图1"
            },
             {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图2"
            },
            {
              "src":"../../static/images/left/lunbo2.png",
              "title":"轮播图3"
            },
          ],
        },
      ],
      titlelist: ["组件样式", "组件配置"],
      img_sz: [],
      mp: "",
      is_show_phone: true,
      is_show_xiaoxi: false,
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
    phone_form() {
      return 'background-image:  url("../../static/images/shouji_background.png");background-size: 520px 1000px; background-repeat: no-repeat;background-position-x: center;';
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
    this.mp = new Map();
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
            margin_top: "0",
          },
        });
      }

      if (component == "按钮") {
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
            margin_top: "0",
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

      if (component == "标题") {
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

      if (component == "分割线") {
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
    get_code() {
      var curs =
        '<head><link rel="stylesheet" type="text/css" href="index.css">' +
        '<link rel="stylesheet" type="text/css" href="iconfont/iconfont.css">' +
        '<meta charset = "utf-8"></head>';
      curs += document.querySelector("#mainview").outerHTML;
      return curs.replace(/..\/..\/static\//g, "");
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
      main_view.style.width = "450px";
      main_view.style.height = "750px";
      this.is_show_phone = true;
    },
    show_nav() {
      document.querySelector("#nav_block").style.left = "28px";
    },
    unshow_nav() {
      document.querySelector("#nav_block").style.left = "-100%";
    },
    get_left(event,src) {
      document.querySelector("#toast_kuang").style.left =
        event.getBoundingClientRect().right + "px";
      document.querySelector("#toast_kuang").style.top =
        event.getBoundingClientRect().top - 80 + "px";
      this.is_show_xiaoxi = true;
       document.querySelector("#toast_kuang").style.backgroundImage =  'url("'+src+'")';
    },
    unshow_getleft() {
      this.is_show_xiaoxi = false;
    },
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
.icon-kuang2{
  position: absolute;
  font-size: 300px;
  color: #9c9797;
  z-index: 100;
  background-size: 90% 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../../static/images/left/lunbo2.png");
}
</style>