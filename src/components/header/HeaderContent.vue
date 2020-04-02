<template>
  <q-toolbar class="base-container">
    <q-toolbar-title>
      <q-btn :icon="$q.platform.is.mobile ? undefined : matBookmarkBorder" label="OGPギャラリー" flat class="text-weight-bolder" style="letter-spacing: 1px" size="lg" dense :to="{ name: 'top' }"/>
    </q-toolbar-title>

    <q-btn label="メニュー" color="amber-4" class="text-black" @click="$emit('left-drawer')"/>
  </q-toolbar>
</template>

<script>
import { matBookmark, matBookmarkBorder, matStars, matFiberNew } from '@quasar/extras/material-icons'
import { mapState } from 'vuex'
import variables from '../../../config/variables'

export default {
  name: 'HeaderContent',
  methods: {
    getLangQuery (lang) {
      return this.langMap(lang)
    },
    async logout () {
      await this.$store.dispatch('auth/Logout')
      window.location.href = '/'
    }
  },
  computed: {
    ...mapState({
      ogps: state => state.stat.stats,
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN,
      // icons
      matBookmark: () => matBookmark,
      matBookmarkBorder: () => matBookmarkBorder,
      matFiberNew: () => matFiberNew,
      matStars: () => matStars
    })
  }
}
</script>

<style lang="sass">
.show_indicator > div
  opacity: 1!important
</style>
