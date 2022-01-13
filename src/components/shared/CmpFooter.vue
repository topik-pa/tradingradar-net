<template>
  <section class="disclaimer">
    ATTENZIONE: operare in Borsa e fare trading costituiscono azioni ad alto rischio. Le informazioni qui presentate non costituiscono una sollecitazione di acquisto o vendita di titoli azionari e si intendono per puro uso informativo. Il proprietario del presente sito non si dichiara responsabile di un utilizzo improprio delle informazioni qui ottenute.
  </section>
  <footer>
    <div class="privacy">
      <router-link :to="{name: 'Privacy'}">{{$t('menu.privacy')}}</router-link>
    </div>
    <div class="copy">
      {{project.name}} &copy; {{project.copyright}} <a href="https://www.linkedin.com/in/markopavan/">{{ author.name }} {{ author.surname }}</a>
    </div>
    <div class="fb-like" data-href="https://www.tradingradar.net" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div>
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
.disclaimer {
  text-align: center;
  margin-top: 10rem;
  padding: 1rem 2rem;
  font-style: italic;
  background-color: $lighter-gray;
  line-height: 120%;
}
footer {
  color: $white;
  background-color: $black;
  display: flex;
  justify-content: space-evenly;
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
