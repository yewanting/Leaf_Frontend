<template>
  <div>
      <div v-show="(titleChoice=='组件样式')" class="form_class" >
      <v-row dense>
        <v-col cols="12" sm="5" class="text_form">按钮背景颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.background_color"  @change="onChange('background_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">按钮边框颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.border_color"  @change="onChange('border_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">文字颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.text_color"  @change="onChange('text_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">按钮文本：</v-col>
        <v-col cols="12" sm="6"> 
          <v-text-field  dense :value="curComAttr.title" @change="onChange('title',$event)"></v-text-field>
        </v-col>


        <v-col cols="12" sm="5" class="text_form">字体大小：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.text_size" @change="onChange('text_size',$event)"></v-text-field>
        </v-col>

    
        <v-col cols="12" sm="5" class="text_form">按钮宽度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.width" @change="onChange('width',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">按钮高度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.height" @change="onChange('height',$event)"></v-text-field>
        </v-col>

         <v-col cols="12" sm="5" class="text_form">按钮行高：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.line_height" @change="onChange('line_height',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">按钮圆角：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.border_radius" @change="onChange('border_radius',$event)"></v-text-field>
        </v-col>

         <v-col cols="12" sm="5" class="text_form">上内边距：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.padding_top" @change="onChange('padding_top',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">左内边距：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.padding_left" @change="onChange('padding_left',$event)"></v-text-field>
        </v-col>
      </v-row>
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
      console.log(attr,value);
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
.form_class .chang_title{
  display: inline-block;
  width: 130px;
}
.text_form{
  align-self:center;
}
</style>