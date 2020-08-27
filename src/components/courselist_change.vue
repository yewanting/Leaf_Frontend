<template>
  <div>
    <div class="form_class" v-show="(titleChoice=='组件样式')">
      <span>列表样式：</span>
      <input type="radio" name="form" value="小图" @click="choose_form('小图')" /> 小图
      <input type="radio" name="form" value="详细列表"  checked @click="choose_form('详细列表')" /> 详细列表
      <input type="radio" name="form" value="大图" @click="choose_form('大图')" /> 大图
      <input type="radio" name="form" value="横向滑动" @click="choose_form('横向滑动')" /> 横向滑动
    </div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">

      <div v-if="k=='title_background_color'">
        <span class="chang_title">标题背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('title_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='title_color'">
        <span class="chang_title">标题文字颜色：</span>
        <input type="color" :value="v" @change="onChange('title_color',$event.target.value)" />
      </div>

      <div v-if="k=='title_font_size'">
        <span class="chang_title">标题文字大小：</span>
        <input type="text" :value="v" @change="onChange('title_font_size',$event.target.value)" />
      </div>

      <div v-if="k=='descripe'">
        <span class="chang_title">简介：</span>
        <input type="text" :value="v" @change="onChange('descripe',$event.target.value)" />
      </div>

      <div v-if="k=='descripe_background_color'">
        <span class="chang_title">简介背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('descripe_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='descripe_color'">
        <span class="chang_title">简介文字颜色：</span>
        <input type="color" :value="v" @change="onChange('descripe_color',$event.target.value)" />
      </div>

      <div v-if="k=='descripe_font_size'">
        <span class="chang_title">简介文字大小：</span>
        <input type="text" :value="v" @change="onChange('descripe_font_size',$event.target.value)" />
      </div>

      <div v-if="k=='label_background_color'">
        <span class="chang_title">标签背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('label_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='label_color'">
        <span class="chang_title">标签文字颜色：</span>
        <input type="color" :value="v" @change="onChange('label_color',$event.target.value)" />
      </div>

      <div v-if="k=='label_font_size'">
        <span class="chang_title">标签文字大小：</span>
        <input type="text" :value="v" @change="onChange('label_font_size',$event.target.value)" />
      </div>


      <div v-if="k=='price_background_color'">
        <span class="chang_title">价格背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('price_background_color',$event.target.value)"
        />
      </div>
      <div v-if="k=='price_color'">
        <span class="chang_title">价格文字颜色：</span>
        <input type="color" :value="v" @change="onChange('price_color',$event.target.value)" />
      </div>

      <div v-if="k=='price_size'">
        <span class="chang_title">价格文字大小：</span>
        <input type="text" :value="v" @change="onChange('price_size',$event.target.value)" />
      </div>
      <div v-if="k=='price_position'">
        <span class="chang_title">价格位置：</span>
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



      <div v-if="k=='course_img_width'">
        <span class="chang_title">图片宽度：</span>
        <input type="text" :value="v" @change="onChange('course_img_width',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_height'">
        <span class="chang_title">图片高度：</span>
        <input type="text" :value="v" @change="onChange('course_img_height',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_border_radius'">
        <span class="chang_title">图片圆角：</span>
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
.form_class .chang_title{
  display: inline-block;
  width: 130px;
}
</style>