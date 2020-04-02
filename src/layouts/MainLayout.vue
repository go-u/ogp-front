<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-grey-9 text-white" height-hint="98">
      <header-content v-on:left-drawer="leftDrawer=!leftDrawer"/>
    </q-header>

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
import HeaderContent from '../components/header/HeaderContent'
import SiteFooter from '../components/footer/SiteFooter'

export default {
  name: 'MainLayout',
  components: { SiteFooter, HeaderContent, DrawerContent },
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
