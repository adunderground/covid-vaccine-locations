<template>
  <div class="controller">
    <router-link class="controller__link--MD" to="/MD">Maryland Locations</router-link>
    <router-link class="controller__link--NYC" to="/NYC">New York City Locations</router-link>
    <router-link class="controller__link--VA" to="/VA"
    aria-label="Virginia locations are unavailable.
    Unfortunately this state did not make them public.">
      Virginia Locations</router-link
    >
    <router-link class="controller__link--DC" to="/DC"
    aria-label="D.C. locations are unavailable. Unfortunately D.C. did not make them public">
      Washington D.C. Locations</router-link
    >
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>

.controller {
  z-index: 10 !important;
  position: absolute;
  top: 10px;
  left: 60px;
  width: 25vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;

  font-family: "B612", sans-serif;
  background-color: #e7e7e7a1;
  padding: 0.5rem;
  font-size: 0.95rem;
  border-radius: 2.5px;
  a {
    margin: 0 1rem;
    padding: 1rem;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    text-align: center;
  }
  a:hover,
  a:active,
  a.router-link-active {
    border-color: #42b883;
    color: #42b883;
  }

  &__link {
    &--VA,
    &--DC {
      &:hover {
        cursor: not-allowed;
        border-color: transparent !important;
        color: #a09e9e !important;
      }
    }
  }
}
</style>
