<template>
  <q-page class="flex column q-pa-md" style="max-width: 1200px; margin: 0 auto">

    <div v-if="!bookmarks.length" class="text-h5">まだブックマークしていません</div>
    <template v-else>
      <ranking-with-virtual-scroll v-if="$q.platform.is.mobile" :items="bookmarks"/>
      <ranking-with-paging v-else :items="bookmarks"/>
    </template>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import RankingWithPaging from '../components/list/ListWithPaging'
import RankingWithVirtualScroll from '../components/list/ListWithVirtualScroll'
import variables from '../../config/variables'

export default {
  name: 'PageBookmarks',
  components: { RankingWithVirtualScroll, RankingWithPaging },
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
  computed: {
    ...mapState({
      bookmarks: state => state.bookmark.bookmarks,
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN
    })
  }
}
</script>
