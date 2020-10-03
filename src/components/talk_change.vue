<template>
  <div>
    
      <div v-show="(titleChoice=='组件样式')" class="form_class" >
      <v-row dense>
        <v-col cols="12" sm="5" class="text_form">语录背景颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.text_background_color"  @change="onChange('text_background_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">语录文字颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.text_color"  @change="onChange('text_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">语录文字大小：</v-col>
        <v-col cols="12" sm="6"> 
          <v-text-field  dense :value="curComAttr.text_font_size" @change="onChange('text_font_size',$event)"></v-text-field>
        </v-col>


        <v-col cols="12" sm="5" class="text_form">语录图片宽度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.course_img_width" @change="onChange('course_img_width',$event)"></v-text-field>
        </v-col>

    
        <v-col cols="12" sm="5" class="text_form">语录图片高度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.course_img_height" @change="onChange('course_img_height',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">语录图片圆角</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.course_img_border_radius" @change="onChange('course_img_border_radius',$event)"></v-text-field>
        </v-col>

      
      </v-row>
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