<template>
  <q-table
    :title="title"
    v-model:pagination="pagination"
    :rows="scorers"
    :columns="columns"
    row-key="name"
    :loading="loading"
    color="white"
    :fullscreen="fullscreen"
    card-class="bg-amber-1 text-black"
    table-class="text-black"
    table-header-class="text-brown"
  >
    <template v-slot:top-right>
      <q-btn v-if="!fullscreen" outline class="q-ma-lg" @click="ScreenChange()">
        Fullscreen
      </q-btn>

      <q-btn
        v-if="fullscreen"
        outline
        color="red"
        class="q-ma-lg"
        @click="ScreenChange()"
      >
        Exit Fullscreen
      </q-btn>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      title: this.$store.state.selectedLeague.league_name + " Top Scorers",
      scorers: [],
      loading: true,
      fullscreen: false,
      pagination: {
        rowsPerPage: null,
      },
      columns: [
        {
          name: "player_place",
          label: "player_place",
          field: "player_place",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "player_name",
          label: "player_name",
          field: "player_name",
          align: "left",
        },
        {
          name: "team_name",
          label: "team_name",
          field: "team_name",
          align: "left",
        },
        {
          name: "goals",
          label: "goals",
          field: "goals",
          align: "left",
        },
        {
          name: "assists",
          label: "assists",
          field: "assists",
          align: "left",
        },
      ],
    };
  },
  mounted() {
    const params = {
      met: "Topscorers",
      leagueId: this.$store.state.selectedLeague.league_key,
    };
    this.$axios.get("", { params }).then((res) => {
      this.scorers = res.data.result;
      this.loading = false;
      this.scorers.map((item) => {
        if (!item.assists) {
          item.assists = 0;
        }
      });
    });
  },
  methods: {
    ScreenChange() {
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style>
</style>