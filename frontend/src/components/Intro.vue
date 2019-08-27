<template>
  <div class="intro">

    <h3 class="pl-5 mb-3">{{ $t('PAGE.INTRO.Title') }}</h3>

    <b-container fluid>
      <b-row align-h="center"
             align-v="center">
        <b-col md="3">
          <b-img :src="introIcon"
                 class="animated slower pulse infinite w-75 my-3"
                 center
                 fluid></b-img>
        </b-col>
        <b-col md="7">
          <el-card :body-style="{ height:'70vh' }">
            <el-scrollbar class="h-100">
              <el-collapse v-model="activeCollapseItem"
                           accordion>
                <el-collapse-item :name="intro.objective.name">
                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro.objective.subtitle }}
                  </span>
                  <p v-for="part in intro.objective.paragraphs"
                     :key="part">
                    {{ part }}
                  </p>
                </el-collapse-item>
                <el-collapse-item :name="intro.introduction.name">
                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro.introduction.subtitle }}
                  </span>
                  <p v-for="part in intro.introduction.paragraphs"
                     :key="part">
                    {{ part }}
                  </p>
                </el-collapse-item>
                <el-collapse-item :name="intro.method.name">
                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro.method.subtitle }}
                  </span>
                  <p v-for="part in intro.method.paragraphs"
                     :key="part">
                    {{ part }}
                  </p>
                  <b-img :src="require('@/assets/intro-methods.png')"
                         class="pr-3"
                         center
                         fluid></b-img>
                </el-collapse-item>
                <el-collapse-item :name="intro.result.name">
                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro.result.subtitle }}
                  </span>
                  <p v-for="part in intro.result.paragraphs"
                     :key="part">
                    {{ part }}
                  </p>
                  <b-img :src="require('@/assets/intro-results.png')"
                         class="pr-3"
                         center
                         fluid></b-img>
                </el-collapse-item>
                <el-collapse-item :name="intro.conclusion.name">
                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro.conclusion.subtitle }}
                  </span>
                  <p v-for="part in intro.conclusion.paragraphs"
                     :key="part">
                    {{ part }}
                  </p>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
export default {
  name: "Intro",
  data: function() {
    return {
      activeCollapseItem: "objective",

      intro: {
        objective: {
          name: "objective",
          subtitle: this.$t("PAGE.INTRO.PARAGARPHS.OBJECTIVE.SUBTITLE"),
          paragraphs: this.$t("PAGE.INTRO.PARAGARPHS.OBJECTIVE.CONTENTS")
        },
        introduction: {
          name: "introduction",
          subtitle: this.$t("PAGE.INTRO.PARAGARPHS.INTRODUCTION.SUBTITLE"),
          paragraphs: this.$t("PAGE.INTRO.PARAGARPHS.INTRODUCTION.CONTENTS")
        },
        method: {
          name: "method",
          subtitle: this.$t("PAGE.INTRO.PARAGARPHS.METHOD.SUBTITLE"),
          paragraphs: this.$t("PAGE.INTRO.PARAGARPHS.METHOD.CONTENTS")
        },
        result: {
          name: "result",
          subtitle: this.$t("PAGE.INTRO.PARAGARPHS.RESULT.SUBTITLE"),
          paragraphs: this.$t("PAGE.INTRO.PARAGARPHS.RESULT.CONTENTS")
        },
        conclusion: {
          name: "conclusion",
          subtitle: this.$t("PAGE.INTRO.PARAGARPHS.CONCLUSION.SUBTITLE"),
          paragraphs: this.$t("PAGE.INTRO.PARAGARPHS.CONCLUSION.CONTENTS")
        }
      }
    };
  },
  computed: {
    introIcon: function() {
      switch (this.activeCollapseItem) {
        case "objective":
          return require("@/assets/intro-icon-objective.png");
        case "introduction":
          return require("@/assets/intro-icon-introduction.png");
        case "method":
          return require("@/assets/intro-icon-method.png");
        case "result":
          return require("@/assets/intro-icon-result.png");
        case "conclusion":
          return require("@/assets/intro-icon-conclusion.png");
        default:
          return require("@/assets/intro-icon-default.png");
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
