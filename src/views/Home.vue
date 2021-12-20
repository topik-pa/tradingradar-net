<template>
  <CmpHeader />
  <div class="view home">
    <CmpApiStock/>
    <CmpApiStocks/>
  </div>
  <CmpFooter />
</template>

<script>
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'
import CmpApiStocks from '@/components/CmpApiStocks'
import CmpApiStock from '@/components/CmpApiStock'

export default {
  name: 'Home',
  components: {
    CmpHeader,
    CmpFooter,
    CmpApiStocks,
    CmpApiStock
  },
  data () {
    return {}
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped lang="scss">
section {
  margin-bottom: 2rem;
}
</style>
