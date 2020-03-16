<template>
  <div class="flex column q-gutter-y-sm">
    <div>
      <div class="text-h6">サービスについて</div>
      <p>OGPのデザイン資料集です。</p>
      {{ $t('aboutAppTitle') }}
    </div>
    <div>
      <div class="text-h6">集計について</div>
      <p>デザインの参考指標としてTwitter APIを利用して直近7日間のOGP付きシェアツイートを集計しています。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
