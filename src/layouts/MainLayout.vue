<template>
  <q-layout view="hHh lpR fFf">

    <site-header v-on:left-drawer="left=!left"/>

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
import { Plugins } from '@capacitor/core'
const { SplashScreen } = Plugins
import DrawerContent from '../components/drawer/DrawerContent'
import SiteHeader from '../components/header/SiteHeader'

export default {
  name: 'MainLayout',
  components: { SiteHeader, DrawerContent },
  data () {
    return {
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
  }
}
</script>

<style lang="sass">
.base-container
  max-width: 1200px
  margin: 0 auto
</style>
