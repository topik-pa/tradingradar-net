<template>
  <CmpHeader />
  <div class="view contacts">
    <h1>Contatti</h1>
    <h3>Questioni tecniche?</h3>
    <p><a :href="`mailto:info@tradingradar.net`">info@tradingradar.net</a></p>
    <h3>Questioni personali?</h3>
    <p><a :href="`mailto:marco@tradingradar.net`">marco@tradingradar.net</a></p>
  </div>
  <CmpFooter />
</template>

<script>
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'
export default {
  name: 'Privacy',
  components: {
    CmpHeader,
    CmpFooter
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
.contacts {
  padding: 2rem;
}
</style>
