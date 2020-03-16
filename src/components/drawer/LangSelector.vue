<template>
  <q-btn-dropdown icon="translate" class="full-width" label="表示言語">
    <q-list>
      <q-item v-for="lang in ['日本語', '英語']" v-bind:key="lang" clickable v-close-popup>
        <q-item-section>
          <q-item-label>{{ lang }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'LangSelector'
}
</script>
