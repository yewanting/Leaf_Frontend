<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">
      <div v-show="k=='title'">
        <span>课程标题：</span>
        <input type="text" :value="v" @change="onChange('title',$event.target.value)" />
      </div>

      <div v-show="k=='title_background_color'">
        <span>课程标题背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('title_background_color',$event.target.value)"
        />
      </div>

      <div v-show="k=='title_color'">
        <span>课程标题文字颜色：</span>
        <input type="color" :value="v" @change="onChange('title_color',$event.target.value)" />
      </div>

      <div v-show="k=='title_font_size'">
        <span>课程标题文字大小：</span>
        <input type="text" :value="v" @change="onChange('title_font_size',$event.target.value)" />
      </div>

      <div v-show="k=='descripe'">
        <span>课程简介：</span>
        <input type="text" :value="v" @change="onChange('descripe',$event.target.value)" />
      </div>

      <div v-show="k=='descripe_background_color'">
        <span>课程简介背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('descripe_background_color',$event.target.value)"
        />
      </div>

      <div v-show="k=='descripe_color'">
        <span>课程简介文字颜色：</span>
        <input type="color" :value="v" @change="onChange('descripe_color',$event.target.value)" />
      </div>

      <div v-show="k=='descripe_font_size'">
        <span>课程简介文字大小：</span>
        <input type="text" :value="v" @change="onChange('descripe_font_size',$event.target.value)" />
      </div>

      <div v-show="k=='price'">
        <span>课程价格：</span>
        <input type="text" :value="v" @change="onChange('price',$event.target.value)" />
      </div>

      <div v-show="k=='price_background_color'">
        <span>课程价格背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('price_background_color',$event.target.value)"
        />
      </div>

      <div v-show="k=='price_position'">
        <span>课程价格位置：</span>
        居左：
        <input
          type="radio"
          value="left"
          name="price_position"
          @change="onChange('price_position',$event.target.value)"
        />
        居右：
        <input
          type="radio"
          value="right"
          name="price_position"
          @change="onChange('price_position',$event.target.value)"
        />
        <!-- <input type="text" :value="v" @change="onChange('price_position',$event.target.value)" /> -->
      </div>

      <div v-show="k=='price_color'">
        <span>课程价格文字颜色：</span>
        <input type="color" :value="v" @change="onChange('price_color',$event.target.value)" />
      </div>

      <div v-show="k=='price_size'">
        <span>课程价格文字大小：</span>
        <input type="text" :value="v" @change="onChange('price_size',$event.target.value)" />
      </div>

      <!-- 课程图片来源，还未定义 -->

      <div v-show="k=='course_img_width'">
        <span>课程图片宽度：</span>
        <input type="text" :value="v" @change="onChange('course_img_width',$event.target.value)" />
      </div>

      <div v-show="k=='course_img_height'">
        <span>课程图片高度：</span>
        <input type="text" :value="v" @change="onChange('course_img_height',$event.target.value)" />
      </div>

      <div v-show="k=='course_img_border_radius'">
        <span>课程图片圆角：</span>
        <input
          type="text"
          :value="v"
          @change="onChange('course_img_border_radius',$event.target.value)"
        />
      </div>

      <!-- 添加新课程 -->
    </div>
    <div class="add" @click="add_course">
        <i class = "iconfont icon-jiahao"></i>
        <span>添加新课程</span>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      attr: {
        title: "",
        title_background_color: "#ffffff",
        title_color: "#000000",
        title_font_size: "20",
        descripe: "",
        descripe_background_color: "#ffffff",
        descripe_color: "#000000",
        descripe_font_size: "15",
        price: "￥" + 99,
        price_background_color: "#ffffff",
        price_position: "",
        price_color: "#123456",
        price_size: "15",
        course_img: "",
        course_img_width: "100",
        course_img_height: "100",
        course_img_border_radius: "0",
      },
    };
  },
  computed: {
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
    titleChoice() {
      return this.$store.state.title_choice;
    },
  },

  created() {},
  methods: {
    onChange(attr, value) {
      var curlist = this.curComList;

      curlist[this.curComID]["attr"][attr] = value;
      var curattr = this.curComAttr;
      curattr[attr] = value;

      this.$store.commit("CURCOMATTR", curattr);
      this.$store.commit("CURCOMLIST", curlist);
    },
    add_course() {
      console.log(this.curComID);
      let tmp_list = this.curComList;
      for (let i = tmp_list.length - 1; i >= 0; i--) {
        tmp_list[i + 1] = tmp_list[i];
      }
      tmp_list[0] = {
        type: "courselist",
        attr: {
          title: "课程",
          title_background_color: "#ffffff",
          title_color: "#666666",
          title_font_size: "20",
          descripe: "课程简介",
          descripe_background_color: "#ffffff",
          descripe_color: "#000000",
          descripe_font_size: "15",
          price: "￥" + 99,
          price_position: "right",
          price_background_color: "#ffffff",
          price_color: "#123456",
          price_size: "15",
          course_img: "../../static/images/1.jpg",
          course_img_width: "100",
          course_img_height: "100",
          course_img_border_radius: "0",
        },
      };
      // for (let i = 0; i < tmp_list.length; i++) {
      //   console.log(tmp_list[i]);
      // }

      //  该方法无法实时刷新，强制刷新也无效，待解决
      // 触发home则刷新
      this.$store.commit("CURCOMLIST", tmp_list);
      // console.log("子组件",this)
      //待解决
      this.$forceUpdate();
      // console.log(this.$el.parentNode)
    },
  },
};
</script>


<style scoped>
.form_class,
.add {
  color: rgb(80, 71, 71);
  padding-top: 20px;
  padding-left: 20px;
}
.add:hover {
  cursor: pointer;
}
</style>