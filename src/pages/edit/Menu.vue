<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div class="q-gutter-y-md">
      <q-item clickable :to="{ name: 'edit-profile' }" class="bg-grey-2" style="border-radius: 8px">
        <q-item-section avatar>
          <q-icon name="sentiment_satisfied_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-light-blue">プロフィール編集</q-item-label>
          <q-item-label caption>ニックネーム {{ $store.state.auth.user.displayname }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable :to="{ name: 'edit-username' }" class="bg-grey-2" style="border-radius: 8px">
        <q-item-section avatar>
          <q-icon name="create" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-light-blue">ユーザ名変更</q-item-label>
          <q-item-label caption>ユーザ名: {{ $store.state.auth.user.username }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div class="absolute-bottom text-center q-pb-md">
      <q-btn label="ログアウト" flat class="text-capitalize" @click="logout"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    logout: async function () {
      await this.$store.dispatch('auth/Logout')
      await this.$router.push({ name: 'top' })
      await location.reload()
    }
  }
}
</script>
