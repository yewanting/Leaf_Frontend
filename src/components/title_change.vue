<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">
      <div v-if="k=='position'">
        <span class="chang_title">标题文本位置：</span>
        居左：
        <input
          type="radio"
          checked
          value="left"
          name="title_position"
          @change="onChange('position',$event.target.value)"
        />
        居中：
        <input
          type="radio"
          value="center"
          name="title_position"
          @change="onChange('position',$event.target.value)"
        />
        居右：
        <input
          type="radio"
          value="right"
          name="title_position"
          @change="onChange('position',$event.target.value)"
        />
      </div>

      <div v-show="k=='content'">
        <span class="chang_title">标题文本：</span>
        <input type="text" :value="v" @change="onChange('content',$event.target.value)" />
      </div>

      <div v-show="k=='background_color'">
        <span class="chang_title">标题背景颜色：</span>
        <input type="color" :value="v" @change="onChange('background_color',$event.target.value)" />
      </div>

      <div v-show="k=='color'">
        <span class="chang_title">标题字体颜色：</span>
        <input type="color" :value="v" @change="onChange('color',$event.target.value)" />
      </div>

      <div v-show="k=='font_size'">
        <span class="chang_title">标题字体大小：</span>
        <input type="text" :value="v" @change="onChange('font_size',$event.target.value)" />
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