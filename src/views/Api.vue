<template>
  <CmpHeader />
  <div class="view api">
    api: {{ api }}
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
      api: this.$route.params.id
    }
  }
}
</script>

<style scoped lang="scss">
section {
  width: 100%;
  margin-bottom: 10rem;
}
</style>
