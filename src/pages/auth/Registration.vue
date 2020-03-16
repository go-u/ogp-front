<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div class="q-gutter-y-sm">
      <registration-form/>
    </div>

  </q-page>
</template>

<script>
import RegistrationForm from '../../components/auth/RegistrationForm'
import variables from '../../../config/variables'

export default {
  name: 'PageRegistration',
  components: { RegistrationForm },
  watch: {
    '$route.name': {
      handler: function (authState) {
        if (this.$store.state.authState === variables.AUTH_STATE_ON_EMAIL_VERIFYING) {
          this.$router.push({ name: 'email-verify' })
        }
      },
      immediate: true
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('auth/Logout')
    }
  }
}
</script>
