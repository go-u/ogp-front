<template>
  <q-page class="flex flex-center" v-if="$store.state.auth.user" style="max-width: 600px; margin: 0 auto">

    <div>
      <div class="flex flex-center">
        <q-avatar size="120px" class="bg-white q-ma-sm" style="padding: unset;">
          <img :src="avatar || 'statics/images/icons/icons8/icons8-kawaii-egg-100.png'" style="border: solid black 1px"/>
          <q-btn icon="edit" round size="md" color="light-blue" class="absolute-bottom-right" :to="{ name: 'edit-avatar' }"/>
        </q-avatar>
      </div>

      <q-form
        @submit="onSubmit"
        class="q-gutter-y-sm q-pt-lg"
        style="width: 300px"
      >
        <div class="column q-gutter-y-md">
          <q-input
            outlined
            v-model="displayName"
            label="名前"
            :placeholder="displayName || $store.state.auth.user.displayname"
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
        </div>

        <q-card-section id="menu" class="q-pt-lg q-px-none flex column q-gutter-y-md">
          <q-btn icon="done" label="名前を更新" type="submit" color="light-blue" class="col-grow text-weight-bold" :loading="loadingBtn" :disabled="!isValid"/>
          <q-btn icon="close" label="キャンセル" class="col-grow" flat @click="$router.go(-1)"/>
        </q-card-section>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditProfile',
  data () {
    return {
      userName: '',
      displayName: '',
      description: this.$store.state.auth.user.description,
      patternUsername: /^[a-z0-9_]{1,15}$/i,
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
      const user = this.user
      user.displayname = this.displayName
      user.description = this.description
      this.$store.dispatch('user/UpdateUserInfo', { userDetail: user })
        .then(() => {
          alert('更新が完了しました')
          this.$router.push({ name: 'home' })
            .then(() => {
              location.reload()
            })
        }).catch((err) => {
          alert(err.message)
          this.loadingBtn = false
        })
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      avatar: state => state.auth.user.avatar
    }),
    isValid () {
      if (this.$route.name === 'edit-profile') {
        const pattern = this.patternDisplayname
        return pattern.test(this.displayName)
      }
      return false
    }
  }
}
</script>
