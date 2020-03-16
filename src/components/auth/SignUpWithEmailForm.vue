<template>
  <q-form
    @submit="onSubmitEmail"
    class="q-gutter-y-md"
  >
    <q-input
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
      v-model="password"
      filled
      label="Password"
      lazy-rules
      hint="数字(0-9), 小文字(a-z), 大文字(A-Z)混在の8文字以上"
      :rules="[ val => (this.regex).test(val) || '数字(0-9), 小文字(a-z), 大文字(A-Z)混在の8文字以上']"
      :type="isPwd ? 'password' : 'text'"
      autocomplete="new-password"
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
      <q-btn label="メール/パスワードではじめる" type="submit" class="col-grow" :loading="loadingBtn" :disabled="!isValid || password === ''"/>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'SignUpWithEmailForm',
  data () {
    return {
      password: '',
      isPwd: true,
      email: '',
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!#$%&@'"()*+,-=~./_<>]{8,}$/, // 半角英数混在8文字以上であること // アルファベットは必ず大文字と小文字が含まれること // https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
      loadingBtn: false
    }
  },
  methods: {
    onSubmitEmail () {
      this.loadingBtn = true
      this.$store.dispatch('auth/CreateUserWithEmailAndPassword', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'email-verify' })
        }).catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            this.$router.push({ name: 'email-already-in-use' })
              .then(() => {
              })
          } else {
            alert(err.message)
          }
        }).finally(() => {
          this.loadingBtn = false
        })
    }
  },
  computed: {
    // submitボタンのdisable切替用。パスワードのバリデーション自体はフォーム内の:rules=で実行している。
    isValid () {
      return (this.regex).test(this.password)
    }
  }
}
</script>
