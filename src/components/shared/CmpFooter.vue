<template>
  <footer>
    <div class="copy">
      {{project.name}} &copy; {{project.copyright}} <a href="https://www.linkedin.com/in/markopavan/">{{ author.name }} {{ author.surname }}</a><br> <router-link :to="{name: 'Privacy'}">{{$t('menu.privacy')}}</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CmpFooter',
  computed: {
    project () {
      return this.$store.getters.getProject
    },
    author () {
      return this.$store.getters.getAuthor
    },
    socials () {
      return this.$store.getters.getSocials
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
  color: $white;
  background-color: $black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .5rem;
  margin-top: 2rem;
  a {
    margin: 0 .5rem;
    &.icon {
      font-size: 2rem;
    }
  }
  .copy {
    text-align: center;
    line-height: 130%;
  }
}
@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
    div {
      padding: .5rem 0;
      &.copy {
        order: 1;
        margin-top: 1rem;
      }
    }
  }
}
</style>
