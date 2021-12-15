<template>
  <section class="api stock">
    <div class="banners">
      <div class="banner">
        <h3>{{ $t('api.stock.info.title') }}</h3>
          <h2>{{ $t('api.stock.info.title') }}</h2>
          <p class="url">{{ $t('api.stock.info.url') }}</p>
          <p class="desc">{{ $t('api.stock.info.desc') }}</p>
          <router-link class="button primary" :to="{name: 'Api', params: {id: 'info'}}">{{$t('api.moreInfo')}}</router-link>      </div>
      <div class="banner">
        <h3>{{ $t('api.stock.analysis.title') }}</h3>
          <h2>{{ $t('api.stock.analysis.title') }}</h2>
          <p class="url">{{ $t('api.stock.analysis.url') }}</p>
          <p class="desc">{{ $t('api.stock.analysis.desc') }}</p>
          <router-link class="button primary" :to="{name: 'Api', params: {id: 'analysis'}}">{{$t('api.moreInfo')}}</router-link>
      </div>
    </div>
    <div class="alphabet">
      <h2>{{ $t('ftseMib') }}</h2>
      <span v-for="letter in alphabet" :key="letter" @click="filterStockeByLetter(letter)">
        {{ letter }}
      </span>
    </div>
    <div class="stock-list">
      <div v-for="stock in filteredStocks" :key="stock.isin" class="stock">
        <router-link :to="{name: 'Stock', params: { isin: stock.isin }}">{{ stock.name }} - {{ stock.code }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { settings } from '@/settings.js'
export default {
  name: 'CmpApiStock',
  data () {
    return {
      alphabet: '#ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      stocks: [],
      filteredStocks: [],
      startLetter: 'A'
    }
  },
  methods: {
    filterStockeByLetter (letter) {
      if (!letter) this.filteredStocks = this.stocks
      this.filteredStocks = this.stocks.filter((stock) => {
        return stock.name[0] === letter
      })
    },
    getFsteMibStocks () {
      fetch(`${settings.apiEndpoint}/api/stocks`, {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.stocks = data
          this.filterStockeByLetter(this.startLetter)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  beforeMount () {
    this.getFsteMibStocks()
  }
}
</script>

<style scoped lang="scss">
.banners {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-size: cover;
  background-position: center;
  background-image: url(~@/assets/images/banner-2.jpeg);
}
.banner {
  width: 50%;
  margin: 3rem 5rem 3rem 5rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-bottom: 1px solid $white;
  color: $white;
  p {
    margin: 1.2rem 0;
    &.url {
      font-family: monospace;
    }
  }
}
.alphabet {
  margin: 3rem 0 1rem;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 0.3rem;
    cursor: pointer;
    font-size: $font-size-big;
    padding: .5rem;
    background-color: $white;
    border-radius: 50%;
    width: 1rem;
    &:hover {
      color: $white;
      background-color: $dark-gray;
    }
  }
}
.stock-list {
  width: 60%;
  margin: 0 auto;
  min-height: 15rem;
  border-bottom: 1px solid $light-gray;
  overflow-y: auto;
  div {
    text-align: center;
    margin-bottom: 1rem;
  }
}
</style>
