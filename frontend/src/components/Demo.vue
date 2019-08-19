<template>
  <div class="demo">

    <h3 class="pl-5 mb-3">{{ $t('PAGE.DEMO.Title') }}</h3>

    <b-container fluid>
      <b-row align-h="center">
        <b-col cols="3">
          <el-card v-loading="isLoading"
                   :body-style="{height:'60vh'}">
            <div slot="header">
              <el-form class="mr-3"
                       label-width="25%">
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
                                  class="w-100"
                                  :editable="false"
                                  :clearable="false">
                  </el-time-picker>
                </el-form-item>
              </el-form>
            </div>

            <el-scrollbar class="h-100">
              <el-form class="mr-3"
                       label-width="25%">
                <el-form-item v-for="i in Object.keys(inputSensorCounts)"
                              :key="`inputSensorCounts-${i}`"
                              :label="i">
                  <el-slider v-model="inputSensorCounts[i]"
                             :min="0"
                             :max="100"
                             :show-tooltip="false">
                  </el-slider>
                </el-form-item>
              </el-form>
            </el-scrollbar>
          </el-card>
        </b-col>

        <b-col cols="5">
          <el-card class="mb-3"
                   :body-style="{height:'70vh'}">
            <l-map ref="map"
                   :crs="mapOptions.crs"
                   :minZoom="mapOptions.minZoom"
                   :maxZoom="mapOptions.maxZoom"
                   :options="mapOptions.others">
              <l-control-zoom></l-control-zoom>

              <l-image-overlay :url="mapInfo.url"
                               :bounds="[[0,0], [mapInfo.actualHeight, mapInfo.actualWidth]]">
              </l-image-overlay>

              <l-circle v-for="s in sensorDots"
                        :key="s.name"
                        :lat-lng="[s.y, s.x]"
                        :radius="s.radius"
                        :fill-opacity="s.opacity"
                        fill-color="salmon"
                        color="" />
            </l-map>
          </el-card>

          <div class="text-center">
            <el-button type="info"
                       size="medium"
                       @click="getRandomSensorCounts(5)">
              {{ $t("BUTTON.RandomSensorCount") }}
            </el-button>

            <el-button type="primary"
                       size="medium"
                       :class="submitButtonClass"
                       :disabled="!canSubmit"
                       :loading="isLoading"
                       @click="submit()">
              {{ $t("BUTTON.Predict") }}
            </el-button>

            <el-button type="info"
                       size="medium"
                       @click="resetInputSensorCounts()">
              {{ $t("BUTTON.ResetSensorCount") }}
            </el-button>
          </div>
        </b-col>

        <b-col cols="4">
          <el-card v-loading="isLoading"
                   :body-style="{height:'70vh'}">
            <p>{{ $t('PAGE.DEMO.PredictResult') }}</p>
            <hr>
            <ve-ring height="85%"
                     :data="chartData"
                     :settings="chartSettings"
                     :extend="chartExtend">
            </ve-ring>
          </el-card>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LImageOverlay, LControlZoom, LCircle } from "vue2-leaflet";

import VeRing from "v-charts/lib/ring.common";
import SensorPositions from "../assets/sensors.json";

export default {
  name: "Demo",
  components: { LMap, LImageOverlay, LControlZoom, LCircle, VeRing },
  data: function() {
    return {
      sensors: SensorPositions,

      L: L, // leaflet
      mapOptions: {
        crs: L.CRS.Simple,

        minZoom: -1,
        maxZoom: 2,

        others: {
          attributionControl: false,
          zoomControl: false,
          zoomSnap: 0.1,
          zoomDelta: 0.5
        }
      },

      mapInfo: {
        url: require("@/assets/map.jpg"),
        actualHeight: 450,
        actualWidth: 660
      },

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
        "tooltip.formatter": "{b}: {d}%",
        series: { radius: ["40%", "50%"], center: ["50%", "50%"] },
        legend: { top: "bottom" }
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
    sensorDots: function() {
      return this.sensors.map(s => {
        return {
          name: s.name,
          x: s.x,
          y: s.y,
          radius: this.inputSensorCounts[s.name] / 2,
          opacity: this.inputSensorCounts[s.name] / 200 + 0.25
        };
      });
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
  mounted: function() {
    this.$refs.map.mapObject.fitBounds([[0, 0], [this.mapInfo.actualHeight, this.mapInfo.actualWidth]]);
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
      });
    },
    getRandomSensorCounts: function(n) {
      this.resetInputSensorCounts();

      const keys = Object.keys(this.inputSensorCounts);
      for (var i = 0; i < n; i++) {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.inputSensorCounts[randomKey] = Math.round(Math.random() * 100);
      }
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
