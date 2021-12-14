<template>
  <header>
    <section>
      <div class="social">
        <a v-for="social in socials" :key="social.name" :href="social.url" class="icon" :class="social.name.toLowerCase()">
        <i :class="social.class"></i>
        </a >
      </div>
    </section>
    <section>
      <div class="logo">
        <router-link :to="{name: 'Home'}">{{project}}</router-link>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'CmpHeader',
  components: {
  },
  computed: {
    project () {
      return this.$store.getters.getProject.name
    },
    socials () {
      return this.$store.getters.getSocials
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  section {
    display: flex;
    justify-content: space-between;
    background-color: $white;
    padding: 1rem $view-padding;
    align-items: center;
  }
  section:first-child {
    justify-content: flex-end;
    background-color: $darker-gray;
    padding: .2rem $view-padding;
  }
  .social {
    i {
      margin-left: 1rem;
      font-size: $font-size-bigger;
    }
  }
  .logo {
    font-weight: bold;
    font-size: $font-size-bigger;
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
    text-shadow: $lighter-gray 0px 0px 1px;
    user-select: none;
    &::after{
      content: 'API';
      color: $red;
      position: absolute;
      font-size: $font-size-normal;
      font-family: 'Gloria Hallelujah', cursive;
      bottom: -4px;
      right: -24px;
      opacity: 0.7;
      text-shadow: $darkest-gray 0px 0px 1px;
    }
  }
}
</style>
