<template>
  <q-btn text-color="white" class="q-ml-md" @click="basic = true"
    >Probabilities</q-btn
  >
  <q-dialog
    v-model="basic"
    transition-show="rotate"
    transition-hide="rotate"
    full-width
  >
    <q-card
      class="prob-card q-pa-lg text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <div class="row">
        <div class="col-4">
          <div class="row">
            <div class="col">
              <h4>{{ prob.league_name }}</h4>
              <h5>Tarih-Saat: {{ prob.event_date }} {{ prob.event_time }}</h5>
            </div>
          </div>
        </div>
        <div class="col-8 detail">
          <div class="row">
            <div class="team-name q-ml-lg col-6">
              {{ prob.event_home_team }}
            </div>
            <div class="team-name col-4 q-mr-lg">
              {{ prob.event_away_team }}
            </div>
          </div>
          <div class="row">
            <div class="q-ml-lg col-3">1: {{ prob.event_HW }}</div>
            <div class="q-ml-lg col-3">0: {{ prob.event_D }}</div>
            <div class="col-3 q-mr-lg">2: {{ prob.event_AW }}</div>
          </div>
          <div class="row">
            <div class="q-ml-lg col-3">0-1: {{ prob.event_HW_D }}</div>
            <div class="q-ml-lg col-3">1-2: {{ prob.event_HW_AW }}</div>
            <div class="col-3 q-mr-lg">0-2: {{ prob.event_AW_D }}</div>
          </div>
          <div class="row">
            <div class="q-ml-lg col-3">Alt {{ prob.event_U }}</div>
            <div class="q-ml-lg col-3">Üst {{ prob.event_O }}</div>
            <div class="col-3 q-mr-lg">Ots {{ prob.event_ots }}</div>
          </div>
          <div class="row" v-if="prob.event_halftime_result">
            <div class="q-ml-lg col-3">
              Maç Sonucu: {{ prob.event_final_result }}
            </div>
            <div class="q-ml-lg col-3">
              İkinci Yarı: {{ prob.event_ft_result }}
            </div>
            <div class="col-3 q-mr-lg">
              İlk Yarı: {{ prob.event_halftime_result }}
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      basic: false,
      prob: [],
    };
  },
  props: {
    matchId: {
      require: true,
    },
    event_date: {
      require: true,
    },
  },
  mounted() {
    const params = {
      met: "Probabilities",
      matchId: this.matchId,
      from: this.event_date,
    };

    this.$axios.get("", { params }).then((res) => {
      console.log(res);
      this.prob = res.data.result[0];
    });
  },
};
</script>

<style scoped>
.prob-card {
  width: 100%;
 color: rgba(231, 231, 231, 0.904)!important;
}
.team-name {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>