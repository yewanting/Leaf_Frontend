<template>
  <div id="app">
    <v-tabs fixed-tabs background-color="#028C6A" dark>
        <v-btn class="ma-1" middle color="#7BC5AE" right absolute @click="gotoWorkHome"
          >进入工作区</v-btn
        >
    </v-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    gotoWorkHome(){
      this.$router.push('/WorkHome');
    }
  }
};
</script>
