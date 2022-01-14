<template>
  <section class="api stocks" :class="selectedAPI.name" id="stocks">
    <div class="stocks_head">
      <div class="stocks_head_left">
        <h3 v-html="$t(`api.stocks.${selectedAPI.name}.subtitle`)"></h3>
        <h2 v-html="$t(`api.stocks.${selectedAPI.name}.title`)"></h2>
        <!-- <p class="url">{{ $t(`api.stocks.${selectedAPI.name}.url`) }}</p> -->
        <p v-html="$t(`api.stocks.${selectedAPI.name}.desc`)" class="desc"></p>
        <!--<router-link class="button secondary" :to="{name: 'Api', params: {id: selectedAPI.name}}">{{$t('api.moreInfo')}}</router-link>-->
        <a class="button secondary" href="https://rapidapi.com/marcopavan.mp@gmail.com/api/tradingradar" target="_blank" rel="noopener noreferrer">{{$t('api.moreInfo')}}</a>
        <div class="stocks_arrows">
          <span @click="prevStocksAPI">&#8592;</span>
          <span @click="nextStocksAPI">&#8594;</span>
        </div>
      </div>
      <div class="stocks_head_right">
        <h3>{{ $t('source') }}</h3>
        <img :src="require(`@/assets/images/${selectedAPI.source}.png`)" :alt="$t(`api.stocks.${selectedAPI.name}.source`)">
        <a :href="$t(`api.stocks.${selectedAPI.name}.sourceUrl`)" target="_blank" rel="noopener noreferrer">{{ $t(`api.stocks.${selectedAPI.name}.source`) }}</a>
        <h3>{{ $t('features') }}</h3>
        <ul>
          <li>{{ $t('api.stocks.feature1') }}</li>
          <li>{{ $t('api.stocks.feature2') }}</li>
          <li>{{ $t('api.stocks.feature3') }}</li>
          <li>{{ $t('api.stocks.feature4') }}</li>
        </ul>
      </div>
    </div>
    <div class="stocks_body">
      <div class="stocks_list">
        <div v-for="obj in api" :key="obj.id" :class="[{'active': obj.active}, obj.status]">
          <h3 @click="gotToStockAPI(obj.id)" :class="obj.name">{{ $t(`api.stocks.${obj.name}.label`) }}</h3>
          <div class="stocks_list_wrap">
            <div v-for="stock in obj.stocks" :key="stock.isin" class="stocks_listitem">
              <router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link>
              <span>{{ stock[obj.key]?.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sentiment" :class="status">
      <div class="sentiment_head">
        <div class="titles">
          <h2>{{ $t('sentiment') }}</h2>
          <h3>{{ $t('sentimentSubtitle') }}</h3>
          <div class="credits">
            <a href="https://www.freepik.com/vectors/arrow">Arrow vector created by DrawingMyDiary - www.freepik.com</a>
          </div>
        </div>
      </div>
      <div class="sentiment_body">
        <div>
          <h3>{{ $t('performance') }}</h3>
          <img v-if="aggregations.performance1M" :src="require(`@/assets/images/gauge_${aggregations.performance1M}.png`)">
        </div>
        <div>
          <h3>{{ $t('volatility') }}</h3>
          <img v-if="aggregations.volatility" :src="require(`@/assets/images/gauge_${aggregations.volatility}.png`)">
        </div>
        <div>
          <h3>{{ $t('tendency') }}</h3>
          <img v-if="aggregations.tendency" :src="require(`@/assets/images/gauge_${aggregations.tendency}.png`)">
        </div>
      </div>
    </div>

    <div class="filters" :class="status">
      <div class="filters_head">
        <div class="titles">
          <h2>{{ $t('filters') }}</h2>
          <h3>{{ $t('filtersSubtitle') }}</h3>
        </div>
      </div>
      <div class="stocks_filters">
        <table class="filter">
          <caption>{{ $t('rating') }}</caption>
          <thead>
            <tr>
              <th>{{ $t('stock') }}</th>
              <th>{{ $t('rating') }} {{ $t('mFinanza') }}</th>
              <th>{{ $t('rating') }} {{ $t('borsaItaliana') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in filters.rank" :key="stock.isin">
              <td><router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link></td>
              <td>{{ stock.milFin_mfRanking?.value }}</td>
              <td>{{ stock.borsaIt_rating?.value }}</td>
            </tr>
          </tbody>
        </table>

        <table class="filter">
          <caption>{{ $t('volatility') }}</caption>
          <thead>
            <tr>
              <th>{{ $t('stock') }}</th>
              <th>{{ $t('perf1M') }}</th>
              <th>{{ $t('volatility') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in filters.volatility" :key="stock.isin">
              <td><router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link></td>
              <td>{{ stock.perf1M?.value }}</td>
              <td>{{ stock.volatility?.value }}</td>
            </tr>
          </tbody>
        </table>

        <table class="filter">
          <caption>{{ $t('tendency') }} {{ $t('sol24') }}</caption>
          <thead>
            <tr>
              <th>{{ $t('stock') }}</th>
              <th>{{ $t('shortTendency') }}</th>
              <th>{{ $t('mediumTendency') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in filters.tendency" :key="stock.isin">
              <td><router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link></td>
              <td>{{ stock.sol24_shortTendency?.value }}</td>
              <td>{{ stock.sol24_mediumTendency?.value }}</td>
            </tr>
          </tbody>
        </table>

        <table class="filter">
          <caption>{{ $t('overBuy') }}</caption>
          <thead>
            <tr>
              <th>{{ $t('stock') }}</th>
              <th>{{ $t('rsi') }} {{ $t('borsaItaliana') }}</th>
              <th>{{ $t('rsi') }} {{ $t('mFinanza') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in filters.rsiUp" :key="stock.isin">
              <td><router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link></td>
              <td>{{ stock.borsaIt_rsi?.value }}</td>
              <td>{{ stock.milFin_rsi?.value }}</td>
            </tr>
          </tbody>
        </table>

        <table class="filter">
          <caption>{{ $t('overSell') }}</caption>
          <thead>
            <tr>
              <th>{{ $t('stock') }}</th>
              <th>{{ $t('rsi') }} {{ $t('borsaItaliana') }}</th>
              <th>{{ $t('rsi') }} {{ $t('mFinanza') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in filters.rsiDown" :key="stock.isin">
              <td><router-link :to="{name: 'Stock', params: {isin: stock.isin}}">{{ stock.name }}</router-link></td>
              <td>{{ stock.borsaIt_rsi?.value }}</td>
              <td>{{ stock.milFin_rsi?.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script>
import { settings } from '@/settings.js'
export default {
  name: 'CmpApiStocks',
  data () {
    return {
      selectedApiIndex: undefined,
      selectedAPI: undefined,
      status: 'loading',
      api: [
        {
          id: 0,
          name: 'perf1M',
          key: 'perf1M',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: [],
          active: true
        },
        {
          id: 1,
          name: 'perf6M',
          key: 'perf6M',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: []
        },
        {
          id: 2,
          name: 'perf1Y',
          key: 'perf1Y',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: []
        },
        {
          id: 3,
          name: 'volatility',
          key: 'volatility',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: []
        },
        {
          id: 4,
          name: 'rsi',
          key: 'borsaIt_rsi',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: []
        },
        {
          id: 5,
          name: 'rating',
          key: 'borsaIt_rating',
          maxResults: 5,
          status: 'idle',
          source: 'borsaItaliana',
          stocks: []
        },
        {
          id: 6,
          name: 'mfRisk',
          key: 'milFin_mfRisk',
          maxResults: 5,
          status: 'idle',
          source: 'milanoFinanza',
          stocks: []
        },
        {
          id: 7,
          name: 'mfRsi',
          key: 'milFin_rsi',
          maxResults: 5,
          status: 'idle',
          source: 'milanoFinanza',
          stocks: []
        },
        {
          id: 8,
          name: 'mfRanking',
          key: 'milFin_mfRanking',
          maxResults: 5,
          status: 'idle',
          source: 'milanoFinanza',
          stocks: [],
          order: 'asc'
        },
        {
          id: 9,
          name: 'divYield',
          key: 'divYield',
          maxResults: 5,
          status: 'idle',
          source: 'milanoFinanza',
          stocks: []
        },
        {
          id: 10,
          name: 'shortTendency',
          key: 'sol24_shortTendency',
          maxResults: 5,
          status: 'idle',
          source: 'ilSole24Ore',
          stocks: [],
          order: 'asc'
        },
        {
          id: 11,
          name: 'mediumTendency',
          key: 'sol24_mediumTendency',
          maxResults: 5,
          status: 'idle',
          source: 'ilSole24Ore',
          stocks: [],
          order: 'asc'
        }
      ],
      filters: {
        rank: [],
        volatility: [],
        tendency: [],
        rsiUp: [],
        rsiDown: []
      },
      aggregations: {
        performance1M: undefined,
        volatility: undefined,
        tendency: undefined
      }
    }
  },
  methods: {
    prevStocksAPI () {
      let currIndex = this.selectedApiIndex
      this.api[currIndex].active = false
      if (currIndex > 0) {
        currIndex--
      } else {
        currIndex = this.apiLenght - 1
      }
      this.selectedApiIndex = currIndex
      this.selectedAPI = this.api[this.selectedApiIndex]
      this.api[currIndex].active = true
    },
    nextStocksAPI () {
      let currIndex = this.selectedApiIndex
      this.api[currIndex].active = false
      if (currIndex === this.apiLenght - 1) {
        currIndex = 0
      } else {
        currIndex++
      }
      this.selectedApiIndex = currIndex
      this.selectedAPI = this.api[this.selectedApiIndex]
      this.api[currIndex].active = true
    },
    gotToStockAPI (id) {
      this.api[this.selectedApiIndex].active = false
      this.selectedApiIndex = id
      this.selectedAPI = this.api[this.selectedApiIndex]
      this.api[this.selectedApiIndex].active = true
    },
    getStocksAnalysis (index = 0) {
      const api = this.api[index]
      if (!api) return
      api.status = 'loading'
      const order = api.order || 'desc'
      fetch(`${settings.apiEndpoint}/api/stocks/${api.name}?order=${order}`, {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          api.stocks = data
          api.status = 'success'
        })
        .catch(err => {
          console.error(err)
          api.status = 'error'
        })
        .finally(() => {
          this.getStocksAnalysis(++index)
          if (index === this.api.length) {
            this.filterStocksByRank()
            this.filterStocksByVolatility()
            this.filterStocksByTendency()
            this.filterStocksByRsiUp()
            this.filterStocksByRsiDown()

            this.getPerformanceAggregation()
            this.getVolatilityAggregation()
            this.getTendencyAggregation()
            this.status = 'success'
          }
        })
    },
    filterStocksByRank () {
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'rating') {
          current.stocks.forEach(stock => {
            if (stock.borsaIt_rating.value === 3 || stock.borsaIt_rating.value === 4) {
              this.filters.rank.push(stock)
            }
          })
        }
      }
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'mfRanking') {
          current.stocks.forEach(stock => {
            if (stock.milFin_mfRanking.value.includes('A') || stock.milFin_mfRanking.value.includes('B')) {
              this.filters.rank.forEach((elem, i) => {
                if (elem.isin === stock.isin) {
                  elem.milFin_mfRanking = stock.milFin_mfRanking
                }
              })
            }
          })
        }
      }
      this.filters.rank = this.filters.rank.filter((elem) => {
        if (elem.milFin_mfRanking && elem.borsaIt_rating) {
          return true
        }
      })
    },
    filterStocksByVolatility () {
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'perf1M') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.perf1M.value) >= 10) {
              this.filters.volatility.push(stock)
            }
          })
        }
      }
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'volatility') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.volatility.value) >= 40) {
              this.filters.volatility.forEach((elem, i) => {
                if (elem.isin === stock.isin) {
                  elem.volatility = stock.volatility
                }
              })
            }
          })
        }
      }
      this.filters.volatility = this.filters.volatility.filter((elem) => {
        if (elem.perf1M && elem.volatility) {
          return true
        }
      })
    },
    filterStocksByTendency () {
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'shortTendency') {
          current.stocks.forEach(stock => {
            if (stock.sol24_shortTendency.value.includes('Rialzo')) {
              this.filters.tendency.push(stock)
            }
          })
        }
      }
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'mediumTendency') {
          current.stocks.forEach(stock => {
            if (stock.sol24_mediumTendency.value.includes('Rialzo')) {
              this.filters.tendency.forEach((elem) => {
                if (elem.isin === stock.isin) {
                  elem.sol24_mediumTendency = stock.sol24_mediumTendency
                }
              })
            }
          })
        }
      }
      this.filters.tendency = this.filters.tendency.filter((elem) => {
        if (elem.sol24_mediumTendency && elem.sol24_shortTendency) {
          return true
        }
      })
    },
    filterStocksByRsiUp () {
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'rsi') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.borsaIt_rsi.value) >= 20) {
              this.filters.rsiUp.push(stock)
            }
          })
        }
      }
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'mfRsi') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.milFin_rsi.value) >= 50) {
              this.filters.rsiUp.forEach((elem, i) => {
                if (elem.isin === stock.isin) {
                  elem.milFin_rsi = stock.milFin_rsi
                }
              })
            }
          })
        }
      }
      this.filters.rsiUp = this.filters.rsiUp.filter((elem) => {
        if (elem.borsaIt_rsi && elem.milFin_rsi) {
          return true
        }
      })
    },
    filterStocksByRsiDown () {
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'rsi') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.borsaIt_rsi.value) <= -20) {
              this.filters.rsiDown.push(stock)
            }
          })
        }
      }
      for (let i = 0; i < this.api.length; i++) {
        const current = this.api[i]
        if (current.name === 'mfRsi') {
          current.stocks.forEach(stock => {
            if (parseInt(stock.milFin_rsi.value) <= -50) {
              this.filters.rsiDown.forEach((elem, i) => {
                if (elem.isin === stock.isin) {
                  elem.milFin_rsi = stock.milFin_rsi
                }
              })
            }
          })
        }
      }
      this.filters.rsiDown = this.filters.rsiDown.filter((elem) => {
        if (elem.borsaIt_rsi && elem.milFin_rsi) {
          return true
        }
      })
    },
    getPerformanceAggregation () {
      let aggregator = 0
      const lenght = this.api[0].stocks.length
      this.api[0].stocks.forEach((obj) => {
        if (obj.perf1M?.value) {
          const num = parseFloat(obj.perf1M.value.replace(',', '.').replace('%', ''))
          aggregator += num
        }
      })
      const perf1MAggregation = parseInt(aggregator / lenght)
      if (perf1MAggregation > 10) {
        this.aggregations.performance1M = 5
      }
      if (perf1MAggregation > 5 && perf1MAggregation <= 10) {
        this.aggregations.performance1M = 4
      }
      if (perf1MAggregation >= 0 && perf1MAggregation <= 5) {
        this.aggregations.performance1M = 3
      }
      if (perf1MAggregation < 0 && perf1MAggregation >= -5) {
        this.aggregations.performance1M = 2
      }
      if (perf1MAggregation < -5 && perf1MAggregation >= -10) {
        this.aggregations.performance1M = 1
      }
      if (perf1MAggregation < -10) {
        this.aggregations.performance1M = 0
      }
    },
    getVolatilityAggregation () {
      let aggregator = 0
      const length = this.api[3].stocks.length
      this.api[3].stocks.forEach((obj) => {
        if (obj.volatility?.value) {
          aggregator += obj.volatility.value
        }
      })
      const volatilityAggregation = parseInt(aggregator / length)

      this.aggregations.volatility = 0
      if (volatilityAggregation > 8) {
        this.aggregations.volatility = 1
      }
      if (volatilityAggregation > 16) {
        this.aggregations.volatility = 2
      }
      if (volatilityAggregation > 24) {
        this.aggregations.volatility = 3
      }
      if (volatilityAggregation > 32) {
        this.aggregations.volatility = 4
      }
      if (volatilityAggregation > 40) {
        this.aggregations.volatility = 5
      }
    },
    getTendencyAggregation () {
      const tendencyAggregation = this.filters.tendency.length
      const stockNum = this.api[0].stocks.length
      const ratio = stockNum / tendencyAggregation

      if (ratio < 32) {
        this.aggregations.tendency = 0
      }
      if (ratio < 16) {
        this.aggregations.tendency = 1
      }
      if (ratio < 8) {
        this.aggregations.tendency = 2
      }
      if (ratio < 4) {
        this.aggregations.tendency = 3
      }
      if (ratio < 2) {
        this.aggregations.tendency = 4
      }
      if (ratio <= 1.6) {
        this.aggregations.tendency = 5
      }
    }
  },
  beforeMount () {
    this.getStocksAnalysis(0)
    this.selectedApiIndex = 0
    this.selectedAPI = this.api[this.selectedApiIndex]
    this.apiLenght = this.api.length
  }
}
</script>

<style scoped lang="scss">
.stocks {
  &.perf1M &_head {
    background-position: 0% 60%;
  }
  &.perf6M &_head  {
    background-position: 8% 60%;
  }
  &.perf1Y &_head  {
    background-position: 16% 60%;
  }
  &.volatility &_head  {
    background-position: 24% 60%;
  }
  &.rsi &_head  {
    background-position: 32% 60%;
  }
  &.rating &_head  {
    background-position: 40% 60%;
  }
  &.mfRisk &_head  {
    background-position: 48% 60%;
  }
  &.mfRsi &_head  {
    background-position: 56% 60%;
  }
  &.mfRanking &_head  {
    background-position: 64% 60%;
  }
  &.divYield &_head  {
    background-position: 72% 60%;
  }
  &.shortTendency &_head  {
    background-position: 80% 60%;
  }
  &.mediumTendency &_head  {
    background-position: 88% 60%;
  }
  &_head {
    color: $white;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 1rem;

    background-size: 120%;
    background-image: url(~@/assets/images/stocks-bg-min.jpg);
    background-repeat: no-repeat;
    transition: background-position .3s ease-out;
  }
  &_head_left {
    width: 75%;
    margin: 4rem 4rem 2rem 4rem;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-bottom: 1px solid white;
    p {
      margin: 1.2rem 0;
      line-height: 130%;
      &.url {
        font-family: monospace;
        background: $black;
        display: inline;
        padding: .3rem 1rem;
        border: 1px solid $gray;
      }
    }
  }
  &_head_right {
    width: 25%;
    background: rgba(0, 0, 0, 0.8);
    padding: 3rem 3rem 2rem 3rem;
    a {
      display: block;
      margin-top: .5rem;
    }
    img {
      width: 4rem;
      border: 2px solid $white;
    }
    ul {
      list-style: inside;
      li {
        margin-bottom: .5rem;
      }
    }
  }
  &_body {
    background-color: rgba(255,255,255,0.4);
    padding: 0 1rem;
  }
  &_list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    > div {
      text-align: center;
      width: 18%;
      background: white;
      margin: 1rem 1rem 1rem;
      &.active {
        border: 1px solid $light-gray;
        border-top: none;
      }
      &.active h3 {
        background-color: $blue;
        color: $white;
      }
      h3 {
        position: relative;
        cursor: pointer;
        padding: .5rem 0;
        margin: 0;
        font-size: $font-size-big;
        border-bottom: 1px solid $blue20perc;
        background-color: $black;
        color: $white;
        border-bottom: 1px solid $white;
        &:hover {
          background-color: $blue;
          color: $white;
        }
        &::after {
          content: ' ';
          height: 30px;
          display: block;
          position: absolute;
          width: 30px;
          background-repeat: no-repeat;
          right: 0rem;
          top: 0;
          background-size: cover;
          border: 1px solid $black;
          box-sizing: border-box;
        }
        &.perf1M::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.perf6M::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.perf1Y::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.volatility::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.rsi::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.rating::after {
          background-image: url(~@/assets/images/borsaItaliana.png);
        }
        &.mfRisk::after {
          background-image: url(~@/assets/images/milanoFinanza.png);
        }
        &.mfRsi::after {
          background-image: url(~@/assets/images/milanoFinanza.png);
        }
        &.mfRanking::after {
          background-image: url(~@/assets/images/milanoFinanza.png);
        }
        &.divYield::after {
          background-image: url(~@/assets/images/milanoFinanza.png);
        }
        &.shortTendency::after {
          background-image: url(~@/assets/images/ilSole24Ore.png);
        }
        &.mediumTendency::after {
          background-image: url(~@/assets/images/ilSole24Ore.png);
        }
      }
    }
  }
  &_arrows {
    text-align: right;
    font-size: 400%;
    line-height: 50%;
    margin-bottom: 1rem;
    span {
      cursor: pointer;
      background: $blue70perc;
      margin: 0 0.5rem;
      border: 1px solid $light-gray;
      &:hover {
        background: $blue;
      }
    }
  }
  &_listitem {
    padding: .6rem .2rem;
    display: flex;
    justify-content: space-between;
    &:nth-child(odd) {
      background-color: $blue20perc;
    }
  }
  &_list_wrap {
    height: 18.4rem;
    overflow: auto;
  }

  .filters_head {
    background-image: url(~@/assets/images/lab-min.jpg);
    text-align: center;
    padding: 5rem;
    margin-bottom: 4rem;
    margin-top: 9rem;
    color: white;
    position: relative;
    background-size: auto;
    background-position-y: center;
    &::before {
      content: ' ';
      background: rgba(0,0,0,0.6);
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 25%;
    }
    .titles {
      position: absolute;
      left: 20%;
      width: 60%;
      top: 5%;
      text-shadow: 1px 1px 6px black;
      h2 {
        margin-bottom: 0;
      }
      h3 {
        margin-top: 0.5rem;
      }
    }
  }

  .sentiment_head {
    background-image: url(~@/assets/images/lab-min.jpg);
    text-align: center;
    padding: 5rem;
    margin-bottom: 2rem;
    margin-top: 9rem;
    color: white;
    position: relative;
    background-size: auto;
    background-position-y: center;
    &::before {
      content: ' ';
      background: rgba(0,0,0,0.6);
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 25%;
    }
    .titles {
      position: absolute;
      left: 20%;
      width: 60%;
      top: 5%;
      text-shadow: 1px 1px 6px black;
      h2 {
        margin-bottom: 0;
      }
      h3 {
        margin-top: 0.5rem;
      }
    }
  }
  .sentiment_body {
    display: flex;
    justify-content: space-around;
    div {
      width: 23%;
      max-width: 20rem;
    }
    h3 {
      text-align: center;
    }
    img {
      border: 1px solid $light-gray;
      width: 100%;
    }
  }

  .sentiment {
    .credits {
      text-align: center;
      font-style: italic;
      font-size: 90%;
      a {
        color: $white
      }
    }
  }

  .stocks_filters {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  table.filter {
    width: 30%;
    margin-bottom: 4rem;
    caption {
      padding: .5rem 0;
      font-size: 1.2rem;
      background-color: $black;
      color: $white;
    }
    td, th {
      padding: .5rem;
      text-align: left;
    }
    tbody tr {
      &:nth-child(odd) {
        background-color: $blue20perc;
      }
    }
    thead {
      border-bottom: 1px solid $black;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 1280px) {
  .stocks_list > div {
    width: 22%;
  }
  .stocks_list > div h3::after{
    height: 28px;
    width: 28px;
  }
}
@media screen and (max-width: 1024px) {
  .stocks_list > div h3::after{
    height: 24px;
    width: 24px;
  }
  .stocks_list > div h3 {
    font-size: $font-size-normal;
  }
}
@media screen and (max-width: 768px) {
  .stocks_head_left {
    margin: 0;
    padding: 0 1rem;
    h2 {
      margin-bottom: 1rem;
    }
  }
  .stocks_list > div {
    width: 30%;
  }
  @media screen and (max-width: 414px) {
    .stocks_head {
      background-size: cover;
    }
    .stocks_head_left {
      background-color: rgba(0, 0, 0, 0.8);
    }
    .stocks_arrows {
      text-align: left;
      line-height: 150%;
    }
    .stocks_list > div {
      width: 43%;
    }
    .stocks_list > div h3::after{
      height: 20px;
      width: 20px;
    }
    .stocks_list > div h3 {
      text-align: left;
      padding-left: 0.5rem;
    }
  }
}
</style>
