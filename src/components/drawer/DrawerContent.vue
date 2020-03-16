<template>
  <div class="flex column q-gutter-y-lg q-ma-md text-center">
    メニュー
    <q-btn
      v-if="!hasLogin"
       label="ログイン"
       class="full-width"
      :to="{ name: 'auth' }"
    />
    <q-btn
      label="ブックマーク一覧"
      icon="bookmark_outline"
      class="full-width"
      :disable="!hasLogin"
      :to="{ name: 'bookmarks' }"
    />
    <div
      v-if="!hasLogin"
      class="text-body2 text-grey-7">
      ログイン後にご利用頂けます
    </div>

    <q-btn
      v-else
       label="ログアウト"
       class="full-width"
       @click="logout"
    />
    <q-btn
      label="利用規約"
      class="absolute-bottom full-width q-ma-sm"
      flat
      :to="{ name: 'about' }"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import variables from '../../../config/variables'

export default {
  name: 'DrawerContent',
  methods: {
    async logout () {
      await this.$store.dispatch('auth/Logout')
      window.location.href = '/'
    }
  },
  computed: {
    ...mapState({
      hasLogin: state => state.auth.authState === variables.AUTH_STATE_LOGIN
    })
  }
}
</script>
