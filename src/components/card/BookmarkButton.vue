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
    @click.stop="hasBookMarked ? removeBookmark(ogp) : bookmark(ogp)"/>
</template>

<script>
import { mapState } from 'vuex'
import { matBookmarkBorder, matDone } from '@quasar/extras/material-icons'
import variables from '../../../config/variables'

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
      this.loading = false
      await this.$store.dispatch('bookmark/GetBookmarks')
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
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN,
      bookmarks: state => state.bookmark.bookmarks,
      matBookmarkBorder: () => matBookmarkBorder,
      matDone: () => matDone
    }),
    hasBookMarked () {
      if (this.bookmarks.length > 0) {
        const bookmarkIds = this.bookmarks.map(x => x.fqdn)
        return bookmarkIds.includes(this.ogp.fqdn)
      }
      return false
    }
  }
}
</script>
