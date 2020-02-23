<template>
  <q-page class="flex flex-center" v-if="$store.state.auth.user" style="max-width: 600px; margin: 0 auto">

    <div>
      <div class="flex flex-center">
        <q-card style="max-width: 300px">
          <q-img :ratio="16/9" :src="preview.image"/>

          <q-card-section>
            <div class="text-h6 ellipsis">{{ preview.title }}</div>
            <div class="text-subtitle2 text-grey-7 ellipsis">{{ preview.url }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none ellipsis">
            {{ preview.description }}
          </q-card-section>
        </q-card>
      </div>

      <q-card-section id="menu" class="q-pt-lg q-px-none flex column q-gutter-y-md">
        <q-btn icon="done" label="OGPを登録" type="submit" color="light-blue" class="col-grow text-weight-bold" :loading="loadingBtn" @click="send"/>
        <q-btn icon="close" label="キャンセル" class="col-grow" flat @click="$router.go(-1)"/>
      </q-card-section>

    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PreviewOgp',
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    backBtn: function () {
      this.$router.go(-1)
    },
    async send () {
      this.loadingBtn = true
      await this.$store.dispatch('ogp/Add', { payload: { fqdn: this.getFQDN(this.preview.url) } })
      await this.$store.dispatch('ogp/Get')
      this.loadingBtn = false
      this.$router.push({ name: 'top' })
    },
    getFQDN: function (url) {
      const regexSchema = /.+:\/\//i
      const fqdnWithPath = url.replace(regexSchema, '')
      const regexPath = /\/.*/g
      return fqdnWithPath.replace(regexPath, '')
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      preview: state => state.ogp.preview
    })
  }
}
</script>
