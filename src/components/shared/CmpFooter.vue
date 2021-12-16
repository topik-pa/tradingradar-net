<template>
  <footer>
    <div class="copy">
      {{project.name}} &copy; {{project.copyright}} <a :href="`mailto:${author.email}`">{{ author.name }} {{ author.surname }}</a>
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
  a {
    color: $white;
    margin: 0 .5rem;
    &.icon {
      font-size: 2rem;
    }
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
