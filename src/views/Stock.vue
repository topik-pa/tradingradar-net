<template>
  <CmpHeader />
  <div class="view stock">
    <section class="top">
      <h1>{{ info.data.name }}</h1>
      <h2>{{ info.data.code }} - {{ info.data.isin }}</h2>
    </section>

    <section class="infos" :class="info.status">
      <div class="info">
        <img :src="require(`@/assets/images/dividend.jpg`)" :alt="$t('dividend')">
        <div class="content">
          <h3>Dividendi</h3>
          <p>Div. Yield (%): <span>{{ info.data.divYield?.value }}</span></p>
          <p>Valore dividendo (€): <span>{{ info.data.lastDiv?.value }}</span></p>
          <p>Data ultimo: <span>{{ info.data.lastDivDate?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/minmax.jpg`)" :alt="$t('minMax')">
        <div class="content">
          <h3>Massimi e minimi</h3>
          <p>Media 20 gg: <span>{{ info.data.mm20days?.value }}</span></p>
          <p>Media 40 gg: <span>{{ info.data.mm40days?.value }}</span></p>
          <p>Media 100 gg: <span>{{ info.data.mm100days?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/average.jpg`)" :alt="$t('average')">
        <div class="content">
          <h3>Medie mobili</h3>
          <p>Massimo assoluto: <span>{{ info.data.absMax?.value }}</span></p>
          <p>Minimo assoluto: <span>{{ info.data.absMin?.value }}</span></p>
          <p>Massimo anno corrente: <span>{{ info.data.currentYearMax?.value }}</span></p>
          <p>Minimo anno corrente: <span>{{ info.data.currentYearMin?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/performance.jpg`)" :alt="$t('performance')">
        <div class="content">
          <h3>Performance</h3>
          <p>Performance (1 mese):  <span>{{ info.data.perf1M?.value }}</span></p>
          <p>Performance (6 mesi):<span>{{ info.data.perf6M?.value }}</span></p>
          <p>Performance (1 anno): <span>{{ info.data.perf1Y?.value }}</span></p>
          <p>Volatilità:  <span>{{ info.data.volatility?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <h3>Profilo</h3>
          <p>{{ info.data.profile?.value }}
            <a :href="info.data.profile?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </p>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <h3>Commenti</h3>
          <p>{{ info.data.comment?.value }}
            <a :href="info.data.comment?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </p>
        </div>
      </div>
    </section>

    <section class="analisys" :class="analisys.status">
      <div class="source borsaIt">
        <h3><a :href="analisys.data.borsaIt_support?.source">Borsa Italiana</a></h3>
        <ul>
          <li>Supporto: <strong>{{ analisys.data.borsaIt_support?.value }}</strong></li>
          <li>Resistenza: <strong>{{ analisys.data.borsaIt_resistance?.value }}</strong></li>
          <li>RSI: <strong>{{ analisys.data.borsaIt_rsi?.value }}</strong></li>
          <li>Valutazione: <strong>{{ analisys.data.borsaIt_evaluation?.value }}</strong>
          <br>
          <a :href="analisys.data.borsaIt_evaluation?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </li>
          <li>Rating: <strong>{{ analisys.data.borsaIt_rating?.value }}</strong></li>
        </ul>
      </div>
      <div class="source sol24">
        <h3><a :href="analisys.data.sol24_shortTendency?.source ">Il Sole 24 Ore</a></h3>
        <ul>
          <li>Tendenza a breve termine: <strong>{{ analisys.data.sol24_shortTendency?.value }}</strong></li>
          <li>Tendenza a medio termine: <strong>{{ analisys.data.sol24_mediumTendency?.value }}</strong></li>
        </ul>
      </div>
      <div class="source milFin">
        <h3><a :href="analisys.data.milFin_mfRanking?.source ">Milano Finanza</a></h3>
        <ul>
          <li>Rating: <strong>{{ analisys.data.milFin_mfRanking?.value }}</strong></li>
          <li>Risk: <strong>{{ analisys.data.milFin_mfRisk?.value }}</strong></li>
          <li>RSI: <strong>{{ analisys.data.milFin_rsi?.value }}</strong></li>
        </ul>
      </div>
      <div class="source teleb">
        <h3><a :href="analisys.data.teleb_support?.source ">Teleborsa</a></h3>
        <ul>
          <li>Supporto: <strong>{{ analisys.data.teleb_support?.value }}</strong></li>
          <li>Resistenza: <strong>{{ analisys.data.teleb_resistance?.value }}</strong></li>
          <li>Trend: <strong>{{ analisys.data.teleb_trend?.value }}</strong>
          <br>
          <a :href="analisys.data.teleb_trend?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </li>
        </ul>
      </div>
    </section>

    <section class="news" :class="news.status">
      <h2>{{ $t('pressRel') }}</h2>
      <div v-for="(item, i) in news.data" :key="i" class="news-item">
        <h3><a :href="item.url" :title="item.title ">{{ item.title }}</a></h3>
      </div>
    </section>
  </div>
  <CmpFooter />
</template>

<script>
import { settings } from '@/settings.js'
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'
export default {
  name: 'Stock',
  components: {
    CmpHeader,
    CmpFooter
  },
  data () {
    return {
      isin: this.$route.params.isin,
      info: {
        status: 'idle',
        data: {}
      },
      analisys: {
        status: 'idle',
        data: {}
      },
      news: {
        status: 'idle',
        data: {}
      }
    }
  },
  methods: {
    getStockInfo () {
      this.info.status = 'loading'
      fetch(`${settings.apiEndpoint}/api/info/` + this.isin, {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.info.data = data
          this.info.status = 'success'
          this.getStockAnalysis()
        })
        .catch(err => {
          console.error(err)
          this.info.status = 'error'
        })
    },
    getStockAnalysis () {
      this.analisys.status = 'loading'
      fetch('http://localhost:8080/api/analysis/' + this.isin, {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.analisys.data = data
          this.analisys.status = 'success'
          this.getStockNews()
        })
        .catch(err => {
          console.error(err)
          this.analisys.status = 'error'
        })
    },
    getStockNews () {
      this.news.status = 'loading'
      fetch('http://localhost:8080/api/news/' + this.isin, {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.news.data = data
          this.news.status = 'success'
        })
        .catch(err => {
          console.error(err)
          this.news.status = 'error'
        })
    }
  },
  beforeMount () {
    this.getStockInfo()
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped lang="scss">

.infos, .analisys, .news {
  margin: 0 2rem 6rem;
}
.top {
  color: $white;
  text-align: center;
  background-image: url(~@/assets/images/breadcrumbs-image-4.jpg);
  text-shadow: $black 0px 0px 10px;
  h1 {
    margin: 1rem 0;
    font-weight: bold;
  }
}
.infos {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h3 {
    border-bottom: 1px solid $black;
  }
  .info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5rem;
    width: 48%;
    img {
      margin-right: 2rem;
    }
    .content{
      width: 100%;
      span {
        float: right;
        font-style: italic;
        font-weight: 550;
      }
      p {
        margin-bottom: .5rem;
        line-height: 140%;
      }
    }
  }
}

.analisys {
  display: flex;
  justify-content: space-between;
  .borsaIt h3::before {
    background-image: url(~@/assets/images/borsaItaliana.png);
  }
  .sol24 h3::before {
    background-image: url(~@/assets/images/ilSole24Ore.png);
  }
  .milFin h3::before {
    background-image: url(~@/assets/images/milanoFinanza.png);
  }
  .teleb h3::before {
    background-image: url(~@/assets/images/teleBorsa.png);
  }
  h3 {
    position: relative;
    padding-left: 4rem;
    height: 3rem;
    line-height: 3rem;
    &::before {
      content: ' ';
      position: absolute;
      width: 3rem;
      height: 3rem;
      background-size: cover;
      left: 0;
    }
  }
  ul {
    li {
      clear: both;
      margin-bottom: .6rem;
      line-height: 140%;
      strong {
        font-weight: 550;
        float: right;
        font-style: italic;
      };
    }
  }
}
.source {
  width: 23%;
}

.news {
  text-align: center;
  h2 {
    border-bottom: 1px solid black;
    margin: 0 25%;
    padding-bottom: 0.3rem;
  }
  h3 {
    margin-bottom: .1rem;
  }
  .news-item {
    margin-bottom: 1.5rem;
  }
}

</style>
