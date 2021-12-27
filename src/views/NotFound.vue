<template>
  <CmpHeader />
  <div class="view notfound">
    <h2>Questa pagina non esiste più</h2>
    <p>Torna in <strong><router-link :to="{name: 'Home'}">HOME PAGE</router-link></strong> per accedere ai nuovi contenuti del sito.</p>
  </div>
  <CmpFooter />
</template>

<script>
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'

export default {
  name: 'NotFound',
  components: {
    CmpHeader,
    CmpFooter
  },
  data () {
    return {}
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  created () {
    setTimeout(() => {
      this.$router.push({ name: 'Home' })
    }, 1000 * 3)
  }
}
</script>

<style scoped lang="scss">
.notfound {
  padding: 2rem;
}
</style>
