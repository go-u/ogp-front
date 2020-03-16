<template>
  <q-btn-dropdown icon="calendar_today" class="full-width" label="表示期間">
    <q-list>
      <q-item v-for="period in ['1週間', '1日']" v-bind:key="period" clickable v-close-popup>
        <q-item-section>
          <q-item-label>{{ period }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'PeriodSelector'
}
</script>
