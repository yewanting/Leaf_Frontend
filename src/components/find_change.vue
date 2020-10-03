<template>
  <div>  
    <div v-show="(titleChoice=='组件样式')" class="form_class" >
      <v-row dense>
        <v-col cols="12" sm="5" class="text_form">圆弧颜色:</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.border_color"  @change="onChange('border_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">字体颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.text_color"  @change="onChange('text_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">搜索框的文本:</v-col>
        <v-col cols="12" sm="6"> 
          <v-text-field  dense :value="curComAttr.text" @change="onChange('text',$event)"></v-text-field>
        </v-col>


        <v-col cols="12" sm="5" class="text_form">字体大小：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.text_size" @change="onChange('text_size',$event)"></v-text-field>
        </v-col>

    
        <v-col cols="12" sm="5" class="text_form">搜索框高度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.big_height" @change="onChange('big_height',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">搜索框宽度：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.big_width" @change="onChange('big_width',$event)"></v-text-field>
        </v-col>

         <v-col cols="12" sm="5" class="text_form">圆弧大小：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.border_radius" @change="onChange('border_radius',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">搜索图标大小：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field dense :value="curComAttr.find_icon_size" @change="onChange('find_icon_size',$event)"></v-text-field>
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
        text: "请输入搜索内容",
        border_color: "#b8b5b5",
        text_color: "#000000",
        text_size: "15",
        big_height: "40",
        big_width:"300",
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
      console.log(attr,value)
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
.text_form{
  align-self:center;
}
</style>