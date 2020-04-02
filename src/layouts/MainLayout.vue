<template>
  <q-layout view="hHh lpR fFf">

    <site-header v-on:left-drawer="leftDrawer=!leftDrawer"/>

    <q-drawer v-model="leftDrawer" behavior="mobile">
      <drawer-content/>
    </q-drawer>

    <q-page-container class="main">
      <router-view />
    </q-page-container>

    <site-footer/>

  </q-layout>
</template>

<script>
import DrawerContent from '../components/drawer/DrawerContent'
import SiteHeader from '../components/header/SiteHeader'
import SiteFooter from '../components/footer/SiteFooter'

export default {
  name: 'MainLayout',
  components: { SiteFooter, SiteHeader, DrawerContent },
  data () {
    return {
      leftDrawer: false
    }
  },
  created () {
    // Firebase関係やネイティブアプリの初期化
    this.$store.dispatch('initialize/Initialize')
  },
  mounted () {
    // ネイティブアプリのスプラッシュ・スクリーンを切替
    this.$store.dispatch('native/HideSplash')
  }
}
</script>

<style lang="sass">
.main
  max-width: 1200px
  margin: 0 auto
</style>
