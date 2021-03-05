import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

const MD_URL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/4/query?where=0%3D0&outFields=%2A&f=json';
const NYC_URL = 'https://services1.arcgis.com/oOUgp466Coyjcu6V/arcgis/rest/services/VaccineFinder_Production_View/FeatureServer/0/query?where=0%3D0&outFields=%2A&f=json';

const routes = [
  {
    path: '/',
    redirect: '/MD',
    component: Home,
  },
  {
    path: '/MD',
    component: Home,
  },
  {
    path: '/NYC',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function createPayload(state) {
  if (state === 'MD') {
    return { url: MD_URL, name: 'MD', center: [39.3189630108963, -76.61263639521701] };
  }
  if (state === 'NYC') {
    return { url: NYC_URL, name: 'NYC', center: [40.73519282571747, -73.99451133313708] };
  }
  return null;
}

router.beforeEach((to, from, next) => {
  console.log(to.fullPath);
  if (to.fullPath === '/VA' || to.fullPath === '/DC') {
    next(false);
    return;
  }
  // before each route transition (MD to NYC) calls vuex action with createPayload return
  // slice(1) is used to make '/MD' into 'MD'
  const payload = createPayload(to.fullPath.slice(1));
  store.dispatch('fetchProviders', payload);
  next();
});

export default router;
