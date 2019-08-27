<template>
  <div class="about">

    <h3 class="pl-5 mb-3">{{ $t('PAGE.ABOUT.Title') }}</h3>

    <b-container fluid>
      <el-divider>{{ $t("PAGE.ABOUT.SUBTITLE.Author") }}</el-divider>
      <b-row align-h="center"
             align-v="center">
        <b-col v-for="author in authors"
               :key="author.name"
               md="3"
               class="mb-3">
          <el-card shadow="hover">
            <div slot="header"
                 class="author-card-header">
              <h5 v-if="author.name">{{ author.name }}</h5>
              <el-link v-if="author.mail"
                       :href="`mailto:${author.mail}`"
                       :underline="false">
                <p>{{ author.mail }}</p>
              </el-link>
            </div>
            <div class="bottom author-card-body">
              <el-link v-if="author.github"
                       class="mr-3"
                       target="_blank"
                       :href="author.github"
                       :underline="false">
                <font-awesome-icon size="2x"
                                   fixed-width
                                   :icon="['fab', 'github']"></font-awesome-icon>
              </el-link>
              <el-link v-if="author.linkedin"
                       class="mr-3"
                       target="_blank"
                       :href="author.linkedin"
                       :underline="false">
                <font-awesome-icon size="2x"
                                   fixed-width
                                   :icon="['fab', 'linkedin']"></font-awesome-icon>
              </el-link>
            </div>
          </el-card>
        </b-col>
      </b-row>

      <el-divider>{{ $t("PAGE.ABOUT.SUBTITLE.Tech_Stack") }}</el-divider>
      <b-row align-h="center"
             align-v="center">
        <b-col v-for="tech in techStacks"
               :key="tech.name"
               md="2"
               class="mb-3">
          <a target="_blank"
             :href="tech.link">
            <b-img :src="tech.image"
                   :alt="tech.name"
                   :title="tech.name"
                   class="logo-tech-stack"
                   center
                   fluid></b-img>
          </a>
        </b-col>
      </b-row>

      <el-divider>{{ $t("PAGE.ABOUT.SUBTITLE.Dataset") }}</el-divider>
      <b-row align-h="center"
             align-v="center">
        <b-col md="5"
               class="mb-3">
          <a target="_blank"
             href="http://casas.wsu.edu/">
            <b-img :src="require('@/assets/image/logo/logo-casas.jpg')"
                   alt="CASAS"
                   title="CASAS"
                   class="logo-dataset"
                   center
                   fluid></b-img>
          </a>
        </b-col>
      </b-row>

      <el-divider>{{ $t("PAGE.ABOUT.SUBTITLE.Special_Thank") }}</el-divider>
      <b-row align-h="center"
             align-v="center">
        <b-col md="4"
               class="mb-3">
          <a target="_blank"
             href="https://aiacademy.tw/">
            <b-img :src="require('@/assets/image/logo/logo-aia.png')"
                   alt="Taiwan AI Academy"
                   title="Taiwan AI Academy"
                   class="logo-special-thank"
                   center
                   fluid></b-img>
          </a>
        </b-col>
      </b-row>

      <div class="text-center text-muted font-weight-light mb-3">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik"
           class="text-reset"
           title="Freepik"
           target="_blank">Freepik</a>
        from
        <a href="https://www.flaticon.com/"
           class="text-reset"
           title="Flaticon"
           target="_blank">www.flaticon.com</a>
        is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/"
           class="text-reset"
           title="Creative Commons BY 3.0"
           target="_blank">CC 3.0 BY</a>
      </div>
    </b-container>

  </div>
</template>

<script>
export default {
  name: "About",
  data: function() {
    return {
      authors: [
        {
          name: "Ou, Yi-Jing",
          mail: "oeg8168@gmail.com",
          github: "https://github.com/oeg8168/",
          linkedin: "https://www.linkedin.com/in/yi-jing-ou/"
        },
        {
          name: "Chou, Ting-Yu",
          mail: "asd123975@gmail.com",
          github: "",
          linkedin: ""
        }
      ],

      techStacks: [
        {
          name: "Vue.js",
          image: require("@/assets/image/logo/logo-vue.png"),
          link: "https://vuejs.org/"
        },
        {
          name: "Python",
          image: require("@/assets/image/logo/logo-python.png"),
          link: "https://www.python.org/"
        },
        {
          name: "Flask",
          image: require("@/assets/image/logo/logo-flask.png"),
          link: "https://flask.palletsprojects.com"
        },
        {
          name: "XGBoost",
          image: require("@/assets/image/logo/logo-xgboost.png"),
          link: "https://github.com/dmlc/xgboost"
        },
        {
          name: "App Engine",
          image: require("@/assets/image/logo/logo-app_engine.png"),
          link: "https://cloud.google.com/appengine/"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.author-card {
  &-header {
    min-height: 5rem;
  }

  &-body {
    min-height: 2rem;
  }
}

.logo {
  &-tech-stack {
    max-height: 100px;
  }

  &-special-thank {
    max-height: 200px;
  }
}
</style>
