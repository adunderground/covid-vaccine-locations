<template>
<div class="controller">
  <button @click="loadMD">Load MD</button>
  <button @click="loadNYC">Load NYC</button>
</div>
</template>
<script>
export default {
  methods: {
    loadMD() {
      // const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/0/query?where=0%3D0&outFields=%2A&f=json';
      // const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/1/query?where=0%3D0&outFields=%2A&f=json';
      const placesURL = 'https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=0%3D0&outFields=%2A&f=json';
      this.$store.dispatch('fetchProviders', { url: placesURL, name: 'MD', center: [39.3189630108963, -76.61263639521701] });
    },
    loadNYC() {
      const placesURL = 'https://services1.arcgis.com/oOUgp466Coyjcu6V/arcgis/rest/services/VaccineFinder_Production_View/FeatureServer/0/query?where=0%3D0&outFields=%2A&f=json';
      this.$store.dispatch('fetchProviders', { url: placesURL, name: 'NYC', center: [40.73519282571747, -73.99451133313708] });
    },
  },
};
</script>
<style lang="scss" scoped>
  .controller {
  z-index: 10 !important;
  position: absolute;
  top: 10px;
  left: 60px;

  font-family: 'B612', sans-serif;
  background-color: #e7e7e7a1;
  padding: 25px 2rem;
  font-size: 0.95rem;
  border-radius: 2.5px;
    & > * {
      margin: 0 1rem;
      display: inline-block;
    }
  }
</style>
