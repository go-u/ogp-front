<template>
  <q-virtual-scroll
    :items="freezedItems"
    scroll-target="body"
    :virtual-scroll-slice-size="15"
    :virtual-scroll-item-size="250"
    separator
    style="width: 100%"
  >
    <template v-slot="{ item, index }">
      <div class="q-py-sm" v-bind:key="index">
        <card :ogp="item"/>
      </div>
    </template>
  </q-virtual-scroll>
</template>

<script>
import Card from '../card/Card'

export default {
  name: 'ListWithVirtualScroll',
  components: { Card },
  props: ['items'],
  computed: {
    freezedItems () {
      return Object.freeze(this.items)
    }
  }
}
</script>
