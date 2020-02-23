<template>
  <q-page style="height: 90vh;max-width: 600px;margin: 0 auto">
    <q-btn icon="arrow_back" flat dense round class="text-white q-ma-md text-h6" style="background: rgba(0,0,0,0.3);z-index: 1000;position: fixed;bottom: 0" @click="$router.go(-1)"/>
    <q-tabs
      v-model="tab"
      dense
      class="text-black"
      active-color="light-blue"
      indicator-color="light-blue"
      align="justify"
      narrow-indicator
    >
      <q-tab name="tos" label="利用規約"/>
      <q-tab name="privacy-policy" label="プライバシーポリシー"/>
      <q-tab name="app" label="サービス"/>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="app">
        <app/>
      </q-tab-panel>

      <q-tab-panel name="tos">
        <tos/>
      </q-tab-panel>

      <q-tab-panel name="privacy-policy">
        <privacy-policy/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import App from '../../components/about/App'
import Tos from '../../components/about/Tos'
import PrivacyPolicy from '../../components/about/PrivacyPolicy'

export default {
  name: 'Info',
  components: { App, Tos, PrivacyPolicy },
  computed: {
    tab: {
      get () {
        switch (this.$route.name) {
          case 'app':
            return 'app'
          case 'tos':
            return 'tos'
          case 'privacy-policy':
            return 'privacy-policy'
          default:
            return 'app'
        }
      },
      set (value) {
        this.$router.push({ name: value })
      }
    }
  }
}
</script>
