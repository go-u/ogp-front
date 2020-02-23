<template>
  <div flat class="q-gutter-lg">

    <div class="column">
<!--      <div class="text-h6">{{ $t('aboutAppTitle') }}</div>-->
<!--      {{ $t('aboutAppText') }}-->
      <div class="text-h6">アプリについて</div>
      作者が勉強/趣味で個人開発したものです。
<!--      <div><a :href="$route.params.lang==='ja' ? 'https://twitter.com/go__gou' : 'https://twitter.com/go___gou'" style="text-decoration: unset" class="text-light-blue"><q-icon name="img:/statics/images/social/twitter_logo_blue.png" class="text-h5"/>Followe me</a></div>-->
<!--      <q-btn type="a" :href="$route.params.lang==='ja' ? 'https://twitter.com/intent/follow?screen_name=go__gou' : 'https://twitter.com/intent/follow?screen_name=go___gou'" target="_blank" :label="$route.params.lang==='ja' ? '応援のフォローをお願いします' : 'Follow author twitter'" color="light-blue" icon="img:statics/images/icons/logos/icons8-twitter-white.svg" class="q-mt-sm"/>-->
      <q-btn type="a" href="https://twitter.com/intent/follow?screen_name=go__gou" target="_blank" label="応援のフォローをお願いします" color="light-blue" icon="img:statics/images/icons/logos/icons8-twitter-white.svg" class="q-mt-sm"/>

      <div class="text-h6 q-pt-lg">アイコンについて</div>
      <a href="https://icons8.com/" target="_blank">icons8を利用しています</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<i18n>
  en:
    aboutAppTitle: About the app
    aboutAppText: The author developed personally as a hobby.
  ja:
    aboutAppTitle: アプリについて
    aboutAppText: 作者が勉強/趣味で個人開発したものです。
</i18n>
