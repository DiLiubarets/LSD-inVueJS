<template>
  <!-- dropdown menu with time candle and coin name -->
  <div class="mui-panel">
    <!-- real life price  -->
    <span id="realTimePrice" class="mui--text-title">Live price: ${{this.$parent.livePrice}}</span>
    <br />
    <span id="average" class="mui--text-title">
      <i class="fa fa-bar-chart" aria-hidden="true"></i>
      average: ${{this.$parent.avgArr[this.$parent.avgArr.length-1]}}
    </span>
    <br />
    <!-- dropdown menu with coin names -->
    <div class="mui-dropdown">
      <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
        <i class="fa fa-btc" aria-hidden="true">Coins</i>

        <span class="mui-caret"></span>
      </button>
      <ul v-on:click="coinSelect" id="currentCoin" class="mui-dropdown__menu">
        <li id="bitcoin">Bitcoin</li>
        <li id="ethereum">Ethereum</li>
        <li id="dash">Dash</li>
        <li id="eos">Eos</li>
        <li id="bitcoin-cash">Bitcoin-cash</li>
        <li id="waves">Waves</li>
        <li id="litecoin">Litecoin</li>
        <li id="binance-coin">Binance-coin</li>
      </ul>
    </div>
    <br />
    <!-- dropdown menu with time candles -->
    <div class="mui-dropdown">
      <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
        <i class="fa fa-bar-chart" aria-hidden="true">Time</i>
        <span class="mui-caret"></span>
      </button>

      <ul class="mui-dropdown__menu" id="timeDropdown" v-on:click="timeSelect">
        <li id="m1" value="1">1 min</li>
        <li id="m5" value="5">5 min</li>
        <li id="m15" value="15">15 min</li>
        <li id="m30" value="30">30 min</li>
        <li id="h1" value="60">1h</li>
        <li id="h2" value="120">2h</li>
        <li id="h6" value="360">6h</li>
        <li id="h12" value="720">12h</li>
        <li id="d1" value="1440">1 day</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    coinSelect: function(event) {
      var coin = event.target.id;
      this.$parent.coinSelect(coin);
    },
    timeSelect: function(event) {
      var intervalNum = event.target.value;
      var intervalString = event.target.id;
      this.$parent.timeSelect(intervalString, intervalNum);
    }
  }
};
</script>

