<template>
  <div class="q-pa-md" v-if="user" style="max-width: 600px; margin: 0 auto">
    <q-card-section class="text-h4 text-center">
      <span v-if="$route.name==='edit-displayname'">
        名前の変更
      </span>
      <span v-else>
        ユーザ名の変更
      </span>
    </q-card-section>

    <q-card-section class="text-center text-h6 text-light-blue">
      <span :class="$route.name==='edit-displayname' ? '' : 'text-grey-5'">{{ displayName || user.displayname }}</span>
      <span class="text-grey-5">@</span>
      <span :class="$route.name==='edit-username' ? '' : 'text-grey-5'">{{ userName || user.username }}</span>
    </q-card-section>

    <q-form
      @submit="onSubmit"
      class="q-gutter-y-md q-pt-lg"
    >
      <q-card-section class="q-pa-xs" v-if="$route.name==='edit-displayname'">
        <q-input
          outlined
          v-model="displayName"
          placeholder="表示名(いつでも変更できます)"
          counter
          hint="1文字以上"
          maxlength="30"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please enter name',
            val => patternDisplayname.test(val)|| '1文字以上'
          ]"
        >
          <template v-slot:prepend>
            <q-avatar size="2.8rem">
              <q-icon name="sentiment_very_satisfied" color="blue"/>
            </q-avatar>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pa-xs" v-if="$route.name==='edit-username'">
        <q-input
          outlined
          v-model="userName"
          type="text"
          placeholder="ユーザ名(いつでも変更できます)"
          counter
          hint="英数小文字の2文字以上"
          maxlength="15"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please enter username',
            val => patternUsername.test(val)|| '2文字以上'
          ]"
        >
          <template v-slot:prepend>
            <q-avatar size="2.8rem">
              <q-icon name="sentiment_very_satisfied" color="blue"/>
            </q-avatar>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section id="menu" class="flex column q-pa-sm q-gutter-y-md">
        <q-btn icon="done" label="Update" type="submit" color="light-blue" class="col-grow" :loading="loadingBtn" :disabled="!isValid"/>
        <q-btn icon="close" label="Back" class="col-grow" flat @click="backBtn"/>
      </q-card-section>
    </q-form>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditName',
  data () {
    return {
      userName: '',
      displayName: '',
      patternUsername: /^[a-z0-9_]{1,10}$/i,
      patternDisplayname: /^.{1,30}$/i,
      loadingBtn: false
    }
  },
  mounted () {
    this.userName = this.user.username
    this.displayName = this.user.displayname
  },
  methods: {
    backBtn: function () {
      this.$router.go(-1)
    },
    onSubmit: function () {
      this.loadingBtn = true
      const userDetail = Object.assign({}, this.user)
      userDetail.username = this.userName
      this.$store.dispatch('user/UpdateUserInfo', { userDetail: userDetail })
        .then(() => {
          alert('更新が完了しました')
          this.$router.push({ name: 'top' })
            .then(() => {
              location.reload()
            })
        }).catch((err) => {
          alert(err.message)
          this.loadingBtn = false
        })
    },
    isValidUsername () {
      const pattern = this.patternUsername
      return pattern.test(this.userName)
    },
    isValidDisplayname () {
      const pattern = this.patternDisplayname
      return pattern.test(this.displayName)
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    isValid () {
      if (this.$route.name === 'edit-displayname') {
        return this.isValidDisplayname()
      }
      if (this.$route.name === 'edit-username') {
        return this.isValidUsername()
      }
      return false
    }
  }
}
</script>
