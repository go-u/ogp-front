<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-y-md"
  >
    <q-input
      input-class="input-email"
      filled
      v-model="email"
      label="Email"
      type="email"
      lazy-rules
      :rules="[ val => val.includes('@') || 'Please input Email']"
      autocomplete="username"
    >
      <template v-slot:append>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input
      input-class="input-password"
      v-model="password"
      filled
      label="Password"
      hint="数字(0-9), 小文字(a-z), 大文字(A-Z)混在の8文字以上"
      :type="isPwd ? 'password' : 'text'"
      autocomplete="current-password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div class="flex q-pt-md">
      <q-btn id="email-login-btn" label="メール/パスワードでログイン" type="submit" class="col-grow" :loading="loadingBtn" :disabled="password === ''"/>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'LoginWithEmailForm',
  data () {
    return {
      password: '',
      isPwd: true,
      email: '',
      loadingBtn: false
    }
  },
  methods: {
    onSubmit () {
      this.loadingBtn = true
      this.$store.dispatch('auth/LoginWithEmailAndPassword', { mail: this.email, password: this.password })
        .catch((err) => {
          alert(err.message)
        }).finally(() => {
          this.loadingBtn = false
          this.$store.dispatch('auth/RouterPushToRegisterOrLogin')
        })
    }
  }
}
</script>
