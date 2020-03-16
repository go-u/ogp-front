<template>
  <q-page class="flex flex-center column q-pa-md" style="max-width: 800px; margin: 0 auto">
    <div class="text-h5">シェアサンプル</div>
    <div v-if="loading" class="text-body1 q-py-md text-center">
      <q-spinner-puff size="30px" color="light-blue"/>
<!--      Tweet読み込み中-->
      Twitterと通信中(数秒かかります)
    </div>
    <!-- twitter oEmbedの初期化を高速化するためv-showを利用 -->
    <div v-show="!loading" style="max-width: 90%">
      <div v-for="tweet in tweets" v-bind:key="tweet.url" v-html="tweet.html"></div>
      <div v-if="tweets.length === 0">サンプルツイートはありません</div>
    </div>
  </q-page>
</template>

<script>
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  name: 'Detail',
  data () {
    return {
      loading: true,
      tweets: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    async get () {
      this.tweets = await this.$store.dispatch('ogp/GetTweets', { fqdn: this.$route.params.fqdn })
      window.twttr.widgets.load()
      await sleep(1500) // twitter oEmbed パーツの初期化待ち
      this.loading = false
    }
  }
}
</script>
