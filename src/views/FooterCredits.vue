<template>
  <div class="credits">
    by adunderground
    <a
      href="https://github.com/adunderground"
      target="_blank"
      class="credits__github credits__link"
    >
      &nbsp; &nbsp;
    </a>
    inspired by CJ
    <a href="https://coding.garden/" target="_blank" class="credits__cg credits__link">
      &nbsp; &nbsp; &nbsp;
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=B612&display=swap");

.credits {
  z-index: 11;
  position: absolute;
  bottom: 1%;
  right: 2.5%;

  font-family: "B612", sans-serif;
  background-color: #e7e7e7a1;
  padding: 0.25rem 0.5rem;
  font-size: 0.95rem;
  border-radius: 2.5px;
  &__link {
    &,
    &:link,
    &:visited {
      text-decoration: none;
    }
  }

  &__github {
    -webkit-mask-image: url("../assets/github.svg");
    margin-right: 0.75rem;
  }
  &__cg {
    font-size: 1.25rem;
    -webkit-mask-image: url("../assets/codinggarden.svg");
    margin-left: -0.4rem;
  }

  &__github,
  &__cg {
    background: #000;
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    &:hover {
      background: linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5);
    }
  }
  // TEXT GRADIENT
  // &__text {
  //   display: inline;
  //   font-weight: bold;
  //   background: -webkit-linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5);
  //   -webkit-background-clip: text;
  //   -webkit-text-fill-color: transparent;
  // }
}
</style>
