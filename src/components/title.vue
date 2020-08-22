<template>
    <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    @mouseenter="show_border"
    @mouseleave="unshow_border"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    :draggable="true"    
    class="title_total" 
    :style="'text-align:'+this.position+';margin-top:'+this.margin_top+'px;'"
    >
    <i class="iconfont icon-jurassic_gongbao" v-if="is_show==true"></i>
    <i class="iconfont icon-chahao" v-if="is_show==true" @click="remove_component"></i>
        <span :style="content_form">{{content}}</span>
    </div>
</template>


<script>
export default {
    data(){
        return {
            attr:{
                "content":"标题文本",
                "background_color":"#ffffff",
                "color":"#000000",
                "font_size":"18",
                "position":"",
                "margin_top":"0",
            },
            is_show:false
        }
    },
    props:[
        "index",
        "content",
        "background_color",
        "color",
        "font_size",
        "position",
        "margin_top",
    ],
    computed:{
        content_form(){
            let content_form_s = 'background-color:'+this.background_color+';'+
            'color:'+this.color+';'+'font-size:'+this.font_size+'px;';

            return content_form_s;
        },
        cur_move_id() {
        return this.$store.state.cur_move_id;
      },
      curComList() {
        return this.$store.state.cur_com_list;
      },
      curComAttr() {
        return this.$store.state.cur_com_attr;
      },
    },
    methods: {
    click_com_change() {
      this.attr.content = this.content;
      this.attr.background_color = this.background_color;
      this.attr.color = this.color;
      this.attr.font_size = this.font_size;
     

      this.$store.commit("CURCOMTYPE", "title");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      this.$store.commit(
        "CURRENTELEM",
        e.target.parentNode
      );
      this.$store.commit("CURMOVEID", this.index);
    },
    onDragOver(event) {
      var event = event || window.event;
      event.preventDefault();
    },
      onDragEnter(event) {
      var event = event || window.event;
      this.lastenter = event.target;
      if (this.index != this.cur_move_id) {
        // console.log("进入的区域",this.lastenter);
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 30;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 30;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
    },
    onDragLeave(event) {
      var event = event || window.event;
      if (this.index != this.cur_move_id && this.lastenter == event.target) {
        // console.log("离开的区域",event.target)
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 0;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 0;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
    },
    onDrop(event) {
      var e = event || window.event;

      var curNode = this.$store.state.currentElem;
      var targetNode = this.$el.parentNode;
      var parentnode = curNode.parentNode;

      let tmp = parentnode.insertBefore(curNode, targetNode);
      if (typeof tmp == "object") {
        var curlist = this.curComList;

        curlist[this.index]["attr"]["margin_top"] = 0;
        var curattr = this.curComAttr;
        curattr["margin_top"] = 0;

        this.$store.commit("CURCOMATTR", curattr);
        this.$store.commit("CURCOMLIST", curlist);
      }
    },
    show_border(){
        this.$el.style.border  = "1px dotted rgb(241, 15, 15)"
        this.$el.style.cursor = "move";
        this.is_show = true;
   },
    unshow_border(){
        this.$el.style.border = "none";
        this.$el.style.cursor = "none";
        this.is_show = false;
    },
    remove_component(){
        this.$store.commit("IFSHOWYESNO",1)
        this.$store.commit("DELETECOMPONENT",this.$el)
    }
  },
}
</script>


<style scoped>



</style>