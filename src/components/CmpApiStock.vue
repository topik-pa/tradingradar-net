<template>
  <section class="api stock" id="stock">
    <div class="banners">
      <div class="banner">
        <h3 v-html="$t('api.stock.info.subtitle')"></h3>
        <h2 v-html="$t('api.stock.info.title')"></h2>
        <div class="media-icons">
          <img :src="require(`@/assets/images/borsaItaliana.png`)" :alt="$t(`borsaItaliana`)">
          <img :src="require(`@/assets/images/ilSole24Ore.png`)" :alt="$t(`sol24`)">
          <img :src="require(`@/assets/images/milanoFinanza.png`)" :alt="$t(`mFinanza`)">
          <img :src="require(`@/assets/images/soldiOnLine.png`)" :alt="$t(`sol`)">
          <img :src="require(`@/assets/images/teleBorsa.png`)" :alt="$t(`teleB`)">
        </div>
        <!--<p class="url">{{ $t('api.stock.info.url') }}</p> -->
        <p v-html="$t('api.stock.info.desc')" class="desc"></p>
        <!--<router-link class="button secondary" :to="{name: 'Api', params: {id: 'info'}}">{{$t('api.moreInfo')}}</router-link>-->
        <a class="button secondary" href="https://rapidapi.com/marcopavan.mp@gmail.com/api/tradingradar" target="_blank" rel="noopener noreferrer">{{$t('api.moreInfo')}}</a>
      </div>
      <div class="banner">
        <h3 v-html="$t('api.stock.analysis.subtitle')"></h3>
        <h2 v-html="$t('api.stock.analysis.title')"></h2>
        <div class="media-icons">
          <img :src="require(`@/assets/images/borsaItaliana.png`)" :alt="$t(`borsaItaliana`)">
          <img :src="require(`@/assets/images/ilSole24Ore.png`)" :alt="$t(`sol24`)">
          <img :src="require(`@/assets/images/milanoFinanza.png`)" :alt="$t(`mFinanza`)">
          <img :src="require(`@/assets/images/soldiOnLine.png`)" :alt="$t(`sol`)">
          <img :src="require(`@/assets/images/teleBorsa.png`)" :alt="$t(`teleB`)">
        </div>
        <!-- <p class="url">{{ $t('api.stock.analysis.url') }}</p> -->
        <p v-html="$t('api.stock.analysis.desc')" class="desc"></p>
        <!--<router-link class="button secondary" :to="{name: 'Api', params: {id: 'analysis'}}">{{$t('api.moreInfo')}}</router-link>-->
        <a class="button secondary" href="https://rapidapi.com/marcopavan.mp@gmail.com/api/tradingradar" target="_blank" rel="noopener noreferrer">{{$t('api.moreInfo')}}</a>
      </div>
      <div class="banner">
        <h3 v-html="$t('api.stock.news.subtitle')"></h3>
        <h2 v-html="$t('api.stock.news.title')"></h2>
        <div class="media-icons">
          <img :src="require(`@/assets/images/borsaItaliana.png`)" :alt="$t(`borsaItaliana`)">
          <img :src="require(`@/assets/images/milanoFinanza.png`)" :alt="$t(`mFinanza`)">
          <img :src="require(`@/assets/images/soldiOnLine.png`)" :alt="$t(`sol`)">
          <img :src="require(`@/assets/images/laRep.png`)" :alt="$t(`laRep`)">
        </div>
        <!-- <p class="url">{{ $t('api.stock.news.url') }}</p> -->
        <p v-html="$t('api.stock.news.desc')" class="desc"></p>
        <!--<router-link class="button secondary" :to="{name: 'Api', params: {id: 'analysis'}}">{{$t('api.moreInfo')}}</router-link>-->
        <a class="button secondary" href="https://rapidapi.com/marcopavan.mp@gmail.com/api/tradingradar" target="_blank" rel="noopener noreferrer">{{$t('api.moreInfo')}}</a>
      </div>
    </div>
    <div class="alphabet" id="alphabet">
      <h2>{{ $t('api.selectTitle') }}</h2>
      <h3>{{ $t('api.selectTitleSub') }}</h3>
      <span v-for="letter in alphabet" :key="letter" @click="filterStockeByLetter(letter)" :class="{'selected': letter === startLetter}">
        {{ letter }}
      </span>
    </div>
    <div class="stock-list" id="filters">
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
      this.startLetter = letter
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
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: stretch;
  background-size: cover;
  background-position: center;
  background-image: url(~@/assets/images/banner-2.jpeg);

  .media-icons img{
    width: 4rem;
    border: 1px solid $white;
    margin-right: 1rem;
  }
}
.banner {
  width: 40%;
  margin: 2rem 4rem 2rem 4rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-bottom: 1px solid $white;
  color: $white;
  p {
    margin: 1.2rem 0;
    line-height: 140%;
    &.url {
      font-family: monospace;
      background: $black;
      display: inline;
      padding: .3rem 1rem;
      border: 1px solid $gray;
    }
  }
  a {
    float: right;
  }
}
.alphabet {
  margin: 2rem 0 1rem;
  text-align: center;
  h2 {
    margin: 0;
  }
  h3 {
    margin-bottom: 2rem;
    margin-top: .3rem;
  }
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
    &.selected {
      color: $white;
      background-color: $dark-gray;
    }
  }
}
.stock-list {
  width: 60%;
  margin: 0 auto;
  min-height: 10rem;
  border-bottom: 1px solid $light-gray;
  overflow-y: auto;
  div {
    text-align: center;
    margin-bottom: 1rem;
  }
  a {
    font-weight: 550;
    text-decoration: underline;
  }
}

@media screen and (max-width: 1280px) {
  .banner {
    margin: 2rem 2rem 2rem 2rem;
  }
}
@media screen and (max-width: 414px) {
  .banner {
    width: 80%;
  }
}
</style>
