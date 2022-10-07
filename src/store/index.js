import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      apiKey :"5ec58ce8132ebdeb4f9351bd3aa33486833ab0bdb00a2e136a48169e3b52237d",
      countries:null,
      leagues:null,
      selectedCountry : null,
      selectedLeague : null,
      selectedTeam : null,
      selectedPlayer: {}
    }
  },
  mutations: {
    setCountries (state,countries) {
      state.countries = countries
    },
    setLeagues (state,leagues) {
      state.leagues = leagues
    },
    setTeam (state,team) {
      state.selectedTeam = team
    },
    setPlayer (state,player) {
      state.selectedPlayer = player
    }
  },
  getters: {
    getCountries (state) {
      return state.countries
    },
    getLeagues (state) {
      return state.leagues
    },

    getTeam (state) {
      return state.selectedTeam.players
    },

    getPlayer (state) {
      return state.selectedPlayer
    }
  }
})


export default store;