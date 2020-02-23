<template>
  <q-page class="flex flex-center" v-if="$store.state.auth.user" style="max-width: 600px; margin: 0 auto">
    <div>
      <q-form
        @submit="onSubmit"
        class="q-gutter-y-sm q-pt-lg"
        style="width: 300px"
      >
        <q-card-section v-if="errorMessage" class="text-red text-center text-body1">
          {{ errorMessage }}
        </q-card-section>

        <div class="column q-gutter-y-md">
          <q-input
            outlined
            v-model="url"
            label="ウェブサイトのURL"
            placeholder="https://ogp-gal.com"
            counter
            hint="URLを入力"
            maxlength="30"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'URLを入力',
              val => patternUrl.test(val)|| 'URLを入力'
            ]"
          >
            <template v-slot:prepend>
              <q-avatar size="2.8rem">
                <q-icon name="language" color="blue"/>
              </q-avatar>
            </template>
          </q-input>
        </div>

        <q-card-section id="menu" class="q-pt-lg q-px-none flex column q-gutter-y-md">
          <q-btn icon="done" label="プレビューを確認" type="submit" color="light-blue" class="col-grow text-weight-bold" :loading="loadingBtn" :disabled="!isValid"/>
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
      url: '',
      patternUrl: /^.{1,30}$/i,
      loadingBtn: false,
      errorMessage: ''
    }
  },
  methods: {
    backBtn: function () {
      this.$router.go(-1)
    },
    onSubmit: function () {
      this.extractFQDN()
      this.loadingBtn = true
      this.errorMessage = ''
      const payload = { fqdn: this.url }
      this.$store.dispatch('ogp/Preview', { payload: payload })
        .then((ogp) => {
          this.$router.push({ name: 'preview' })
        }).catch((err) => {
          console.log(err.message)
          if (err.message === ('ogp exist')) {
            this.errorMessage = 'このURLは登録済みです'
          } else {
            this.errorMessage = 'このURLにはOGP画像がありません'
          }
        }).finally(() => {
          this.loadingBtn = false
        })
    },
    extractFQDN: function () {
      const regexSchema = /.+:\/\//i
      const fqdnWithPath = this.url.replace(regexSchema, '')
      const regexPath = /\/.*/g
      const fqdn = fqdnWithPath.replace(regexPath, '')
      this.url = fqdn
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    isValid () {
      const pattern = this.patternUrl
      return pattern.test(this.url)
    }
  }
}
</script>
