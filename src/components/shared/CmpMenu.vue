<template>
    <nav v-show="isMenuOpen">
      <router-link :to="{name: 'Contacts'}">{{$t('menu.contacts')}}</router-link>
    </nav>
    <i class="icon-menu" @click="toggleMenu"></i>
</template>

<script>
export default {
  name: 'CmpMenu',
  data () {
    return {
      isMenuOpen: true
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  created () {
    if (screen.width <= this.$store.getters.getProject.mobile) this.isMenuOpen = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav a {
  margin-left: 3rem;
  font-weight: 550;
}
.icon-menu {
  display: none;
  font-size: 2.5rem;
  color: $black;
}
@media screen and (max-width: 768px) {
  nav {
    position: absolute;
    top: $header-height;
    right: 0;
    width: 100%;
    background: $darker-gray;
      a {
        display: block;
        padding: 1rem;
        font-weight: 550;
        border-bottom: 1px solid $black;
        margin: 0;
      }
    }
  .icon-menu {
    display: block;
  }
}
</style>
