<template>
  <div class="team-head">
    <div class="back q-mt-sm">
      <q-btn class="q-ma-md" style="color: goldenrod" push @click="goBack()"
        >Back</q-btn
      >
    </div>
    <img :src="logoSrc" class="team-logo" alt="" />
    <div class="title q-mb-lg">
      {{ leagueName.toUpperCase() }}
    </div>
  </div>
  <q-list bordered>
    <q-item
      clickable
      v-ripple
      v-for="(item, index) in teamDetail"
      :key="index"
      class="list"
      @click="DetailPlayer(item)"
    >
      <q-list-section class="list-item">
        <img
          v-if="item.player_image"
          :src="item.player_image"
          class="player-img"
          @error="replaceByDefault"
        />
        <img v-else src="../assets/default-player.png" class="player-img" />
      </q-list-section>
      <q-list-section class="list-item">
        {{ item.player_type }}
      </q-list-section>
      <q-list-section class="list-item">
        Name: {{ item.player_name }}
      </q-list-section>
      <q-list-section class="list-item">
        Number: {{ item.player_number }}
      </q-list-section>
      <q-list-section class="list-item">
        Age: {{ item.player_age }}
      </q-list-section>
      <q-list-section class="list-item">
        Goals: {{ item.player_goals }}
      </q-list-section>
      <q-list-section>
        <show-player />
      </q-list-section>
    </q-item>
  </q-list>
</template>

<script>
import ShowPlayer from "@/components/PlayerDetail/ShowPlayer.vue";
import defaultimg from "../assets/default-player.png";
export default {
  components: { ShowPlayer },
  data() {
    return {
      teamDetail: this.$store.getters.getTeam,
      logoSrc: this.$store.state.selectedTeam.team_logo,
      leagueName: this.$store.state.selectedTeam.team_name,
    };
  },
  methods: {
    DetailPlayer(item) {
      this.$store.commit("setPlayer", item);
    },
    replaceByDefault(e) {
      e.target.src = defaultimg;
    },
    goBack() {
      this.$router.push(
        `/leagues/league/${this.$store.state.selectedLeague.league_key}`
      );
    },
  },
};
</script>

<style scoped>
.team-head {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: default !important;
}
.team-logo {
  max-height: 300px;
  margin-top: 20px;
}
.title {
  font-size: 1.4rem;
}
.back {
  margin-right: auto;
}
.player-img {
  height: 40px;
  width: 40px;
}
.list-item {
  min-width: 150px;
}
</style>