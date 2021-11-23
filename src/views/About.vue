<template>
  <CmpHeader />
  <div class="view about">
    <h1>This is about page</h1>
  </div>
  <CmpFooter />
</template>

<script>
import CmpHeader from '@/components/shared/CmpHeader'
import CmpFooter from '@/components/shared/CmpFooter'
export default {
  name: 'About',
  components: {
    CmpHeader,
    CmpFooter
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
