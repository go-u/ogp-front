<template>
  <q-page class="flex flex-center">
    <div v-if="$route.name==='bookmarks' && bookmarks.length === 0" class="text-h5">まだブックマークしていません</div>
    <div class="q-pa-lg row justify-center q-gutter-lg">
      <q-card v-for="ogp in ogpInfos" v-bind:key="ogp.id" class="ogp-card" v-show="$route.name!=='bookmarks' || hasBookMarked(ogp)">
        <q-img :ratio="16/9" :src="ogp.image">
          <bookmark-button v-if="hasLogin" :ogp="ogp"/>
          <q-btn v-else round color="light-blue" :icon="matBookmarkBorder"  size="lg" class="absolute-top-right q-ma-sm" dense push style="opacity: .6" :to="{ name: 'auth' }"/>
          <q-btn v-if="hasLogin && ogp.user_id === user.id" icon="delete" dense round color="white" class="absolute-bottom-right text-black q-ma-sm" @click="deleteOgp(ogp)"/>
        </q-img>

        <q-card-section>
          <div class="text-h6 ellipsis">{{ ogp.title }}</div>
          <a :href="ogp.url" target="_blank" style="text-decoration: unset"><div class="text-subtitle2 text-grey-7 ellipsis">{{ ogp.url }} <q-icon :name="matOpenInNew" style="bottom: 1px"/></div></a>
          <q-badge floating v-if="ogp.bookmarks" class="text-caption" transparent>
            {{ ogp.bookmarks }}ブックマーク
          </q-badge>
        </q-card-section>

        <q-card-section class="q-pt-none ellipsis">
          {{ ogp.description }}
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<script>
import config from '../../config/config'
import { mapState } from 'vuex'
import { matBookmarkBorder, matDone, matOpenInNew } from '@quasar/extras/material-icons'
import BookmarkButton from '../components/ogp/BookmarkButton'

export default {
  name: 'PageIndex',
  components: { BookmarkButton },
  data () {
    return {
      text: ''
    }
  },
  watch: {
    '$store.state.auth.authState': {
      handler: function (authState, from) {
        if (this.hasLogin) {
          this.$store.dispatch('bookmark/GetBookmarks')
        }
      },
      immediate: true
    },
    $route: {
      handler: function () {
        this.$store.dispatch('ogp/Get')
      },
      immediate: true
    }
  },
  methods: {
    hasBookMarked (ogp) {
      if (this.bookmarks.length > 0) {
        const bookmarkIds = this.bookmarks.map(x => x.id)
        return bookmarkIds.includes(ogp.id)
      }
      return false
    },
    async deleteOgp (ogp) {
      await this.$store.dispatch('ogp/Delete', { payload: ogp })
      await this.$store.dispatch('ogp/Get')
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      bookmarks: state => state.bookmark.bookmarks,
      ogps: state => state.ogp.ogps,
      hasLogin: state => state.auth.authState === config.AUTH_STATE_LOGIN,
      matBookmarkBorder: () => matBookmarkBorder,
      matDone: () => matDone,
      matOpenInNew: () => matOpenInNew
    }),
    ogpInfos () {
      if (this.$route.name === 'bookmarks') {
        return this.bookmarks
      } else if (this.$route.query.order === 'newer') {
        const ogpInfos = this.ogps.slice()
        ogpInfos.sort(function (a, b) {
          return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        })
        console.log(ogpInfos)
        return ogpInfos
      } else {
        return this.ogps
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ogp-card
  width: 100%
  max-width: 300px
</style>
