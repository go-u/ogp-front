<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div class="q-gutter-y-sm">
      <registration-form-stepper/>
    </div>

  </q-page>
</template>

<script>
import RegistrationFormStepper from '../../components/auth/RegistrationFormStepper'
import config from '../../../config/config'

export default {
  name: 'PageRegistration',
  components: { RegistrationFormStepper },
  watch: {
    '$route.name': {
      handler: function (authState) {
        if (this.$store.state.authState === config.AUTH_STATE_ON_EMAIL_VERIFYING) {
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
