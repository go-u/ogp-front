<template>
  <q-header class="bg-grey-9 text-white" height-hint="98">
    <q-toolbar class="base-container">
      <q-toolbar-title>
        <q-avatar v-if="$store.state.auth.authState === 'AUTH_STATE_LOGIN'" class="bg-white q-mr-xs" style="padding: unset;" @click="$emit('left-drawer')">
          <img :src="$store.state.auth.user.avatar" style="border: solid black 1px"/>
        </q-avatar>

        <q-btn :icon="$store.state.auth.authState === 'AUTH_STATE_LOGIN' ? undefined : matBookmarkBorder" label="OGP GAL" flat class="text-amber-4 text-weight-bolder" style="letter-spacing: 1px" size="lg" dense :to="{ name: 'top' }"/>
      </q-toolbar-title>
      <q-tabs v-if="!$q.platform.is.mobile" inline-label align="right">
        <q-route-tab :icon="matStars" :class="$route.name==='top' && !$route.query.order ? 'show_indicator' : ''" :to="{ name: 'top', query: { order: 'popular' } }" label="人気順"/>
        <q-route-tab :icon="matFiberNew" :to="{ name: 'top', query: { order: 'newer' } }" label="新着順" />
        <q-route-tab :icon="matBookmark" :to="{ name: 'bookmarks' }" label="ブックマーク" />
      </q-tabs>

      <q-btn-dropdown v-if="$q.platform.is.mobile && $store.state.auth.authState === 'AUTH_STATE_LOGIN'" stretch flat dense label="カテゴリー">
        <q-list>
          <q-item exact clickable v-close-popup tabindex="0" :class="$route.name==='top' && !$route.query.order ? 'text-blue' : ''" :to="{ name: 'top', query: { order: 'popular' } }">
            <q-item-section avatar>
              <q-avatar :icon="matStars"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>人気順</q-item-label>
            </q-item-section>
          </q-item>
          <q-item exact clickable v-close-popup tabindex="0" :to="{ name: 'top', query: { order: 'newer' } }">
            <q-item-section avatar>
              <q-avatar :icon="matFiberNew"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>新着順</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup tabindex="0" :to="{ name: 'bookmarks' }">
            <q-item-section avatar>
              <q-avatar :icon="matBookmark"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>ブックマーク</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn v-if="$store.state.auth.authState !== 'AUTH_STATE_LOGIN'" id="auth-btn" label="ログイン/登録" color="amber-4" class="text-black" :to="{ name: 'auth' }"/>
      <div v-if="!$q.platform.is.mobile" id="ribbon-margin"/>
    </q-toolbar>
    <q-ribbon v-if="!$q.platform.is.mobile" class="github-text text-weight-bolder" position="top-right" type="corner" color="white" background-color="black" style="font-size: 12px">
      <a href="https://github.com/go-u/ogp-index" target="_blank" style="text-decoration: none;border-top: 1px solid white;border-bottom: 1px solid white;padding: 4px 0" class="q-ml-sm">Fork me on GITHUB</a>
    </q-ribbon>
  </q-header>
</template>

<script>
import { matBookmark, matBookmarkBorder, matStars, matFiberNew } from '@quasar/extras/material-icons'
import { mapState } from 'vuex'

export default {
  name: 'SiteHeader',
  computed: {
    ...mapState({
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
#ribbon-margin
  margin-right: 110px

.show_indicator > div
  opacity: 1!important
</style>
