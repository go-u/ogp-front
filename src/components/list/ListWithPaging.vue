<template>
  <div style="width: 100%">
    <div class="q-pt-md row q-gutter-y-xl justify-start">
      <card v-for="ogp in freezedItems" v-bind:key="ogp.fqdn" :ogp="ogp" style="width: 30%" class="f-item"/>
    </div>

    <div v-if="items.length > 0" class="q-pa-lg flex flex-center">
      <q-pagination
        :value="page"
        color="black"
        :max="maxPage"
        :max-pages="maxPage > 9 ? 9 : maxPage"
        :boundary-numbers="false"
        :to-fn="page => ({ query: { page, lang: $route.query.lang } })"
      >
      </q-pagination>
    </div>

  </div>
</template>

<script>
import variables from '../../../config/variables'
import Card from '../card/Card'

export default {
  name: 'ListWithPaging',
  components: { Card },
  props: ['items'],
  computed: {
    page () {
      return parseInt(this.$route.query.page, 10) || 1
    },
    maxPage () {
      return Math.floor(this.items.length / variables.PAGING_SIZE) + 1
    },
    freezedItems () {
      const items = this.items.slice((this.page - 1) * variables.PAGING_SIZE, (this.page) * variables.PAGING_SIZE)
      return Object.freeze(items)
    },
    langMap () {
      return variables.langMap
    }
  }
}
</script>

<style lang="sass">
  .f-item
    margin-right: 5%

  .f-item:nth-child(3n)
    margin-right: 0
</style>
