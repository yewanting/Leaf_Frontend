<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer color="#028C6A" dark app>
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="../../static/images/logo.jpg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>竹子姐姐</v-list-item-title>
              <v-list-item-subtitle>产品设计，不止于快</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="navChoice(item.title)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-container fluid>
        <v-row
          align="center"
          id="newProjectView"
          v-if="newProject == '新建项目'"
        >
          <v-col
            cols="12"
            sm="12"
            class="ma-8"
            style="color: #028c6a; font-size: 30px"
          >
            新建项目
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              label="项目名称"
              outlined
              v-model="projectName"
            ></v-text-field>
          </v-col>
          <v-col v-for="(card, index) in cards" :key="index" :cols="card.flex">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 6 : 2"
                hover
                @click="choose_model(index)"
                :class="index == default_select ? 'activeModel_form' : ''"
              >
                <center>
                  <v-card-text>
                    <v-icon
                      v-text="card.icon"
                      x-large
                      color="#028C6A"
                      class="ma-15"
                    ></v-icon>
                  </v-card-text>
                  <v-card-text style="color: #028c6a">{{
                    card.title
                  }}</v-card-text>
                </center>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              :items="detail_model"
              :label="model"
              outlined
              v-model="final_model"
              @change="choose_resolution"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select
              :items="detail_resolution"
              label="分辨率"
              outlined
              v-model="final_resolution"
              @click="choose_resolution"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12">
            <v-btn
              color="#028c6a"
              dark
              width="100%"
              height="50px"
              @click="gotoDesign"
              >创建项目</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-if="dialog == true" v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">请输入项目名称！</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              好的
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "全部项目", icon: "mdi-view-dashboard" },
        { title: "新建项目", icon: "mdi-widgets" },
      ],
      cards: [
        { title: "手机", flex: 4, icon: "mdi-cellphone" },
        { title: "电脑", flex: 4, icon: "mdi-laptop" },
        { title: "平板", flex: 4, icon: "mdi-tablet" },
      ],
      all_model: [["iPhone", "Android"], ["网页"], ["iPad", "iPad Pro"]],
      detail_model: ["iPhone", "Android"],
      all_resolution: {
        iPhone: [
          "iPhone 11 Pro Max/11(414×896)",
          "iPhone 11 Pro/X(375×896)",
          "iPhone 6/7/8 Plus(414×736)",
          "iPhone 6/7/8(375×667)",
          "iPhone 5/SE(320×667)",
        ],
        Android: [
          "Google Pixel 2 XL(411×823)",
          "Google Pixel 2(411×731)",
          "Google Nexus 5(360×640)",
          "Samsung S7(360×640)",
          "Xiaomi 6(360×640)",
          "Huawei P8(360×640)",
        ],
        网页: ["网页(1440×1024)"],
        iPad: ["iPad(768×1024)"],
        "iPad Pro": ["iPad Pro(1024×1366)"],
      },
      detail_resolution: [
        "iPhone 11 Pro Max/11(414×896)",
        "iPhone 11 Pro/X(375×896)",
        "iPhone 6/7/8 Plus(414×736)",
        "iPhone 6/7/8(375×667)",
        "iPhone 5/SE(320×667)",
      ],
      default_select: 0,
      background: false,
      model: "手机",
      final_model: "iPhone",
      final_resolution: "iPhone 11 Pro Max/11(414×896)",
      projectName: "",
      newProject: "我的项目",
      dialog: false,
    };
  },
  methods: {
    choose_model(index) {
      this.default_select = index;
      this.model = this.cards[index].title;
      this.detail_model = [];

      for (let i = 0; i < this.all_model[index].length; i++) {
        this.detail_model.push(this.all_model[index][i]);
      }
      this.final_model = this.detail_model[0];
      this.choose_resolution();
    },
    choose_resolution() {
      this.detail_resolution = [];
      for (let i = 0; i < this.all_resolution[this.final_model].length; i++) {
        this.detail_resolution.push(this.all_resolution[this.final_model][i]);
      }
      this.final_resolution = this.detail_resolution[0];
    },
    navChoice(value) {
      this.newProject = value;
    },
    gotoDesign() {
      if (this.projectName != "") {
        this.$router.push('/home')
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>

<style scoped>
.activeModel_form {
  border: 1px solid#028C6A;
}
.unactiveModel_form {
  border: none;
}
</style>

