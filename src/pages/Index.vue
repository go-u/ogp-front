<template>
  <q-page class="flex column q-pa-md" style="max-width: 1200px; margin: 0 auto">

    <pickups v-if="$route.name==='top' && !($route.query.page > 1)" class="full-width q-py-sm"/>

    <template v-if="loading">
      <div class="text-center">
        <q-spinner-puff size="1.4rem" color="light-blue"/>
        ランキング読み込み中
      </div>
    </template>

    <template v-else>
      <q-btn label="シェアランキング" flat dense size="lg" class="self-center q-mb-xs" :to="{ name: 'about' }"><q-icon :name="matHelp" size="sm" color="grey"/></q-btn>
      <lang-filter class="self-center"/>
      <ranking-with-virtual-scroll v-if="$q.platform.is.mobile" :items="items"/>
      <ranking-with-paging v-else :items="items"/>
    </template>
  </q-page>
</template>

<script>
import variables from '../../config/variables'
import { mapState } from 'vuex'
import { matHelp } from '@quasar/extras/material-icons'
import RankingWithPaging from '../components/list/ListWithPaging'
import RankingWithVirtualScroll from '../components/list/ListWithVirtualScroll'
import LangFilter from '../components/top/LangFilter'
import Pickups from '../components/top/Pickups'

export default {
  name: 'PageIndex',
  components: { Pickups, LangFilter, RankingWithVirtualScroll, RankingWithPaging },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    // Login状態を監視して、ログイン後にBookmarkを取得
    '$store.state.auth.authState': {
      handler () {
        if (this.hasLogin) {
          this.$store.dispatch('bookmark/GetBookmarks')
        }
      },
      immediate: true
    }
  },
  created () {
    this.getRanking()
  },
  methods: {
    async getRanking () {
      this.loading = true
      await this.$store.dispatch('ogp/GetRanking')
      this.loading = false
    }
  },
  computed: {
    ...mapState({
      // svg icon
      matHelp: () => matHelp,
      // states
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN,
      rankingItems: state => state.ogp.rankingItems
    }),
    items () {
      const langOption = this.$route.query.lang
      const sortedItems = this.rankingItems.slice().sort((a, b) => b.count - a.count)
      if (!langOption) {
        return sortedItems
      } else {
        // filter items by lang
        const filterdItems = []
        for (const item of sortedItems) {
          if (item.lang === langOption) {
            filterdItems.push(item)
          }
        }
        return filterdItems
      }
    }
  }
}
</script>
