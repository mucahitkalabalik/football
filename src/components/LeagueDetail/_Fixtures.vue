<template>
  <div class="fixtures" v-if="fixtures">
    <q-date class="date" v-model="selectedDate" range />
    <q-list>
      <q-spinner-dots
        v-if="spin"
        color="blue"
        class="q-ml-lg q-pa-lg"
        size="15em"
      />

      <q-item
        v-for="(item, index) in fixtures"
        :key="index"
        class="list-item"
        @click="probabilities(item)"
        v-else
      >
        <q-item-label class="q-mr-sm">{{ item.event_date }}</q-item-label>
        <q-item-label v-if="item.event_status" class="q-ml-sm">{{
          item.event_status + "-"
        }}</q-item-label>

        <q-item-label class="home-team">{{
          item.event_home_team
        }}</q-item-label>
        <img
          :src="item.home_team_logo"
          alt=""
          srcset=""
          class="team-logo q-mr-sm"
        />
        <q-item-label class="score" v-if="item.event_final_result">{{
          item.event_final_result
        }}</q-item-label>
        <q-item-label class="score" v-else> - </q-item-label>
        <img
          :src="item.away_team_logo"
          alt=""
          srcset=""
          class="team-logo q-ml-sm"
        />
        <q-item-label class="away-team">{{
          item.event_away_team
        }}</q-item-label>
        <q-item-label class="stadium"
          >Stadium : {{ item.event_stadium }}</q-item-label
        >
        <q-item-label class="prob">
          <probilities :matchId="item.event_key" :event_date="item.event_date"
        /></q-item-label>
      </q-item>
    </q-list>
  </div>
  <div class="spin-line" v-else>
    <q-spinner-rings class="spin" color="grey" size="15em" />
  </div>
</template>

<script>
import probilities from "./_Probilities.vue";
let currentDate = new Date().toJSON().slice(0, 10);
export default {
  components: { probilities },
  data() {
    return {
      fixtures: null,
      currentDate: currentDate,
      selectedDate: currentDate,
      from: currentDate,
      to: "2022-10-10",
      spin: false,
    };
  },
  watch: {
    // whenever question changes, this function will run
    selectedDate(newQuestion) {
      this.from = newQuestion.from;
      this.to = newQuestion.to;
      this.getFixtures();
    },
  },
  mounted() {
    this.getFixtures();
  },
  methods: {
    getFixtures() {
      this.spin = true;
      const params = {
        met: "Fixtures",
        leagueId: this.$store.state.selectedLeague.league_key,
        from: this.from,
        to: this.to,
      };
      this.$axios
        .get("", { params })
        .then((res) => {
          this.fixtures = res.data.result;
          console.log(this.fixtures);
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.spin = false;
        });
    },
    probabilities(match) {
      console.log(match);
    },
  },
};
</script>

<style scoped>
.fixtures {
  display: flex;
   color: rgb(231, 231, 231)!important;
}
.team-logo {
  height: 30px;
}
.date {
  max-height: 370px;
  margin-right: 50px;
  color: #014a88;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: start;
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
  margin-bottom: 2px;
  border-radius: 5px;
}
.home-team {
  width: 120px;
}
.away-team {
  width: 120px;
  margin-left: 10px;
}
.stadium {
  margin-left: 10px;
}
.referee {
  margin-left: 10px;
}
.score {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
}
.spin-line {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
.prob{
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
