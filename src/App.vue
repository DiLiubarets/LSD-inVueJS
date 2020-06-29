<template>
  <div id="app">
    <navbar></navbar>

    <div class="mui-row" id="mui-row">
      <chart ref="chart"></chart>
      <div class="mui-col-md-4">
        <dropDownMenu></dropDownMenu>
        <aboutCoin ref="menu"></aboutCoin>
      </div>
    </div>

    <div id="cryptoNews">
      <br />
      <div class="mui--text-display4 mui--text-center">{{globalCoin.toUpperCase()}} NEWS</div>
      <div class="mui-container">
        <div id="news" class="mui-row">
          <template v-for="article in articles">
            <div class="mui-col-md-4">
              <div class="card-example mui--text-center mui--z1">
                <img :src="article.urlToImage" id="card-img" alt />
                <div class="label">
                  <br />
                  <div
                    id="title"
                    class="title mui--text-dark mui--text-headline"
                  >{{ article.title }}</div>
                  <br />
                  <button class="mui-btn mui-btn--flat">
                    <a :href="article.url">Explore</a>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <br />

        <div id="news" class="mui-row">
          <template v-for="article in articles2">
            <div class="mui-col-md-4">
              <div class="card-example mui--text-center mui--z1">
                <img :src="article.urlToImage" id="card-img" alt />
                <div class="label">
                  <br />
                  <div
                    id="title"
                    class="title mui--text-dark mui--text-headline"
                  >{{ article.title }}</div>
                  <br />
                  <button class="mui-btn mui-btn--flat">
                    <a :href="article.url">Explore</a>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <br />

    <div class="mui-row">
      <div class="mui-col-md-12">
        <aboutProject></aboutProject>
      </div>
      <div class="mui-col-md-6">
        <contactForm></contactForm>
      </div>
    </div>

    <div id="footer">
      <div class="mui-container mui--text-center">
        <a href="https://github.com/DiLiubarets/project-1">
          View project code on Github
          <br />
          <i class="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import navbar from "./components/navbar";
import chart from "./components/chart";
import dropDownMenu from "./components/dropDownMenu";
import aboutCoin from "./components/aboutCoin";
import contactForm from "./components/contactForm";
import aboutProject from "./components/aboutProject";

import axios from "axios";

export default {
  name: "App",
  components: {
    navbar: navbar,
    chart: chart,
    dropDownMenu: dropDownMenu,
    aboutCoin: aboutCoin,
    contactForm: contactForm,
    aboutProject: aboutProject
  },

  data: function() {
    return {
      mode: "dark",
      today: moment().format("YYYY MMM Do"),
      arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      avgArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      labels: ["", "", "", "", "", "", "", "", "", "", "Live"],
      labels2: ["", "", "", "", "", "", "", "", "", "", "Live"],
      liveInterval: "",
      historicalInterval: "",
      globalIntervalNum: "",
      globalIntervalString: "",
      globalCoin: "",
      massPopChart: "",
      livePrice: 0,
      articles: [],
      articles2: []
    };
  },

  methods: {
    configPrice: function(coin, intervalString, intervalNum) {
      this.globalCoin = coin;
      this.globalIntervalString = intervalString;
      this.globalIntervalNum = intervalNum;

      //set description
      this.$refs.menu.changeDescription(coin);

      // title for coins
      this.massPopChart.options.title.text = coin.toUpperCase();

      var currentTime = Date.now();
      var startTime = currentTime - 600000 * intervalNum * 2;
      var queryHistorical =
        "https://api.coincap.io/v2/assets/" +
        coin +
        "/history?interval=" +
        intervalString +
        "&start=" +
        startTime +
        "&end=" +
        currentTime;
      var queryLive = "https://api.coincap.io/v2/rates/" + coin;

      this.getHistorical(queryHistorical);
      this.getLivePrice(queryLive);
      this.getNews(coin);

      clearInterval(this.historicalInterval);
      clearInterval(this.liveInterval);

      var self = this;
      this.historicalInterval = setInterval(function() {
        self.getHistorical(queryHistorical);
      }, intervalNum * 60000);
      this.liveInterval = setInterval(function() {
        self.getLivePrice(queryLive);
      }, 5000);
    },

    getHistorical: function(queryURL) {
      var self = this;
      axios.get(queryURL).then(response => {
        var data = response.data.data;
        var delta = data.length - self.arr.length;
        var i = delta;
        for (i; i < data.length; i++) {
          var price = parseFloat(parseFloat(data[i].priceUsd).toFixed(3));
          self.arr[i - delta - 1] = price;
          self.labels[i - delta - 1] = self.globalCoin;
        }
        self.movingAvg(data);
        self.massPopChart.update();
      });
    },

    getLivePrice: function(queryURL) {
      var self = this;
      axios.get(queryURL).then(response => {
        var price = parseFloat(
          parseFloat(response.data.data.rateUsd).toFixed(3)
        );
        self.livePrice = price;
        self.arr[self.arr.length - 1] = price;

        // for moving average live
        if (self.arr[0] != 0) {
          self.avgArr[self.avgArr.length - 1] = (
            (self.arr[self.arr.length - 1] +
              self.arr[self.arr.length - 2] +
              self.arr[self.arr.length - 3] +
              self.arr[self.arr.length - 4] +
              self.arr[self.arr.length - 5]) /
            5
          ).toFixed(3);
        }

        self.massPopChart.update();
      });
    },
    getNews: function(coin) {
      var urlNews =
        "https://cors-anywhere.herokuapp.com/" +
        "https://newsapi.org/v2/everything?language=en&q=" +
        coin +
        "+crypto" +
        "&from=" +
        this.today +
        "&sortBy=publishedAt&apiKey=46f225ffb36d463dbf82d74ee65a1700";
      var self = this;
      axios.get(urlNews).then(response => {
        self.articles = response.data.articles.splice(0, 3);
        self.articles2 = response.data.articles.splice(3, 3);
      });
    },

    movingAvg: function(data) {
      var delta = data.length - this.avgArr.length;
      var i = delta;

      for (i; i < data.length; i++) {
        var price1 = parseFloat(parseFloat(data[i].priceUsd).toFixed(3));
        var price2 = parseFloat(parseFloat(data[i - 1].priceUsd).toFixed(3));
        var price3 = parseFloat(parseFloat(data[i - 2].priceUsd).toFixed(3));
        var price4 = parseFloat(parseFloat(data[i - 3].priceUsd).toFixed(3));
        var price5 = parseFloat(parseFloat(data[i - 4].priceUsd).toFixed(3));

        this.avgArr[i - delta - 1] = (
          (price1 + price2 + price3 + price4 + price5) /
          5
        ).toFixed(3);
      }
      this.avgArr[this.avgArr.length - 1] = (
        (this.arr[this.arr.length - 1] +
          this.arr[this.arr.length - 2] +
          this.arr[this.arr.length - 3] +
          this.arr[this.arr.length - 4] +
          this.arr[this.arr.length - 5]) /
        5
      ).toFixed(3);
    },

    coinSelect: function(coin) {
      this.configPrice(coin, this.globalIntervalString, this.globalIntervalNum);
    },

    timeSelect: function(intervalString, intervalNum) {
      this.configPrice(this.globalCoin, intervalString, intervalNum);
    }
  },

  mounted() {
    var chartData = {
      type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Price USD",
            fill: false,
            data: this.arr,
            borderWidth: 1,
            borderColor: "green",
            backgroundColor: "green",
            hoverBorderWidth: 7,
            hoverBorderColor: "red"
          },
          {
            label: "5 candle average",
            fill: false,
            data: this.avgArr,
            borderWidth: 1,
            borderColor: "grey",
            backgroundColor: "grey",
            hoverBorderWidth: 7,
            hoverBorderColor: "orange"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false //this will remove all the x-axis grid lines
            }
          ]
        },
        title: {
          display: true,
          text: "",
          fontSize: 25,
          fontColor: "gold"
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#000"
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    };
    this.massPopChart = this.$refs.chart.createChart(chartData);

    this.configPrice("bitcoin", "m1", 1);
  }
};
</script>

<style>
/* body css */
body {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

/* app-bar  */
.mui-appbar {
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
}
.mui--text-title {
  padding-left: 2em;
  color: goldenrod;
}
img {
  width: 70px;
  height: 70px;
}

header ul.mui-list--inline {
  margin-bottom: 0;
  margin-right: 2em;
}

header a {
  color: white;
}

header table {
  width: 100%;
}

/* dropdown menu */
.mui-btn {
  background-image: linear-gradient(
    to top,
    #09203f 0%,
    #537895 100%
  ) !important;
  padding-left: 2em;
}
#dropDown-menu {
  margin-left: 65%;
  padding-left: 1em;
}
.mui-btn--flat,
#submitEmail {
  color: honeydew;
}
/* padding inside drop-douwn */
#timeDropdown,
#currentCoin {
  padding-left: 2em;
}

/* mychart */
.chart-container {
  margin-left: 3em;
}
#mui-row {
  margin-top: 2em;
  margin-left: 2em;
  margin-right: 4em;
}
/* contact form */
form {
  width: 100%;
  margin-left: 3em;
  margin-top: 5em;
}

/* about project */
#aboutProjectPanel {
  margin-top: 5em;
  margin-left: 2em;
  margin-right: 2em;
}
/* style title */
#title-crypto {
  padding-left: 1em;
}
/* cards style */
.card-example {
  position: relative;
  background-color: #fff;
  /* width: 300px;
  height: 350px;
  padding: 3px; */
}

.card-example img {
  width: 100%;
  height: 250px;
}

.card-example span.title {
  display: inline-block;
  position: absolute;
  /* padding-top: 2em; */
  left: 20px;
}

.card-example .label {
  padding: 25px 25px 0;
}
/* footer */
#footer {
  margin-top: 10em;
  box-sizing: border-box;
  height: 70px;
  color: #09203f;
  background-color: #eee;
  /* border-top: 1px solid #e0e0e0; */
  padding-top: 20px;
}

@media (min-width: 768px) {
  #description {
    float: left;
  }
}
.darkmode {
  width: 100%;
  min-height: 100%;
  background: #f3f3f3;
  color: #15202b;
}
.dark {
  background: #192734;
  color: #f3f3f3;
}
</style>
