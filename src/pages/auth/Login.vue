<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div v-if="authState === null" class="text-center">
      <q-spinner-puff
        color="blue"
        size="3rem"
        :thickness="2"
      />
      <div class="q-pa-md text-body1">
        ログイン状態を確認中です..
      </div>

    </div>
    <div v-else class="q-gutter-y-md q-pb-xl">
      <login-with-email-form v-if="$route.name==='login'"/>
      <register-with-email-form v-else/>

      <q-separator />
<!--      <div class="text-center">Or Login with</div>-->
      <div class="text-center">または以下で{{ $route.name==='login' ? 'ログイン' : 'はじめる' }}</div>

      <div class="row justify-around">
        <q-btn v-if="!$q.platform.is.ios" icon="img:/statics/images/icons/logos/icons8-twitter-white.svg" class="bg-light-blue text-white" dense round size="1.4rem" :loading="loadingBtn['twitter.com']" @click="socialLogin('twitter.com')"/>
        <q-btn icon="img:/statics/images/icons/logos/icons8-google.svg" class="bg-white" dense round size="1.4rem" :loading="loadingBtn['google.com']" @click="socialLogin('google.com')"/>
      </div>

    </div>

    <div class="absolute-bottom text-center q-pb-md">
      <q-btn v-if="$route.name==='login'" label="パスワードを忘れた" flat :to="{ name: 'reset-password' }"/>
      <q-btn v-else label="利用規約等" flat :to="{ name: 'tos' }"/>
    </div>
    <q-btn icon="arrow_back" round outline color="grey-6" class="absolute-bottom-left q-ma-md" @click="$router.back()"/>

  </q-page>
</template>

<script>
import LoginWithEmailForm from '../../components/auth/LoginWithEmailForm'
import { mapState } from 'vuex'
import RegisterWithEmailForm from '../../components/auth/RegisterWithEmailForm'

export default {
  name: 'PageLogin',
  components: { RegisterWithEmailForm, LoginWithEmailForm },
  data () {
    return {
      loadingBtn: {
        'twitter.com': false,
        'google.com': false
      }
    }
  },
  methods: {
    socialLogin (providerId) {
      this.loadingBtn[providerId] = true
      this.$store.dispatch('auth/SocialLogin', { providerId: providerId })
    }
  },
  computed: {
    ...mapState({
      authState: state => state.auth.authState
    })
  }
}
</script>
