<template>
  <q-list bordered>
    <q-item clickable v-ripple v-for="(item, index) in teams" :key="index" @click="GoTeamDetail(item)">
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="item.team_logo" />
        </q-avatar>
      </q-item-section>
      <q-item-section>{{ item.team_name }}</q-item-section>
      <q-item-section> Coach: {{ item.coaches[0].coach_name }}</q-item-section>
      <q-item-section> <q-btn style="color: goldenrod" outline @click="GoTeamDetail(item)"> Team Detail</q-btn></q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
    },
  },
  methods: {
    GoTeamDetail(item){
       this.$store.commit("setTeam", item);
       this.$router.push({path:`/league/team/${item.team_key}`})
    }
  },
};
</script>

<style>
</style>