<template>
  <div class="demo">

    <b-container fluid>
      <b-row align-h="center">
        <p class="text-center">
          <font-awesome-icon icon="rocket" />&nbsp;DEMO
        </p>
      </b-row>

      <b-row align-h="center">
        <b-col cols="4"
               offset="1">
          <el-form label-width="25%">
            <el-form-item>
              <el-button type="primary"
                         size="medium"
                         :class="submitButtonClass"
                         :disabled="!canSubmit"
                         :loading="isLoading"
                         @click="submit()">
                {{ $t("BUTTON.Predict") }}
              </el-button>
            </el-form-item>

            <hr>

            <el-form-item :label="$t('TIME.Date')">
              <el-select v-model="inputWeekday"
                         size="medium">
                <el-option v-for="option in weekdayOptions"
                           :key="option.label"
                           :label="$t(`TIME.${option.label}`)"
                           :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('TIME.Time')">
              <el-time-picker v-model="inputTimeRange"
                              is-range
                              format="HH:mm"
                              value-format="timestamp"
                              size="medium"
                              :editable="false"
                              :clearable="false">
              </el-time-picker>
            </el-form-item>

            <el-form-item v-for="i in Object.keys(inputSensorCounts)"
                          v-bind:key="`inputSensorCounts-${i}`"
                          :label="i">
              <el-slider v-model="inputSensorCounts[i]"
                         :min="0"
                         :max="100">
              </el-slider>
            </el-form-item>
          </el-form>
        </b-col>

        <b-col cols="6">
          <ve-ring :data="chartData"
                   :settings="chartSettings"
                   :extend="chartExtend"></ve-ring>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import VeRing from "v-charts/lib/ring.common";

export default {
  name: "Demo",
  components: { VeRing },
  data: function() {
    return {
      isLoading: false,
      predictResult: {},

      inputWeekday: 0,
      inputTimeRange: [new Date().valueOf(), new Date().valueOf() + 60 * 60 * 1000],
      inputSensorCounts: {
        M001: 0,
        M002: 0,
        M003: 0,
        M004: 0,
        M005: 0,
        M006: 0,
        M007: 0,
        M008: 0,
        M009: 0,
        M010: 0,
        M011: 0,
        M012: 0,
        M013: 0,
        M014: 0,
        M015: 0,
        M016: 0,
        M017: 0,
        M018: 0,
        M019: 0,
        M020: 0,
        M021: 0,
        M022: 0,
        M023: 0,
        M024: 0,
        M025: 0,
        M026: 0,
        M027: 0,
        M028: 0,
        M029: 0,
        M030: 0,
        M031: 0
      },

      weekdayOptions: [
        { value: 0, label: "Sunday" },
        { value: 1, label: "Monday" },
        { value: 2, label: "Tuesday" },
        { value: 3, label: "Wednesday" },
        { value: 4, label: "Thursday" },
        { value: 5, label: "Friday" },
        { value: 6, label: "Saturday" }
      ],

      chartSettings: {
        limitShowNum: 5,
        dataType: "percent",
        selectedMode: "single"
      },

      chartExtend: {
        "tooltip.formatter": "{b}: {d}%"
      }
    };
  },
  computed: {
    isInputTimeRangeValid: function() {
      return (
        this.inputTimeRange instanceof Array &&
        typeof this.inputTimeRange[0] === "number" &&
        typeof this.inputTimeRange[1] === "number"
      );
    },
    isInputWeekdayValid: function() {
      return typeof this.inputWeekday === "number" && this.inputWeekday >= 0 && this.inputWeekday <= 6;
    },
    atLeastOneSensor: function() {
      return Object.keys(this.inputSensorCounts).some(key => this.inputSensorCounts[key] > 0);
    },
    canSubmit: function() {
      return this.isInputTimeRangeValid && this.isInputWeekdayValid && this.atLeastOneSensor;
    },
    submitButtonClass: function() {
      return !this.isLoading && this.canSubmit ? "animated infinite heartBeat" : "";
    },
    chartData: function() {
      return {
        columns: ["event", "probability"],
        rows: Object.keys(this.predictResult)
          .sort((a, b) => this.predictResult[b] - this.predictResult[a])
          .map(key => {
            return { event: this.$t(`PREDICT_EVENTS.${key}`), probability: this.predictResult[key] };
          })
      };
    }
  },
  methods: {
    submit: function() {
      let inputData = Object.assign({}, this.inputSensorCounts);
      inputData.start_hour = new Date(this.inputTimeRange[0]).getHours();
      inputData.end_hour = new Date(this.inputTimeRange[1]).getHours();
      inputData.duration = Math.round((this.inputTimeRange[1] - this.inputTimeRange[0]) / 1000);
      inputData.weekday = this.inputWeekday;

      this.isLoading = true;
      this.predictResult = {};
      axios.post("xgb/predict/probability", inputData).then(response => {
        this.isLoading = false;
        this.predictResult = response.data;

        this.resetInputSensorCounts();
      });
    },
    resetInputSensorCounts: function() {
      Object.keys(this.inputSensorCounts).forEach(key => (this.inputSensorCounts[key] = 0));
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  font-weight: bold;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
