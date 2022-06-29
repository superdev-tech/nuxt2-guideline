<template>
  <v-row>
    <v-col class="text-center">
      <div>{{ currentLatLon }}</div>
      <div>Is this mobile breakpoint width: {{ isMobile }}</div>
      <div>App Version: {{ $config.version }}</div>
      <v-img
        :src="require(`@/assets/image/button/compass.svg`)"
        width="30px"
      ></v-img>
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  layout: 'inspireLayout',
  computed: {
    currentLatLon() {
      return this.$store.state.map.map
    },
    isMobile() {
      return this.$isMobile()
    },
  },
  mounted() {
    this.setLatLon()
    console.log(this.$config)
  },
  methods: {
    setLatLon() {
      this.$store.commit('map/setLatLon', { lat: 20.22, lon: 11.11 })
    },
  },
}
</script>
