<template>
  <q-btn-dropdown :label="langMap[$route.query.lang] || '全世界'" icon="language" color="amber-4" class="text-grey-9 q-mb-sm">
    <q-list>
      <q-item clickable v-close-popup :to="{ query: null }">
        <q-item-section>
          <q-item-label>全て</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item v-for="(lang, key) in langMap" v-bind:key="key" clickable v-close-popup :to="{ query: { lang: key } }">
        <q-item-section>
          <q-item-label>{{ lang }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import variables from '../../../config/variables'

export default {
  name: 'LangFilter',
  computed: {
    langMap () {
      return variables.langMap
    }
  }
}
</script>
