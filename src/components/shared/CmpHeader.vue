<template>
  <header>
    <section>
      <div class="donate">
        <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="DTPB2B56AL994" />
        <input type="image" src="https://www.paypalobjects.com/it_IT/IT/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Fai una donazione con il pulsante PayPal" />
        <img alt="" border="0" src="https://www.paypal.com/it_IT/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
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
      <CmpMenu/>
    </section>
  </header>
</template>

<script>
import CmpMenu from '@/components/shared/CmpMenu'
export default {
  name: 'CmpHeader',
  components: {
    CmpMenu
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
    padding: 1rem $view-padding $view-padding;
    align-items: center;
  }
  section:first-child {
    justify-content: space-between;
    background-color: $darker-gray;
    padding: 0 $view-padding;
  }
  .donate {
    background: $lighter-gray;
    border: 2px solid $gray;
    padding-top: 2px;
    padding-left: 5px;
    padding-right: 5px;
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
