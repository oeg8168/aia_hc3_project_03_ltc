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
                <el-collapse-item v-for="introKey in Object.keys(intro)"
                                  :key="introKey"
                                  :name="intro[introKey].name">

                  <span slot="title"
                        class="font-weight-bold">
                    {{ intro[introKey].subtitle }}
                  </span>
                  <p v-for="part in intro[introKey].paragraphs"
                     :key="part">
                    {{ part }}
                  </p>

                  <b-img v-if="introKey==='method'"
                         :src="require('@/assets/intro-methods.png')"
                         class="pr-3"
                         center
                         fluid></b-img>
                  <b-img v-if="introKey==='result'"
                         :src="require('@/assets/intro-results.png')"
                         class="pr-3"
                         center
                         fluid></b-img>
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
