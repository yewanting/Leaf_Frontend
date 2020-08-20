<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">

      <div v-show="k=='border_color'">
        <span>分割线颜色：</span>
        <input type="color" :value="v" @change="onChange('border_color',$event.target.value)" />
      </div>

      <div v-show="k=='border_wide'">
        <span>分割线粗度：</span>
        <input type="text" :value="v" @change="onChange('border_wide',$event.target.value)" />
      </div>

     <div v-if="k=='border_form'">
        <span>分割线样式：</span>
        实线：
        <input
          type="radio"
          checked
          value="solid"
          name="border"
          @change="onChange('border_form',$event.target.value)"
        />
        虚线：
        <input
          type="radio"
          value="dotted"
          name="border"
          @change="onChange('border_form',$event.target.value)"
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