<template>
  <q-btn
      push
    class="q-mt-lg q-ml-lg"
    style="color: goldenrod"
    @click="back()"
    >Back Leagues
  </q-btn>
  <q-btn
    push
    class="q-mt-lg q-ml-lg"
    @click="backCountry()"
    label="Countries"
  />
  <div class="title">
    <img class="league-image" :src="leagueImage" />
  </div>
  <div class="spinner" v-if="!teams">
    <q-spinner-rings color="grey" size="15em" />
  </div>

  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="left"
    narrow-indicator
    v-if="teams"
  >
    <q-tab name="Teams" label="Teams" />
    <q-tab name="Standings" label="Standings" />
    <q-tab name="Topscorers" label="Topscorers" />
    <q-tab name="Fixtures" label="Fixtures" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="Teams">
      <TeamList :teams="teams" />
    </q-tab-panel>
    <q-tab-panel name="Standings">
      <StandingsLine />
    </q-tab-panel>
    <q-tab-panel name="Topscorers">
      <top-scorers />
    </q-tab-panel>
    <q-tab-panel name="Fixtures">
      <fixtures />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
//components
import TeamList from "@/components/LeagueDetail/_TeamList.vue";
import StandingsLine from "@/components/LeagueDetail/_Standings.vue";
import TopScorers from "@/components/LeagueDetail/_TopScorers.vue";
import fixtures from "@/components/LeagueDetail/_Fixtures.vue";

export default {
  components: { TeamList, StandingsLine, TopScorers, fixtures },
  data() {
    return {
      teams: null,
      leagueName: this.$store.state.selectedLeague.league_name,
      leagueImage: this.$store.state.selectedLeague.league_logo,
      tab: "Teams",
    };
  },
  mounted() {
    const params = {
      met: "Teams",
      leagueId: this.$route.params.id,
    };
    this.$axios
      .get("", { params })
      .then((res) => {
        this.teams = res.data.result;
      })
      .catch((err) => {
        console.log(err, "error");
      });
  },
  methods: {
    back() {
      this.$router.push({
        path: `/leagues/${this.$store.state.selectedCountry.country_key}`,
      });
    },
    backCountry() {
      this.$router.push({
        path: `/`,
      });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.league-image {
  max-height: 300px;
  margin-top: 20px;
}
.spinner {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>