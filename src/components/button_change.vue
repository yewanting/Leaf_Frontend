<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k">
      <div v-show="k=='title'">
        <span>按钮文本：</span>
        <input type="text" :value="v" @change="onChange('title',$event.target.value)" />
      </div>

      <input
        v-show="k=='background_color'"
        type="color"
        :value="v"
        @change="onChange('background_color',$event.target.value)"
      />
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      attr: {
        title: "",
        background_color: "",
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
  },

  created() {},
  methods: {
    onChange(attr, value) {
      console.log(attr, value);
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
</style>