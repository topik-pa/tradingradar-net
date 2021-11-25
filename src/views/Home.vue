<template>
  <CmpHeader />
  <div class="view home">
    <h2>Statistics</h2>
    <section class="stats">
      <div class="stat volatility" :class="volatility.status">
        <h3>Volatility</h3>
        <div v-for="stock in volatility.stocks" :key="stock.isin" class="stock">
          <span>{{ stock.name }}</span>
          <span>{{ stock.volatility }}</span>
        </div>
      </div>
      <div class="stat rsi" :class="rsi.status">
        <h3>RSI</h3>
        <div v-for="stock in rsi.stocks" :key="stock.isin" class="stock">
          <span>{{ stock.name }}</span>
          <span>{{ stock.rsi }}</span>
        </div>
      </div>
      <div class="stat performance" :class="performance.status">
        <h3>Performance (1M)</h3>
        <div v-for="stock in performance.stocks" :key="stock.isin" class="stock">
          <span>{{ stock.name }}</span>
          <span>{{ stock.perf1M }}</span>
        </div>
      </div>
      <div class="stat mfRisk" :class="mfRisk.status">
        <h3>Milano Finanza Risk</h3>
        <div v-for="stock in mfRisk.stocks" :key="stock.isin" class="stock">
          <span>{{ stock.name }}</span>
          <span>{{ stock.mfRisk }}</span>
        </div>
      </div>
    </section>
    <h2>ftse MIB</h2>
    <section class="fsteMIB">
      <div class="alphabet">
        <span v-for="letter in alphabet" :key="letter" @click="filterStockeByLetter(letter)">
          {{ letter }}
        </span>
      </div>
      <div class="list">
        <div v-for="stock in filteredStocks" :key="stock.isin" class="stock">
          {{ stock.name }}
        </div>
      </div>
    </section>
  </div>
  <CmpFooter />
</template>

<script>
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'
export default {
  name: 'Home',
  components: {
    CmpHeader,
    CmpFooter
  },
  data () {
    return {
      alphabet: '#ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      stocks: [],
      filteredStocks: [],
      startLetter: 'P',
      volatility: {
        maxResults: 5,
        status: 'idle',
        stocks: []
      },
      rsi: {
        maxResults: 5,
        status: 'idle',
        stocks: []
      },
      performance: {
        maxResults: 5,
        status: 'idle',
        stocks: []
      },
      mfRisk: {
        maxResults: 5,
        status: 'idle',
        stocks: []
      }
    }
  },
  methods: {
    filterStockeByLetter (letter) {
      // alert(letter)
      if (!letter) this.filteredStocks = this.stocks
      this.filteredStocks = this.stocks.filter((stock) => {
        return stock.name[0] === letter
      })
    },
    getFsteMibStocks () {
      fetch('http://localhost:8080/api/stocks', {
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
    },
    getStocksVolatility (num = 5) {
      this.volatility.status = 'loading'
      fetch('http://localhost:8080/api/stocks/volatility?order=desc', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.volatility.stocks = data
          this.volatility.status = 'success'
        })
        .catch(err => {
          console.error(err)
          this.volatility.status = 'error'
        })
    },
    getStocksRSI (num = 5) {
      this.rsi.status = 'loading'
      fetch('http://localhost:8080/api/stocks/rsi?order=desc', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.rsi.stocks = data
          this.rsi.status = 'success'
        })
        .catch(err => {
          console.error(err)
          this.rsi.status = 'error'
        })
    },
    getStocksPerformance (num = 5) {
      this.performance.status = 'loading'
      fetch('http://localhost:8080/api/stocks/perf1M?order=desc', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.performance.stocks = data
          this.performance.status = 'success'
        })
        .catch(err => {
          console.error(err)
          this.performance.status = 'error'
        })
    },
    getStocksMFRisk (num = 5) {
      this.mfRisk.status = 'loading'
      fetch('http://localhost:8080/api/stocks/mfRisk?order=desc', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.mfRisk.stocks = data
          this.mfRisk.status = 'success'
        })
        .catch(err => {
          console.error(err)
          this.mfRisk.status = 'error'
        })
    }
  },
  beforeMount () {
    this.getFsteMibStocks()
  },
  mounted () {
    // this.getStocksVolatility(this.volatility.maxResults)
    // this.getStocksRSI(this.rsi.maxResults)
    // this.getStocksPerformance(this.performance.maxResults)
    // this.getStocksMFRisk(this.mfRisk.maxResults)
  }
}
</script>

<style scoped lang="scss">
section {
  margin: 2rem 0;
}
.stats {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem 1rem;
  width: 100%;

  .stat {
    width: 12%;
  }
}

.stock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.alphabet {
  margin-bottom: 1rem;
  span {
    display: inline-block;
    margin: 0 0.5rem;
    cursor: pointer;

    &:hover {
      color: $light-gray;
    }
  }
}
</style>
