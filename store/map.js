// How to use set and get pattern
// set: this.$store.commit('map/setLatLon', {lat:20.22, lon:11.11})
// get: this.$store.state.map

export const state = () => ({
  map: {
    lat: 0,
    lon: 0,
  },
})

export const mutations = {
  setLatLon(state, { lat, lon }) {
    state.map.lat = lat
    state.map.lon = lon
  },
}
