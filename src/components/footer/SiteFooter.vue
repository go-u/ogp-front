<template>
  <div>
    <q-footer class="bg-white base-container">
      <q-btn v-if="$route.name === 'top' && !hasLogin" id="auth-btn" class="absolute-bottom-right q-ma-md bg-amber text-black" fab push icon="lock_open" :to="{ name: 'auth' }"/>
    </q-footer>

    <q-ribbon v-if="$route.name === 'top'" class="github-text text-weight-bolder fixed-bottom-left" position="bottom-left" type="corner" color="white" background-color="black" style="font-size: 14px">
      <a href="https://github.com/go-u/ogp-index" target="_blank" style="text-decoration: none;border-top: 1px solid white;border-bottom: 1px solid white;padding: 4px 0" class="q-ml-sm">Check GITHUB</a>
    </q-ribbon>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import variables from '../../../config/variables'

export default {
  name: 'SiteFooter',
  computed: {
    ...mapState({
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN
    })
  }
}
</script>
