<template>
 <q-btn   push class="back-btn q-ml-sm q-mt-sm" style="color: goldenrod" @click="back() "
    >Back Countries
  </q-btn>
  <div class="leagues-main">
    <div
      v-if="this.$store.state.selectedCountry"
      class="title q-ma-sm"
      :style="inlineStyle"
    >
      {{ league_name }} Leagues
    </div>
    <q-card
      class="my-card q-ma-sm"
      v-for="(item, index) in this.$store.getters.getLeagues"
      :key="index"
    >
      <q-img
        v-if="item.league_logo"
        :src="item.league_logo"
        class="country-img"
        @click="GoLeagueDetail(item)"
      >
       <template v-slot:error>
      <img class="default-league" src="../assets/default-league.png" alt="" srcset="">
      </template>
        <div class="country-name absolute-bottom text-subtitle2 text-center">
          <span class="league-title"> {{ item.league_name }}</span>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leagues: [],
      league_name : null
    };
  },
  computed: {
    inlineStyle() {
      return {
        backgroundImage: `url(${this.$store.state.selectedCountry.country_logo})`,
      };
    },
  },
  mounted() {
    if (!this.$store.state.selectedCountry) {
     this.$store.state.selectedCountry = localStorage.getItem("selectedCountry")
    }

    const params = {
      met: "Leagues",
      countryId: this.$route.params.id,
    };
    this.$axios.get("", { params }).then((res) => {
      this.$store.commit("setLeagues", res.data.result);
    });

 
  },
  methods: {
    GoLeagueDetail(item) {
      this.$store.state.selectedLeague = item;
         localStorage.setItem("selectedLeague", JSON.stringify(item))
      this.$router.push({ path: `/leagues/league/${item.league_key}` });
    },
     back() {
      this.$router.push({
        path: `/`,
      });
    },
  },
};
</script>

<style scoped>
.leagues-main {
  display: flex;
  flex-wrap: wrap;
}
.country-img {
  height: 150px;
  width: 150px;
  transition: all 0.4s ease;
  cursor: pointer;
}
.mycard {
  height: 200px;
  width: 200px;
}
.back-btn {
  height: 40px;
}
.title {
  font-size: 2rem !important;
  min-width: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
span {
  transition: 0.5s ease all;
}
.default-league{
  height: 200px;
  width: 200px;
}
.league-title {
  transition: 0.5s ease all;
}
.country-img {
  transition: all 0.4s ease;
}
.country-img:hover{
  transform: scale(1.1);
  z-index: 2;
}
.country-img:hover div {
  font-size: .8rem;
  height: 100%;
}
.country-img:hover span {
  transform: translateY(-75px);
}
</style>