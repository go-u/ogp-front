<template>
  <q-page style="max-width: 760px;margin: 0 auto">
    <q-tabs
      v-model="tab"
      dense
      class="text-black"
      active-color="light-blue"
      indicator-color="light-blue"
      align="justify"
      narrow-indicator
    >
      <q-tab name="about" label="サービス"/>
      <q-tab name="tos" label="利用規約"/>
      <q-tab name="privacy-policy" label="プライバシーポリシー"/>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="about">
        <about/>
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
import About from '../components/info/About'
import Tos from '../components/info/Tos'
import PrivacyPolicy from '../components/info/PrivacyPolicy'

export default {
  name: 'Info',
  components: { About, Tos, PrivacyPolicy },
  computed: {
    tab: {
      get () {
        return this.$route.name
      },
      set (value) {
        this.$router.push({ name: value })
      }
    }
  }
}
</script>
