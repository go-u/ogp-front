<template>
  <q-carousel
    animated
    v-model="slide"
    infinite
    autoplay
    arrows
    style="height: unset"
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-carousel-slide v-for="(item, index) in pickups" :name="index + 1" v-bind:key="index" class="no-padding">
      <q-card class="bg-grey-10 text-white">
        <q-img :ratio="16/9" :src="item.image" style="max-height: 400px"/>
        <q-card-section class="q-py-sm">
          <div class="text-subtitle1 ellipsis">今週のピックアップ</div>
          <div class="text-subtitle2 ellipsis">{{ item.title }}</div>
        </q-card-section>
      </q-card>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import pickups from './pickups.json'

export default {
  name: 'Pickups',
  data () {
    return {
      slide: 1,
      pickups: pickups
    }
  }
}
</script>
