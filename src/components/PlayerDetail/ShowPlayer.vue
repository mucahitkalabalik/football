<template>
  <q-btn
    label="Show Player Detail"
    style="color: goldenrod"
    outline
    @click="alert = true"
  />
  <q-dialog v-model="alert">
    <q-card  class="my-card">
      <q-img
        :src="getPlayer.player_image"
        class="image"
        @error="replaceByDefault"
      >
        <div class="absolute-bottom text-h6">
          {{ getPlayer.player_name }}
        </div>
      </q-img>

      <q-card-section> Age: {{ getPlayer.player_age }} </q-card-section>

      <q-card-section>
        {{ getPlayer.player_type }}
      </q-card-section>

      <q-card-section>
        Match Played: {{ getPlayer.player_match_played }}
      </q-card-section>
      <q-card-section> Goals: {{ getPlayer.player_goals }} </q-card-section>
      <q-card-section>
        Red Card: {{ getPlayer.player_red_cards }}
      </q-card-section>
      <q-card-section>
        Yellow Card: {{ getPlayer.player_yellow_cards }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import defaultimg from "../../assets/default-player.png";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alert: false,
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["getPlayer"]),
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = defaultimg;
    },
  },
};
</script>

<style scoped>
.mycard {
  width: 700px !important;
}
.image{
  height: 370px;
  width: 370px;
  margin: 50px;
  border-radius: 15px !important;
}
</style>