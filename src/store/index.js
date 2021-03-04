import { createStore } from 'vuex';
import { xyToLngLat } from '@arcgis/core/geometry/support/webMercatorUtils';
import axios from 'axios';

export default createStore({
  state() {
    return {
      center: [39.3189630108963, -76.61263639521701],
      shownLocations: [],
      MdLocations: [],
      NYCLocations: [],
    };
  },
  getters: {
    center(state) {
      return state.center;
    },
    providers(state) {
      return state.shownLocations;
    },
  },
  mutations: {
    setLocations(state, payload) {
      if (payload.name === 'MD') {
        // eslint-disable-next-line array-callback-return
        state.shownLocations = payload.locations.map((el) => {
          const [longitude, latitude] = xyToLngLat(el.geometry.x, el.geometry.y);
          // el.lng = Math.round(longitude * 1e6) / 1e6;
          // eslint-disable-next-line no-param-reassign
          el.attributes.Longitude = Math.round(longitude * 1e6) / 1e6;
          // eslint-disable-next-line no-param-reassign
          el.attributes.Latitude = Math.round(latitude * 1e6) / 1e6;
          // eslint-disable-next-line no-param-reassign
          el.attributes.FacilityName = el.attributes.name;
          // eslint-disable-next-line no-param-reassign
          el.attributes.FullAddress = el.attributes.fulladdr;
          // eslint-disable-next-line no-param-reassign
          el.attributes.Website = el.attributes.schedule_url;
          // eslint-disable-next-line no-param-reassign
          el.attributes.Phone = el.attributes.scheduling_contact_phone;
        });
        state.shownLocations = payload.locations;
      }
      if (payload.name === 'NYC') {
        // eslint-disable-next-line array-callback-return
        state.shownLocations = payload.locations.map((el) => {
          const FullAddress = `${el.attributes.Address}  ${el.attributes.Address2}, ${el.attributes.Borough}, NY  ${el.attributes.Zipcode}`;
          // eslint-disable-next-line no-param-reassign
          el.attributes.FullAddress = FullAddress;
        });
        state.shownLocations = payload.locations;
      }
    },
    setCenter(state, payload) {
      state.center = payload;
    },
  },
  actions: {
    async fetchProviders(context, payload) {
      const responce = await axios(payload.url);
      const providerLocations = responce.data.features;
      context.commit('setLocations', { name: payload.name, locations: providerLocations });
      context.commit('setCenter', payload.center);
    },
  },
});
