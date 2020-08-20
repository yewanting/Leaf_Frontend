<template>
  <div>
    <div v-for="(v,k) in curComAttr" :key="k" class="form_class" v-show="(titleChoice=='组件样式')">

      <div v-show="k=='title'">
        <span>按钮文本：</span>
        <input type="text" :value="v" @change="onChange('title',$event.target.value)" />
      </div>

      <div v-show="k=='background_color'">
        <span>按钮背景颜色：</span>
        <input type="color" :value="v" @change="onChange('background_color',$event.target.value)" />
      </div>

      <div v-show="k=='border_color'">
        <span>按钮边框颜色：</span>
        <input type="color" :value="v" @change="onChange('border_color',$event.target.value)" />
      </div>

      <div v-show="k=='text_color'">
        <span>文字颜色：</span>
        <input type="color" :value="v" @change="onChange('text_color',$event.target.value)" />
      </div>

      <div v-show="k=='text_size'">
        <span>文字大小：</span>
        <input type="text" :value="v" @change="onChange('text_size',$event.target.value)" />
      </div>

      <div v-show="k=='width'">
        <span>按钮宽度：</span>
        <input type="text" :value="v" @change="onChange('width',$event.target.value)" />
      </div>

      <div v-show="k=='height'">
        <span>按钮高度：</span>
        <input type="text" :value="v" @change="onChange('height',$event.target.value)" />
      </div>

      <div v-show="k=='line_height'">
        <span>按钮行高：</span>
        <input type="text" :value="v" @change="onChange('line_height',$event.target.value)" />
      </div>

      <div v-show="k=='border_radius'">
        <span>按钮圆角：</span>
        <input type="text" :value="v" @change="onChange('border_radius',$event.target.value)" />
      </div>

      <div v-show="k=='padding_top'">
        <span>上内边距：</span>
        <input type="text" :value="v" @change="onChange('padding_top',$event.target.value)" />
      </div>

      <div v-show="k=='padding_left'">
        <span>左内边距：</span>
        <input type="text" :value="v" @change="onChange('padding_left',$event.target.value)" />
      </div>
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
        border_color: "",
        text_color: "",
        text_size: "",
        width: "",
        height: "",
        line_height: "",
        border_radius: "",
        padding_top: "",
        padding_left: "",
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