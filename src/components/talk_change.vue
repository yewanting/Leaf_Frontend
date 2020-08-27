<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">
      <div v-if="k=='text_background_color'">
        <span class="chang_title">语录背景颜色：</span>
        <input
          type="color"
          :value="v"
          @change="onChange('text_background_color',$event.target.value)"
        />
      </div>

      <div v-if="k=='text_color'">
        <span class="chang_title">语录文字颜色：</span>
        <input type="color" :value="v" @change="onChange('text_color',$event.target.value)" />
      </div>

      <div v-if="k=='text_font_size'">
        <span class="chang_title">语录文字大小：</span>
        <input type="text" :value="v" @change="onChange('text_font_size',$event.target.value)" />
      </div>


      <div v-if="k=='course_img_width'">
        <span class="chang_title">语录图片宽度：</span>
        <input type="text" :value="v" @change="onChange('course_img_width',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_height'">
        <span class="chang_title">语录图片高度：</span>
        <input type="text" :value="v" @change="onChange('course_img_height',$event.target.value)" />
      </div>

      <div v-if="k=='course_img_border_radius'">
        <span class="chang_title">语录图片圆角：</span>
        <input
          type="text"
          :value="v"
          @change="onChange('course_img_border_radius',$event.target.value)"
        />
      </div>
    </div>
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
  
  },
};
</script>


<style scoped>
.form_class {
  color: rgb(80, 71, 71);
  padding-top: 20px;
  padding-left: 20px;
}
.form_class .chang_title{
  display: inline-block;
  width: 130px;
}
</style>