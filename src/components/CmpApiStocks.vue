<template>
  <section class="api stocks" :class="selectedAPI.name">
    <div class="stocks_head">
      <div class="stocks_head_left">
        <h3 v-html="$t(`api.stocks.${selectedAPI.name}.subtitle`)"></h3>
        <h2 v-html="$t(`api.stocks.${selectedAPI.name}.title`)"></h2>
        <p class="url">{{ $t(`api.stocks.${selectedAPI.name}.url`) }}</p>
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
          stocks: []
        },
        {
          id: 11,
          name: 'mediumTendency',
          key: 'sol24_mediumTendency',
          maxResults: 5,
          status: 'idle',
          source: 'ilSole24Ore',
          stocks: []
        }
      ]
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
        })
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
}
</style>
