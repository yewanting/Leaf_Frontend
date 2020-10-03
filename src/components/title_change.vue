<template>
  <div>
     <div v-show="(titleChoice=='组件样式')" class="form_class" >
      <v-row dense>
        <v-col cols="12" sm="5" class="text_form">标题背景颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.background_color"  @change="onChange('background_color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="text_form">标题字体颜色：</v-col>
         <v-col cols="12" sm="6"> 
           <input type="color" :value="curComAttr.color"  @change="onChange('color',$event.target.value)" />
        </v-col>

        <v-col cols="12" sm="5" class="content">标题文本：</v-col>
        <v-col cols="12" sm="6"> 
          <v-text-field  dense :value="curComAttr.content" @change="onChange('content',$event)"></v-text-field>
        </v-col>


        <v-col cols="12" sm="5" class="text_form">标题字体大小：</v-col>
         <v-col cols="12" sm="6"> 
           <v-text-field  dense :value="curComAttr.font_size" @change="onChange('font_size',$event)"></v-text-field>
        </v-col>

        <v-col cols="12" sm="5" class="text_form">标题文本位置：</v-col>
         <v-col cols="12" sm="6"> 
           <v-radio-group v-model="radios">
             <v-radio label="居左" value="left" name="title_position" @change="onChange('position','left')"></v-radio>
             <v-radio label="居中" value="center" name="title_position" @change="onChange('position','center')"></v-radio>
             <v-radio label="居右" value="right" name="title_position" @change="onChange('position','right')"></v-radio>
           </v-radio-group>
        </v-col>
      </v-row>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      radios:"center"
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
.text_form{
  align-self:center;
}
</style>