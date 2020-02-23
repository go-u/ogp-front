<template>
  <div class="flex q-gutter-y-md justify-center q-pa-lg">
    <q-avatar size="120px" class="bg-white q-ma-md" style="padding: unset;">
      <img :src="$store.state.auth.user.avatar" style="border: solid black 1px"/>
      <q-btn icon="edit" round size="md" color="light-blue" class="absolute-bottom-right" :to="{ name: 'edit-avatar' }"/>
    </q-avatar>

    <q-btn label="お気に入り" class="full-width" :to="{ name: 'bookmarks' }"/>
    <q-btn label="設定" class="full-width" :to="{ name: 'menu' }"/>
    <q-btn label="ログアウト" class="full-width" @click="logout"/>
  </div>
</template>

<script>
export default {
  name: 'DrawerContent',
  methods: {
    logout: async function () {
      await this.$store.dispatch('auth/Logout')
      window.location.href = '/'
    }
  }
}
</script>
