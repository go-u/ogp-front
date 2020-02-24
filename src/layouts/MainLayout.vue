<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-grey-9 text-white" height-hint="98">
      <q-toolbar class="base-container">
        <q-toolbar-title>
          <q-avatar v-if="$store.state.auth.authState === 'AUTH_STATE_LOGIN'" class="bg-white q-mr-xs" style="padding: unset;" @click="left=!left">
            <img :src="$store.state.auth.user.avatar" style="border: solid black 1px"/>
          </q-avatar>

          <q-btn :icon="$store.state.auth.authState === 'AUTH_STATE_LOGIN' ? undefined : matBookmarkBorder" label="OGP GAL" flat class="text-amber-4 text-weight-bolder" style="letter-spacing: 1px" size="lg" dense :to="{ name: 'top' }"/>
        </q-toolbar-title>
        <q-tabs inline-label align="right" v-if="!$q.platform.is.mobile">
          <q-route-tab :icon="matStars" :to="{ name: 'top', query: { order: 'popular' } }" label="人気順"/>
          <q-route-tab :icon="matFiberNew" :to="{ name: 'top', query: { order: 'newer' } }" label="新着順" />
          <q-route-tab :icon="matBookmark" :to="{ name: 'bookmarks' }" label="ブックマーク" />
        </q-tabs>
        <q-btn v-if="$store.state.auth.authState !== 'AUTH_STATE_LOGIN'" id="auth-btn" label="ログイン/登録" color="amber-4" class="text-black" :to="{ name: 'auth' }"/>
        <div v-if="!$q.platform.is.mobile" id="ribbon-margin"/>
      </q-toolbar>
      <q-ribbon v-if="!$q.platform.is.mobile" class="github-text text-weight-bolder" position="top-right" type="corner" color="white" background-color="black" style="font-size: 12px">
        <a href="https://github.com/go-u/ogp-index" target="_blank" style="text-decoration: none;border-top: 1px solid white;border-bottom: 1px solid white;padding: 4px 0" class="q-ml-sm">Fork me on GITHUB</a>
      </q-ribbon>
    </q-header>

    <q-drawer v-if="$store.state.auth.authState === 'AUTH_STATE_LOGIN'" v-model="left" side="left" overlay behavior="mobile" bordered>
      <drawer-content/>
    </q-drawer>

    <q-page-container class="base-container">
      <router-view />
    </q-page-container>

    <q-footer class="bg-white base-container" v-if="$route.name === 'top' && $store.state.auth.authState === 'AUTH_STATE_LOGIN'">
      <q-btn class="absolute-bottom-right q-ma-md bg-amber text-black" fab push icon="add" :to="{ name: 'specify' }"/>
    </q-footer>

  </q-layout>
</template>

<script>
import { matBookmark, matBookmarkBorder, matStars, matFiberNew } from '@quasar/extras/material-icons'
import { mapState } from 'vuex'
import { Plugins } from '@capacitor/core'
const { SplashScreen } = Plugins
import DrawerContent from '../components/drawer/DrawerContent'

export default {
  name: 'MainLayout',
  components: { DrawerContent },
  data () {
    return {
      text: '',
      left: false
    }
  },
  created () {
    this.$store.dispatch('initialize/Initialize')
  },
  mounted () {
    this.hideSplash()
  },
  methods: {
    hideSplash: function () {
      SplashScreen.hide() // アプリのsplash screenを解除
    }
  },
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
.base-container
  max-width: 1200px
  margin: 0 auto

#ribbon-margin
  margin-right: 110px
</style>
