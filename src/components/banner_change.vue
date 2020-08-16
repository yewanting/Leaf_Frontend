<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">

      <div v-show="k=='width'">
        <span>轮播图宽度：</span>
        <input type="text" :value="v" @change="onChange('width',$event.target.value)" />
      </div>

      <div v-show="k=='height'">
        <span>轮播图高度：</span>
        <input type="text" :value="v" @change="onChange('height',$event.target.value)" />
      </div>

      <div v-show="k=='border_radius'">
        <span>轮播图圆角：</span>
        <input type="text" :value="v" @change="onChange('border_radius',$event.target.value)" />
      </div>

      <div v-show="k=='banner_seconds'">
        <span>轮播速度(图片停留秒数)：</span>
        <input type="text" :value="v" @change="onChange('banner_seconds',$event.target.value)" />
      </div>


    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      attr: {
        width: "",
        height: "",
        border_radius: "",
        banner_seconds:"",
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
    titleChoice(){
       return this.$store.state.title_choice;
    }
  },

  created() {},
  methods: {
    onChange(attr, value) {
      // console.log(attr,value);
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
.form_class{
  color:rgb(80, 71, 71);
  padding-top: 20px;
  padding-left: 20px;
}
</style>