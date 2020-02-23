<template>
  <q-btn
    v-if="hasLogin"
    dense
    round
    push
    :loading="loading"
    size="lg"
    color="light-blue"
    class="absolute-top-right q-ma-sm"
    :icon="hasBookMarked ? matDone : matBookmarkBorder"
    :style="hasBookMarked ? `` : 'opacity: .6'"
    @click="hasBookMarked ? removeBookmark(ogp) : bookmark(ogp)"/>
</template>

<script>
import { mapState } from 'vuex'
import { matBookmarkBorder, matDone } from '@quasar/extras/material-icons'
import config from '../../../config/config'

export default {
  name: 'BookmarkButton',
  data () {
    return {
      loading: false
    }
  },
  props: ['ogp'],
  methods: {
    async bookmark (ogp) {
      this.loading = true
      await this.$store.dispatch('bookmark/Add', { payload: ogp })
      await this.$store.dispatch('bookmark/GetBookmarks')
      this.loading = false
    },
    async removeBookmark (ogp) {
      this.loading = true
      await this.$store.dispatch('bookmark/Delete', { payload: ogp })
      await this.$store.dispatch('bookmark/GetBookmarks')
      this.loading = false
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      hasLogin: state => state.auth.authState === config.AUTH_STATE_LOGIN,
      bookmarks: state => state.bookmark.bookmarks,
      matBookmarkBorder: () => matBookmarkBorder,
      matDone: () => matDone
    }),
    hasBookMarked () {
      if (this.bookmarks.length > 0) {
        const bookmarkIds = this.bookmarks.map(x => x.id)
        return bookmarkIds.includes(this.ogp.id)
      }
      return false
    }
  }
}
</script>
