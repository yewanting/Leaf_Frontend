<template>
  <div>
    <button :style="stylevalue"
    @mouseenter="show_hover"
    @mouseleave="unshow_hover"
    @click="click_btn"
    >{{title}}</button>
  </div>
</template>



<script>
export default {
  data() {
    return {
   
     
    };
  },
  computed:{
  stylevalue(){
        let s =  'height:' +
        this.height +
        'px;' +
        'width:' +
        this.width +
        'px;' +
        'background-color:' +
        this.background_color +
        ';' +
        'border-color:' +
        this.border_color +
        ';' +
        'color:' +
        this.text_color +
        ';' +
        'font-size:' +
        this.text_size +
        'px;' +
        'width:' +
        this.width +
        'px;' +
        'height:' +
        this.height +
        'px;' +
        'line-height:' +
        this.line_height +
        'px;' +
        'border-radius:' +
        this.border_radius +
        'px;'
        return s;
  },
    if_yes(){
       return this.$store.state.if_yes;
     },
     delete_component(){
          return this.$store.state.delete_component;
     }
       
  },
  props: [
    "title",
    "background_color",
    "border_color",
    "text_color",
    "text_size",
    "width",
    "height",
    "line_height",
    "border_radius",
  ],

  created() {
  
  },
  methods: {
      show_hover(){
         this.$el.children[0].style.background = "#e28080"
      },
      unshow_hover(){
          this.$el.children[0].style.background = "#ffffff"
      },
      click_btn(){     
           this.$store.commit("IFYES",this.$el.children[0].innerText);
          if(this.if_yes=="是")
            {
                this.delete_component.parentNode.removeChild(this.delete_component)
                this.$store.commit("CURCOMATTR", {});
            }
           this.$store.commit("IFSHOWYESNO",0);

           
    }
  },
};
</script>


<style scoped>
button:hover{
    cursor: pointer;
    /* color: #e28080; */
}

</style>