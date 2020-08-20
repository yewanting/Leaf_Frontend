<template>
  <div>
    <div class="form_class">
      <span>列表样式：</span>
      <input type="radio" name="form" value="小图" @click="choose_form('小图')" /> 小图
      <input type="radio" name="form" value="详细列表"  checked @click="choose_form('详细列表')" /> 详细列表
      <input type="radio" name="form" value="大图" @click="choose_form('大图')" /> 大图
      <input type="radio" name="form" value="横向滑动" @click="choose_form('横向滑动')" /> 横向滑动
    </div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">

      <div v-if="k=='title_background_color'">
        <span>课程标题背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('title_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='title_color'">
        <span>课程标题文字颜色：</span>
        <input type="color" :value="v" @change="onChange('title_color',$event.target.value)" />
      </div>

      <div v-if="k=='title_font_size'">
        <span>课程标题文字大小：</span>
        <input type="text" :value="v" @change="onChange('title_font_size',$event.target.value)" />
      </div>

      <div v-if="k=='descripe'">
        <span>课程简介：</span>
        <input type="text" :value="v" @change="onChange('descripe',$event.target.value)" />
      </div>

      <div v-if="k=='descripe_background_color'">
        <span>课程简介背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('descripe_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='descripe_color'">
        <span>课程简介文字颜色：</span>
        <input type="color" :value="v" @change="onChange('descripe_color',$event.target.value)" />
      </div>

      <div v-if="k=='descripe_font_size'">
        <span>课程简介文字大小：</span>
        <input type="text" :value="v" @change="onChange('descripe_font_size',$event.target.value)" />
      </div>

      <div v-if="k=='label_background_color'">
        <span>课程标签背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('label_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='label_color'">
        <span>课程标签文字颜色：</span>
        <input type="color" :value="v" @change="onChange('label_color',$event.target.value)" />
      </div>

      <div v-if="k=='label_font_size'">
        <span>课程标签文字大小：</span>
        <input type="text" :value="v" @change="onChange('label_font_size',$event.target.value)" />
      </div>

      <div v-if="k=='price'">
        <span>课程价格：</span>
        <input type="text" :value="v" @change="onChange('price',$event.target.value)" />
      </div>

      <div v-if="k=='price_background_color'">
        <span>课程价格背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('price_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='price_position'">
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
          checked
          type="radio"
          value="right"
          name="price_position"
          @change="onChange('price_position',$event.target.value)"
        />
      </div>

      <div v-if="k=='price_color'">
        <span>课程价格文字颜色：</span>
        <input type="color" :value="v" @change="onChange('price_color',$event.target.value)" />
      </div>

      <div v-if="k=='price_size'">
        <span>课程价格文字大小：</span>
        <input type="text" :value="v" @change="onChange('price_size',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_width'">
        <span>课程图片宽度：</span>
        <input type="text" :value="v" @change="onChange('course_img_width',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_height'">
        <span>课程图片高度：</span>
        <input type="text" :value="v" @change="onChange('course_img_height',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_border_radius'">
        <span>课程图片圆角：</span>
        <input
          type="text"
          :value="v"
          @change="onChange('course_img_border_radius',$event.target.value)"
        />
      </div>
    </div>
    <!-- <div class="add" @click="add_course">
      <i class="iconfont icon-jiahao"></i>
      <span>添加新课程</span>
    </div>-->
  </div>
</template>



<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    curComList() {
      return this.$store.state.cur_com_list;
    },
    curComType() {
      return this.$store.state.cur_com_type;
    },
    courseForm(){
      return this.$store.state.course_form;
    },
    curComAttr() {
      // let attr = this.$store.state.cur_com_attr;
      // let cur_attr = {};
      // if (this.courseForm != "详细列表") {
      //   cur_attr.title_background_color = attr.title_background_color;
      //   cur_attr.title_color = attr.title_color;
      //   cur_attr.title_font_size = attr.title_font_size;
      //   cur_attr.price_background_color = attr.price_background_color;
      //   cur_attr.price_color = attr.price_color;
      //   cur_attr.price_size = attr.price_size;
      // } else {
      //   cur_attr.title_background_color = attr.title_background_color;
      //   cur_attr.title_color = attr.title_color;
      //   cur_attr.title_font_size = attr.title_font_size;
      //   cur_attr.descripe_background_color = "#ffffff";
      //   cur_attr.descripe_color = "#a89e9e";
      //   cur_attr.descripe_font_size = "15";
      //   cur_attr.label_background_color = "#f8c9c9";
      //   cur_attr.label_color = "#ffffff";
      //   cur_attr.label_font_size = "16";
      //   cur_attr.price_background_color = attr.price_background_color;
      //   cur_attr.price_color = attr.price_color;
      //   cur_attr.price_size = attr.price_size;
      //   cur_attr.course_img_width = attr.course_img_width;
      //   cur_attr.course_img_height = attr.course_img_height;
      //   cur_attr.course_img_border_radius = attr.course_img_border_radius;
      // }
      // this.$store.commit("CURCOMATTR", cur_attr);

      // return cur_attr;

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
    choose_form(value) {
      this.$store.commit("COURSERFORM",value)
    },
    add_course() {
      var curlist = this.curComList;
      curlist[this.curComID]["content"].push({
        title: "课程标题",
        descripe: "课程简介",
        price: "￥" + 99,
        lable: "课程标签",
        course_img: "../../static/images/good_pic.png",
      }),
        this.$store.commit("CURCOMLIST", curlist);
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