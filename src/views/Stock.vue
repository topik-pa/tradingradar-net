<template>
  <CmpHeader />
  <div class="view stock">
    <section class="top">
      <h1>{{ info.data.name }}</h1>
      <h2>{{ info.data.code }} - {{ info.data.isin }}</h2>
    </section>

    <section class="alerts">
      <div v-if="lastPrice && lastPrice > info.data.mm20days?.value" class="low">
        Il prezzo corrente (€{{lastPrice}}) è più alto della media a 20 giorni (€{{info.data.mm20days?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice < info.data.mm20days?.value" class="low">
        Il prezzo corrente (€{{lastPrice}}) è più basso della media a 20 giorni (€{{info.data.mm20days?.value}}).
      </div>

      <div v-if="lastPrice && lastPrice > info.data.mm20days?.value && lastPrice > info.data.mm40days?.value" class="medium">
        Il prezzo corrente (€{{lastPrice}}) è più alto della media a 40 giorni (€{{info.data.mm40days?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice < info.data.mm20days?.value && lastPrice < info.data.mm40days?.value" class="medium">
        Il prezzo corrente (€{{lastPrice}}) è più basso della media a 40 giorni (€{{info.data.mm40days?.value}}).
      </div>

      <div v-if="lastPrice && lastPrice > info.data.mm20days?.value && lastPrice > info.data.mm40days?.value && lastPrice > info.data.mm100days?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è più alto della media a 100 giorni (€{{info.data.mm100days?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice < info.data.mm20days?.value && lastPrice < info.data.mm40days?.value && lastPrice < info.data.mm100days?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è più basso della media a 100 giorni (€{{info.data.mm100days?.value}}).
      </div>

      <div v-if="lastPrice && lastPrice > analisys.data.borsaIt_resistance?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è superiore alla resistenza indicata da Borsa Italiana (€{{analisys.data.borsaIt_resistance?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice < analisys.data.borsaIt_support?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è inferiore al supporto indicato da Borsa Italiana (€{{analisys.data.borsaIt_support?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice > analisys.data.teleb_tbResistance?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è superiore alla resistenza indicata da Teleborsa (€{{analisys.data.teleb_tbResistance?.value}}).
      </div>
      <div v-if="lastPrice && lastPrice < analisys.data.teleb_tbSupport?.value" class="high">
        Il prezzo corrente (€{{lastPrice}}) è inferiore al supporto indicato da Teleborsa (€{{analisys.data.teleb_tbSupport?.value}}).
      </div>
    </section>

    <section class="infos" :class="info.status">
      <div class="info">
        <img :src="require(`@/assets/images/dividend.jpg`)" :alt="$t('dividend')">
        <div class="content">
          <h3>{{ $t('dividend') }} <small>({{ $t('from') }} <a :href="info.data.divYield?.source" target="_blank" rel="noopener noreferrer">{{ $t('mFinanza') }}</a>)</small></h3>
          <p>{{ $t('divYield') }}<span>{{ info.data.divYield?.value }}</span></p>
          <p>{{ $t('divVal') }}<span>{{ info.data.lastDiv?.value }}</span></p>
          <p>{{ $t('divLast') }}<span>{{ info.data.lastDivDate?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/average.jpg`)" :alt="$t('average')">
        <div class="content">
          <h3>{{ $t('average') }} <small>({{ $t('from') }} <a :href="info.data.mm20days?.source" target="_blank" rel="noopener noreferrer">{{ $t('sol24') }}</a>)</small></h3>
          <p>{{ $t('mm20') }}<span>{{ info.data.mm20days?.value }}</span></p>
          <p>{{ $t('mm40') }}<span>{{ info.data.mm40days?.value }}</span></p>
          <p>{{ $t('mm100') }}<span>{{ info.data.mm100days?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/minmax.jpg`)" :alt="$t('minMax')">
        <div class="content">
          <h3>{{ $t('minMax') }} <small>({{ $t('from') }} <a :href="info.data.absMax?.source" target="_blank" rel="noopener noreferrer">{{ $t('sol') }}</a>)</small></h3>
          <p>{{ $t('absMax') }}<span>{{ info.data.absMax?.value }}</span></p>
          <p>{{ $t('absMin') }}<span>{{ info.data.absMin?.value }}</span></p>
          <p>{{ $t('yMax') }}<span>{{ info.data.currentYearMax?.value }}</span></p>
          <p>{{ $t('yMin') }}<span>{{ info.data.currentYearMin?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <img :src="require(`@/assets/images/performance.jpg`)" :alt="$t('performance')">
        <div class="content">
          <h3>{{ $t('performance') }} <small>({{ $t('from') }}<a :href="info.data.perf1M?.source" target="_blank" rel="noopener noreferrer">{{ $t('borsaItaliana') }}</a>)</small></h3>
          <p>{{ $t('perf1M') }}<span>{{ info.data.perf1M?.value }}</span></p>
          <p>{{ $t('perf6M') }}<span>{{ info.data.perf6M?.value }}</span></p>
          <p>{{ $t('perf1Y') }}<span>{{ info.data.perf1Y?.value }}</span></p>
          <p>{{ $t('volatility') }} <span>{{ info.data.volatility?.value }}</span></p>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <h3>{{ $t('profile') }}</h3>
          <p>{{ info.data.profile?.value }}
            <a :href="info.data.profile?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </p>
        </div>
      </div>
      <div class="info">
        <div class="content">
          <h3>{{ $t('comments') }}</h3>
          <p>{{ info.data.comment?.value }}
            <a :href="info.data.comment?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </p>
        </div>
      </div>
    </section>

    <section class="analisys" :class="analisys.status">
      <div class="source borsaIt">
        <h3><a :href="analisys.data.borsaIt_support?.source">{{ $t('borsaItaliana') }}</a></h3>
        <ul>
          <li>{{ $t('resistance') }}: <strong>{{ analisys.data.borsaIt_resistance?.value }}</strong></li>
          <li>{{ $t('support') }}: <strong>{{ analisys.data.borsaIt_support?.value }}</strong></li>
          <li>{{ $t('rsi') }}: <strong>{{ analisys.data.borsaIt_rsi?.value }}</strong></li>
          <li>{{ $t('evaluation') }}: <strong>{{ analisys.data.borsaIt_evaluation?.value }}</strong>
          <br>
          <a :href="analisys.data.borsaIt_evaluation?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </li>
          <li>{{ $t('rating') }}: <strong>{{ analisys.data.borsaIt_rating?.value }}<small>/4</small></strong></li>
        </ul>
      </div>
      <div class="source sol24">
        <h3><a :href="analisys.data.sol24_shortTendency?.source ">{{ $t('sol24') }}</a></h3>
        <ul>
          <li>{{ $t('shortTendency') }}: <strong>{{ analisys.data.sol24_shortTendency?.value }}</strong></li>
          <li>{{ $t('mediumTendency') }}: <strong>{{ analisys.data.sol24_mediumTendency?.value }}</strong></li>
        </ul>
      </div>

      <div class="source sol">
        <h3><a :href="analisys.data.sol_lastTargetPrice?.source ">{{ $t('sol') }}</a></h3>
        <ul>
          <li>{{ $t('targetPrice') }}: <strong>{{ analisys.data.sol_lastTargetPrice?.value }}</strong></li>
          <li>{{ $t('judgement') }}: <strong>{{ analisys.data.sol_lastJudgment?.value }}</strong></li>
        </ul>
      </div>

      <div class="source milFin">
        <h3><a :href="analisys.data.milFin_mfRanking?.source ">{{ $t('mFinanza') }}</a></h3>
        <ul>
          <li>{{ $t('ratingEdges') }}: <strong>{{ analisys.data.milFin_mfRanking?.value }}</strong></li>
          <li>{{ $t('riskEdges') }}: <strong>{{ analisys.data.milFin_mfRisk?.value }}</strong></li>
          <li>{{ $t('rsi') }}: <strong>{{ analisys.data.milFin_mfRsi?.value }}</strong></li>
        </ul>
      </div>
      <div class="source teleb">
        <h3><a :href="analisys.data.teleb_tbSupport?.source ">{{ $t('teleB') }}</a></h3>
        <ul>
          <li>{{ $t('resistance') }}: <strong>{{ analisys.data.teleb_tbResistance?.value }}</strong></li>
          <li>{{ $t('support') }}: <strong>{{ analisys.data.teleb_tbSupport?.value }}</strong></li>
          <li>{{ $t('trend') }}: <strong>{{ analisys.data.teleb_trend?.value }}</strong>
          <br>
          <a :href="analisys.data.teleb_trend?.source" :title="$t('continue')">{{ $t('continue') }}</a>
          </li>
        </ul>
      </div>
    </section>

    <section class="news" :class="news.status">
      <h2>{{ $t('pressRel') }} {{ info.data.name }} </h2>
      <div v-for="(item, i) in news.data" :key="i" class="news-item">
        <h3><a target="_blank" rel="noopener noreferrer" :href="item.url" :title="item.title ">{{ item.title }}</a></h3>
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
      isin: this.$route.query.isin || this.$route.params.isin,
      lastPrice: undefined,
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
          if (response.status !== 200) {
            this.$router.push({ name: 'Home' })
          }
          return response.json()
        })
        .then(data => {
          this.info.data = data
          this.info.status = 'success'
          this.lastPrice = this.info.data.lastPrice.value
          this.getStockAnalysis()
        })
        .catch(err => {
          console.error(err)
          this.info.status = 'error'
        })
    },
    getStockAnalysis () {
      this.analisys.status = 'loading'
      fetch(`${settings.apiEndpoint}/api/analysis/` + this.isin, {
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
      fetch(`${settings.apiEndpoint}/api/news/` + this.isin, {
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
  background-image: url(~@/assets/images/stock-min.jpeg);
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
    margin-top: 5rem;
    width: 48%;
    img {
      margin-right: 2rem;
      width: 30%;
    }
    .content{
      width: 70%;
      span {
        float: right;
        font-style: italic;
        font-weight: 550;
      }
      p {
        padding: .3rem;
        line-height: 140%;
        &:nth-child(even) {
          background-color: rgba(0, 0, 0, 0.1)
        }
      }
    }
  }
}

.analisys {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .borsaIt h3::before {
    background-image: url(~@/assets/images/borsaItaliana.png);
  }
  .sol h3::before {
    background-image: url(~@/assets/images/soldiOnLine.png);
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
  width: 30%;
  margin-bottom: 4rem;
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

.alerts {
  div {
    padding: .3rem 2rem;
    text-align: center;
    border-bottom: 1px solid $lighter-gray;
    font-style: italic;
    &.low {
      background-color: rgba(0, 255, 0, 0.1);
    }
    &.medium {
      background-color: rgba(255, 255, 0, 0.1);
    }
    &.high {
      background-color: rgba(255, 0, 0, 0.1);
    }
  }
}

@media screen and (max-width: 768px) {
  .infos .info {
    width: 90%;
    align-items: center;
  }
  .analisys {
    display: block;
  }
  .source {
    width: 100%;
    margin-bottom: 5rem;
  }
}

</style>
