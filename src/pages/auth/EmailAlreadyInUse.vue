<template>
  <q-page class="column justify-center q-pa-lg" style="max-width: 600px;margin: 0 auto">

    <div class="q-gutter-y-lg">
      <div>このメールアドレスは既に登録されています</div>
      <q-btn label="パスワードを忘れた方はこちら" class="full-width" :to="{ name: 'reset-password' }"/>
    </div>

    <div class="absolute-bottom text-center q-pb-md">
      <q-btn label="別のログイン方法を利用" flat :to="{ name: 'landing' }"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageEmailAlreadyInUse'
}
</script>
