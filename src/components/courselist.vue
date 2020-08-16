<template>
  <div
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="click_com_change"
    :draggable="true"    
  >
   <div class="signal_course">
       <div class="left">
           <img :src ="course_img" :style="img_form">
       </div>
       <div class="right" :style="'height:'+course_img_height+'px;'">
           <div :style="title_form">{{title}}</div>
           <div :style="descripe_form">{{descripe}}</div>
           <div :style="price_form">
               <span :style="'float:'+price_position+';'">{{price}}</span>
            </div>
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
            title_background_color: "#ffffff",
            title_color:"#000000",
            title_font_size:"20",
            descripe:"",
            descripe_background_color: "#ffffff",
            descripe_color:"#000000",
            descripe_font_size:"15",
            price:"￥"+99,
            price_background_color:"#ffffff",
            price_color:"#123456",
            price_position:"right",
            price_size:"15",
            course_img:"",
            course_img_width:"100",
            course_img_height:"100",
            course_img_border_radius:"0",
      },
     
    };
  },
  computed: {
     img_form(){
         let img_form_s = 'width:'+
         this.course_img_width+'px;'+
         'height:'+
         this.course_img_height+'px;'+
         'border-radius:'+
         this.course_img_border_radius+'px;'
         
         return img_form_s;
     },
     title_form(){
         let title_form_s = 'background-color:'+
         this.title_background_color+';'+
         'font-size:'+
         this.title_font_size+'px;'+
         'color:'+
         this.title_color+';'
        
         return title_form_s;
     },

     descripe_form(){
        let descripe_form_s = 'background-color:'+
         this.descripe_background_color+';'+
         'font-size:'+
         this.descripe_font_size+'px;'+
         'color:'+
         this.descripe_color+';'

         return descripe_form_s;
     },
     price_form(){
        let price_form_s = 'background-color:'+
         this.price_background_color+';'+
         'font-size:'+
         this.price_size+'px;'+
         'color:'+
         this.price_color+';'+
         'float:'+
         this.price_position+';'
        
        //  console.log(price_form_s);
         return price_form_s;
     }
  },
  props: [
    "index",
    "title",
    "title_background_color",
    "title_color",
    "title_font_size",
    "descripe",
    "descripe_background_color",
    "descripe_color",
    "descripe_font_size",
    "price",
    "price_background_color",
    "price_position",
    "price_color",
    "price_size",
    "course_img",
    "course_img_width",
    "course_img_height",
    "course_img_border_radius"
  ],

  created() {
    console.log("成功创建一个课程列表");

  },
  methods: {

    click_com_change() {
      this.attr.title = this.title;
      this.attr.title_background_color = this.title_background_color;
      this.attr.title_color = this.title_color;
      this.attr.title_font_size = this.title_font_size;
      this.attr.descripe = this.descripe;
      this.attr.descripe_background_color = this.descripe_background_color;
      this.attr.descripe_color = this.descripe_color;
      this.attr.descripe_font_size = this.descripe_font_size;
      this.attr.price = this.price;
      this.attr.price_background_color = this.price_background_color;
      this.attr.price_color = this.price_color;
      this.attr.price_position = this.price_position;
      this.attr.price_size = this.price_size;
      this.attr.course_img = this.course_img;
      this.attr.course_img_width = this.course_img_width;
      this.attr.course_img_height = this.course_img_height;
      this.attr.course_img_border_radius = this.course_img_border_radius;


      this.$store.commit("CURCOMTYPE", "courselist");
      this.$store.commit("CURCOMATTR", this.attr);
      this.$store.commit("CURCOMID", this.index);
    },
    onDragStart(event) {
      var e = event || window.event;
      // console.log(e.target.parentNode)
      this.$store.commit(
        "CURRENTELEM",
        e.target.parentNode
      );
    },
    onDragOver(event) {
      var event = event || window.event;
      event.preventDefault();
    },
    onDrop(event) {
      var e = event || window.event;

      var curNode = this.$store.state.currentElem;
      var targetNode = this.$el.parentNode;
      var parentnode = curNode.parentNode;

      parentnode.insertBefore(curNode, targetNode);
    },
  },
};
</script> 


<style scoped>
.left{
    float: left;
    box-shadow: 0px 10px 30px #fae3e3;
}
.signal_course{
    padding-bottom:5px;
    border-bottom: 1px solid rgb(240, 221, 221);
}

</style>