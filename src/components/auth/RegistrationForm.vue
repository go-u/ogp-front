<template>
  <q-stepper
    ref="stepper"
    v-model="step"
    contracted
    animated
    active-color="light-blue"
    done-color="green"
  >
    <q-step
      :name="1"
      title="name"
      icon="settings"
      :done="step > 1"
    >
      <q-input
        filled
        v-model="displayName"
        label="ニックネーム"
        type="text"
        hint="後から変更できます"
        counter
        maxlength="50"
        lazy-rules
        :rules="[ val =>(0 < (val).length && (val).length < (51) ) || '1文字以上、50文字以内']"
        @keyup.enter="displayName.length > 0 ? $refs.stepper.next() : null"
      >
      </q-input>

    </q-step>

    <q-step
      :name="2"
      title="confirm"
      icon="check_box"
      class="text-center"
    >
      <div class="text-body1 q-pt-sm">
        ご登録には<q-btn label="利用規約" type="a" target="_blank" color="light-blue" flat dense href="/tos"/>への同意が必用です。
      </div>

      <div class="q-gutter-sm">
        <q-checkbox v-model="check" label="利用規約に同意" />
      </div>

    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="flex">
        <q-btn v-if="step > 1" flat color="grey" class="col-grow q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
        <q-btn v-if="step === 1" @click="$refs.stepper.next()" color="light-blue" class="col-grow" label="NEXT" :disable="displayName.length === 0 "/>
        <q-btn v-if="step === 2" color="light-blue" class="col-grow" label="利用開始" :loading="loadingBtn" :disable="!check" @click="register"/>
      </q-stepper-navigation>
    </template>

  </q-stepper>
</template>

<script>
export default {
  name: 'RegistrationForm',
  data () {
    return {
      step: 1,
      check: false,
      displayName: this.$store.state.auth.oauthUser.displayname,
      loadingBtn: false
    }
  },
  methods: {
    register () {
      this.loadingBtn = true
      const payload = {
        name: this.displayName
      }
      this.$store.dispatch('auth/Register', { payload: payload })
        .then((userDetail) => {
          this.$store.dispatch('auth/CheckAuthState')
          this.$router.push({ name: 'top' })
        }).catch((err) => {
          console.log(err)
          alert(err.message)
          this.loadingBtn = false
        })
    }
  }
}
</script>
