<template>
  <div class="home">
    <the-controller></the-controller>
    <loading-spinner  v-if="isLoading" ></loading-spinner>
    <l-map
     :zoom="zoom"
     :center="center"
     @ready="setLoading(false)"
     @update:center="setLoading(false)"
     class="z-idx5">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
       v-for="provider in providers"
      :key="provider.attributes.fulladdr"
      :lat-lng="[provider.attributes.Latitude, provider.attributes.Longitude]"
      >
        <l-icon icon-url="https://www.svgrepo.com/show/312483/location-indicator-red.svg" :icon-size="[46, 46]" />
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TheController from '../components/TheController.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
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
    LoadingSpinner,
  },
  setup() {
    const zoom = ref(12);

    const store = useStore();

    const isLoading = computed(() => store.getters.loadingStatus);
    const center = computed(() => store.getters.center);
    const providers = computed(() => store.getters.providers);

    function setLoading(status) {
      store.commit('setLoadingStatus', status);
    }

    document.title = 'COVID Vaccine Locator';

    return {
      zoom,
      isLoading,
      center,
      providers,
      setLoading,
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
