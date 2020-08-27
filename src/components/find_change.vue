<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">
      <div v-show="k=='text'">
        <span class="chang_title">搜索框的文本：</span>
        <input type="text" :value="v" @change="onChange('text',$event.target.value)" />
      </div>

      <div v-show="k=='border_color'">
        <span class="chang_title">圆弧颜色：</span>
        <input type="color" :value="v" @change="onChange('border_color',$event.target.value)" />
      </div>

      <div v-show="k=='text_color'">
        <span class="chang_title">字体颜色：</span>
        <input type="color" :value="v" @change="onChange('text_color',$event.target.value)" />
      </div>

      <div v-show="k=='text_size'">
        <span class="chang_title">字体大小：</span>
        <input type="text" :value="v" @change="onChange('text_size',$event.target.value)" />
      </div>



      <div v-show="k=='height'">
        <span class="chang_title">搜索框高度：</span>
        <input type="text" :value="v" @change="onChange('height',$event.target.value)" />
      </div>


      <div v-show="k=='width'">
        <span class="chang_title">搜索框宽度：</span>
        <input type="text" :value="v" @change="onChange('width',$event.target.value)" />
      </div>

      <div v-show="k=='border_radius'">
        <span class="chang_title">圆弧大小：</span>
        <input type="text" :value="v" @change="onChange('border_radius',$event.target.value)" />
      </div>

      <div v-show="k=='find_icon_size'">
        <span class="chang_title">搜索图标大小：</span>
        <input type="text" :value="v" @change="onChange('find_icon_size',$event.target.value)" />
      </div>

      <div v-show="k=='big_height'">
        <span class="chang_title">整个框的高度：</span>
        <input type="text" :value="v" @change="onChange('big_height',$event.target.value)" />
      </div>

    
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
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
      // console.log(attr,value)
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