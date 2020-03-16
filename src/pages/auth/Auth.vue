<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 400px;margin: 0 auto">

    <div class="flex column q-gutter-y-lg text-body2">
      <q-btn label="新規登録" rounded class="full-width" color="light-blue" :to="{ name: 'signup' }" />
      <q-btn id="login-btn" label="ログイン" rounded outline class="full-width" color="grey-10" :to="{ name: 'login' }" />
      <div class="q-px-xs">ログインするとストック機能やWeb/アプリ連携をご利用頂けます。</div>
    </div>

    <div class="absolute-bottom text-center q-pb-md">
<!--      <div class="text-caption text-grey">{{ server ? '' : 'local' }} v{{ version }}</div>-->
      <q-btn label="利用規約等" flat :to="{ name: 'tos' }"/>
    </div>
  </q-page>
</template>

<script>
import { version } from '../../../package'
import variables from '../../../config/variables'

export default {
  name: 'Auth',
  data () {
    return {
      version: version,
      server: variables.domainsPrd.includes(document.domain)
    }
  }
}
</script>
