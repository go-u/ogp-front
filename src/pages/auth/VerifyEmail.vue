<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">
    <div class="absolute-top text-center q-pt-lg">
      <q-icon :name="matMailOutline" color="light-blue" size="4rem"/>
    </div>

    <div class="q-gutter-y-lg">
      <div>
        確認メールを送信しました。到着まで<span class="text-red text-weight-bolder">５分ほど</span>かかる場合があります。<br/>
        メールが確認できない場合<span class="text-red text-weight-bolder">「すべてのメール」</span>の受信箱などをご確認お願いします。
      </div>
      <q-btn label="ログインする(メール確認後)" color="light-blue" class="full-width" :to="{ name: 'login' }"/>

      <q-btn label="もう一度確認メールを送信" class="full-width" @click="sendEmailVerification" :loading="loadingBtn"/>
    </div>

    <div class="absolute-bottom text-center q-pb-md">
      <q-btn label="別のログイン方法を利用" flat :to="{ name: 'auth' }"/>
    </div>
  </q-page>
</template>

<script>
import variables from '../../../config/variables'
import { matMailOutline } from '@quasar/extras/material-icons'
import { mapState } from 'vuex'

export default {
  name: 'PageVerifyEmail',
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    reload: function () {
      location.reload()
    },
    sendEmailVerification: function () {
      this.loadingBtn = true
      this.$store.dispatch('auth/SendEmailVerification')
        .then((res) => {
          alert('メールを再送しました')
        }).catch((err) => {
          if (err.code === 'auth/too-many-requests') {
            alert('既にメールをお送りしています')
          } else {
            console.log(err)
          }
        }).finally(() => {
          this.loadingBtn = false
        })
    }
  },
  computed: {
    ...mapState({
      matMailOutline: () => matMailOutline
    }),
    onEmailVerifying () {
      return this.$store.state.auth.authState === variables.AUTH_STATE_ON_EMAIL_VERIFYING
    }
  }
}
</script>
