<template>
  <div class="home">
    <the-controller></the-controller>
    <l-map
     v-model="zoom"
     v-model:zoom="zoom"
     :center="center"
     class="z-idx5">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
       v-for="provider in providers"
      :key="provider.attributes.fulladdr"
      :lat-lng="[provider.attributes.Latitude, provider.attributes.Longitude]"
      >
        <l-icon icon-url="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/272/syringe_1f489.png" :icon-size="[46, 46]" />
        <l-popup>
          <h2>{{ provider.attributes.FacilityName }}</h2>
          <hr>
          <p>
            <span style="font-weight:bold">{{ provider.attributes.FullAddress}}</span>
            <span v-if="provider.attributes.operationalhours">
              {{ provider.attributes.operationalhours}}
            </span>
            <span v-if="provider.attributes.Phone" style="font-style:italic">
              {{ provider.attributes.Phone }}
            </span>
          </p>
            <a v-if="provider.attributes.Website"
            :href="provider.attributes.Website" target="_blank">
               Schedule an appointment!
            </a>
        </l-popup>
      </l-marker>
    </l-map>
    <footer-credits></footer-credits>
  </div>
</template>

<script>
import {
  LMap,
  LIcon,
  LMarker,
  LTileLayer,
  LPopup,
} from '@vue-leaflet/vue-leaflet';
import { ref } from 'vue';
import TheController from '../components/TheController.vue';
import FooterCredits from './FooterCredits.vue';

export default {
  name: 'Home',
  components: {
    LMap,
    LIcon,
    LMarker,
    LTileLayer,
    LPopup,
    FooterCredits,
    TheController,
  },
  methods: {
  },
  computed: {
    center() {
      return this.$store.getters.center;
    },
    providers() {
      return this.$store.getters.providers;
    },
  },
  setup() {
    const zoom = ref(10);
    return {
      zoom,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  z-index: 8;
  width: 100%;
  height: 100%;
}
.z-idx5{
  z-index: 5;
}
span{
  display: block;
}
</style>
