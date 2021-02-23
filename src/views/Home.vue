<template>
  <div class="home">
    <l-map
     v-model="zoom"
     v-model:zoom="zoom"
     :center="[39.3189630108963, -76.61263639521701]"
     class="z-idx5">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
       v-for="provider in providers"
      :key="provider.attributes.fulladdr"
      :lat-lng="[provider.lat, provider.lng]"
      >
        <l-icon icon-url="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/272/syringe_1f489.png" :icon-size="[46, 46]" />
        <l-popup>
          <h2>{{ provider.attributes.name }}</h2>
          <hr>
          <p>
            <span style="font-weight:bold">{{ provider.attributes.fulladdr}}</span>
            <span v-if="provider.attributes.operationalhours">
              {{ provider.attributes.operationalhours}}
            </span>
            <span v-if="provider.attributes.scheduling_contact_phone" style="font-style:italic">
              {{ provider.attributes.scheduling_contact_phone }}
            </span>
          </p>
            <a v-if="provider.attributes.schedule_url"
            :href="provider.attributes.schedule_url" target="_blank">
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
import axios from 'axios';
import { xyToLngLat } from '@arcgis/core/geometry/support/webMercatorUtils';

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
  },
  methods: {
  },
  setup() {
    const zoom = ref(10);
    // const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/0/query?where=0%3D0&outFields=%2A&f=json';
    // const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/1/query?where=0%3D0&outFields=%2A&f=json';
    const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=0%3D0&outFields=%2A&f=json';
    const providers = [];
    async function getProviders() {
      const responce = await axios(placesURL);
      const providerLocations = responce.data.features;

      // ***calculate real lat and lng from arcgis x/y using xyToLngLat module***
      // eslint-disable-next-line array-callback-return
      providerLocations.map((el) => {
        const [longitude, latitude] = xyToLngLat(el.geometry.x, el.geometry.y);
        // eslint-disable-next-line no-param-reassign
        el.lng = Math.round(longitude * 1e6) / 1e6;
        // eslint-disable-next-line no-param-reassign
        el.lat = Math.round(latitude * 1e6) / 1e6;
        providers.push(el);
      });
      console.log(providerLocations);
    }
    getProviders();
    return {
      providers,
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
