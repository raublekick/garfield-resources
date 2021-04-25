<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <span class="title">GNR</span>
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="About"> About </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Garfield Neighborhood Resources</strong> curated by members of
          the Garfield Site Council, supported by:
        </p>

        <div class="columns">
          <div class="column">
            <a href="#" title="GarfieldNeighborhood.org">
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/go_logo.png')"
                  alt="Garfield Organization Logo"
                />
              </figure>
            </a>
          </div>
          <div class="column">
            <a
              target="_blank"
              href="https://mollenfoundation.org/"
              title="https://mollenfoundation.org/"
            >
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/logo-mollen_foundation.png')"
                  alt="Mollen Foundation Logo"
                />
              </figure>
            </a>
          </div>

          <div class="column">
            <a
              target="_blank"
              href="https://phxschools.org/garfield/"
              title="https://phxschools.org/garfield/"
            >
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/garfield-logo.png')"
                  alt="Garfield School Logo"
                />
              </figure>
            </a>
          </div>

          <div class="column">
            <a
              target="_blank"
              href="https://www.aimright.org/"
              title="https://www.aimright.org/"
            >
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/aimright-footer-logo.png')"
                  alt="Aim Right Ministries Logo"
                />
              </figure>
            </a>
          </div>

          <div class="column">
            <a
              target="_blank"
              href="https://unitephx.org/"
              title="https://unitephx.org/"
            >
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/unite.png')"
                  alt="Unite PHX Logo"
                />
              </figure>
            </a>
          </div>

          <div class="column">
            <a
              target="_blank"
              href="https://trinitycathedral.com/"
              title="https://trinitycathedral.com/"
            >
              <figure class="image">
                <img
                  class="image"
                  :src="require('@/assets/trinity.jpg')"
                  alt="Trinity Cathedral Logo"
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["loadData"]),
  },
  async created() {
    await this.loadData();
  },
};
</script>

<style lang="scss">
// .footer img {
//   max-height: 128px;
// }
@media print {
  .control {
    display: none !important;
  }
  .button {
    display: none !important;
  }
  // .footer {
  //   position: fixed;
  //   bottom: 0;
  // }
}
</style>
