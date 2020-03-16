<template>
  <q-card v-show="$route.name!=='bookmarks' || hasBookMarked(ogp)" @click="$router.push({ name: 'detail', params: { fqdn: ogp.fqdn }})">
    <q-img :ratio="16/9" :src="ogp.image">
      <bookmark-button v-if="hasLogin" :ogp="ogp"/>
      <q-btn v-else round color="light-blue" :icon="matBookmarkBorder"  size="lg" class="absolute-top-right q-ma-sm" dense push style="opacity: .6" :to="{ name: 'auth' }"/>

      <template v-if="!ogp.image.length" v-slot:default>
        <div class="absolute-full flex flex-center bg-white text-black text-h5">
          サンプルをチェック
          <q-img src="/statics/images/illust/ac-illust/901310.png" width="18%"/>
          <bookmark-button v-if="hasLogin" :ogp="ogp"/>
          <q-btn v-else round color="light-blue" :icon="matBookmarkBorder"  size="lg" class="absolute-top-right q-ma-sm" dense push style="opacity: .6" :to="{ name: 'auth' }"/>
        </div>
      </template>

      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-white text-black text-h5">
          OGP画像エラー
          <q-img src="/statics/images/illust/ac-illust/901317.png" width="18%"/>
          <bookmark-button v-if="hasLogin" :ogp="ogp"/>
          <q-btn v-else round color="light-blue" :icon="matBookmarkBorder"  size="lg" class="absolute-top-right q-ma-sm" dense push style="opacity: .6" :to="{ name: 'auth' }"/>
        </div>
      </template>
    </q-img>

    <q-card-section class="q-pb-sm">
      <div class="text-h6 ellipsis">{{ ogp.title }}</div>
      <div class="text-subtitle2 text-grey-7 ellipsis">{{ ogp.fqdn }}</div>
      <q-badge floating v-if="$route.name === 'top'" class="text-body2">
        {{ ogp.count }}シェア+
      </q-badge>
    </q-card-section>

    <q-card-section class="q-pt-none ellipsis">
      {{ ogp.description }}
    </q-card-section>

  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import { matBookmarkBorder } from '@quasar/extras/material-icons'
import variables from '../../../config/variables'
import BookmarkButton from './BookmarkButton'

export default {
  name: 'Card',
  components: { BookmarkButton },
  props: ['ogp'],
  data () {
    return {
      error: false
    }
  },
  methods: {
    hasBookMarked (ogp) {
      if (this.bookmarks.length) {
        const bookmarkIds = this.bookmarks.map(x => x.fqdn)
        return bookmarkIds.includes(ogp.fqdn)
      }
      return false
    }
  },
  computed: {
    ...mapState({
      bookmarks: state => state.bookmark.bookmarks,
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN,
      matBookmarkBorder: () => matBookmarkBorder
    })
  }
}
</script>
