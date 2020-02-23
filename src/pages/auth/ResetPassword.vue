<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div class="q-gutter-y-lg">
      <q-form
        @submit="onSubmit"
        class="q-gutter-y-sm"
      >
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          lazy-rules
          :rules="[ val => val.includes('@') || 'Please input Email']"
        >
          <template v-slot:append>
            <q-icon name="mail" />
          </template>
        </q-input>
        <div class="flex">
          <q-btn v-if="!emailSent" label="パスワード再設定メールを送信" type="submit" class="col-grow" :loading="loadingBtn" :disable="!email.includes('@')"/>
          <q-btn v-else label="パスワード再設定メールを送信しました" class="col-grow" color="green" flat :ripple="false"/>
        </div>
      </q-form>
    </div>

    <div class="absolute-bottom text-center q-pb-md">
      <q-btn label="TOPに戻る" flat :to="{ name: 'top' }"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageResetPassword',
  data () {
    return {
      email: '',
      loadingBtn: false,
      emailSent: false
    }
  },
  methods: {
    onSubmit () {
      this.loadingBtn = true
      this.$store.dispatch('auth/ResetPassword', { mail: this.email })
        .then(() => {
          this.emailSent = true
        }).catch((err) => {
          alert(err.message)
        }).finally(() => {
          this.loadingBtn = false
        })
    }
  }
}
</script>
