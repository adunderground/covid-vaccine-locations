import { createStore } from 'vuex';
import { xyToLngLat } from '@arcgis/core/geometry/support/webMercatorUtils';
import axios from 'axios';

async function getData(url) {
  const responce = await axios(url);
  return responce.data.features;
}

export default createStore({
  state() {
    return {
      center: [39.3189630108963, -76.61263639521701],
      shownLocations: [],
      MDLocations: [],
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
        if (state.MDLocations.length) {
          state.shownLocations = state.MDLocations;
        } else {
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
          state.MDLocations = payload.locations;
          state.shownLocations = state.MDLocations;
        }
      }
      if (payload.name === 'NYC') {
        if (state.NYCLocations.length) {
          state.shownLocations = state.NYCLocations;
        } else {
          // eslint-disable-next-line array-callback-return
          state.shownLocations = payload.locations.map((el) => {
            const FullAddress = `${el.attributes.Address} ${el.attributes.Address2}, ${el.attributes.Borough}, NY  ${el.attributes.Zipcode}`;
            // eslint-disable-next-line no-param-reassign
            el.attributes.FullAddress = FullAddress;
          });
          state.NYCLocations = payload.locations;
          state.shownLocations = state.NYCLocations;
        }
      }
    },
    setCenter(state, payload) {
      state.center = payload;
    },
  },
  actions: {
    async fetchProviders(context, payload) {
      // move center
      context.commit('setCenter', payload.center);
      // check if the providers were already loaded
      // check `${payload.name}Locations` e.g. NYCLocations in state
      if (context.state[`${payload.name}Locations`].length) {
        // call setLocations mutator w/ name only
        context.commit('setLocations', { name: payload.name });
      } else {
      // make api call to end point and call setLocations mutator with the payload.providerLocations
        // const responce = await axios(payload.url);
        // const providerLocations = responce.data.features;
        const providerLocations = await getData(payload.url);
        context.commit('setLocations', { name: payload.name, locations: providerLocations });
      }
    },
  },
});
