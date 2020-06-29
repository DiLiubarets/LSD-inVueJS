
<template>
  <div class="mui-col-md-8">
    <div class="mui-panel">
      <div class="mui-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";

export default {
  methods: {
    createChart(chartData) {
      var myChart = document.getElementById("myChart");
      var massPopChart = new Chart(myChart, chartData);
      return massPopChart;
    }
  }
};
</script>

