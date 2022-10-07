<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      v-model:pagination="pagination"
      :rows="standingList"
      :columns="columns"
      row-key="name"
      :loading="loading"
      color="negative"
      :fullscreen="fullscreen"
      card-class="bg-amber-1 text-black"
      table-class="text-black"
      table-header-class="text-brown"
    >
      <template v-slot:top-right>
        <q-btn
          v-if="!fullscreen"
          outline
          class="q-ma-lg"
          @click="ScreenChange()"
        >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$store.state.selectedLeague.league_name + " Standings",
      standingList: [],
      fullscreen: false,
      loading: true,
      pagination: {
        rowsPerPage: null,
      },
      columns: [
        {
          name: "standing_place",
          label: "standing_place",
          field: "standing_place",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_team",
          label: "standing_team",
          field: "standing_team",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_W",
          label: "standing_W",
          field: "standing_W",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_D",
          label: "standing_D",
          field: "standing_D",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_L",
          label: "standing_L",
          field: "standing_L",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_F",
          label: "standing_F",
          field: "standing_F",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_A",
          label: "standing_A",
          field: "standing_A",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_GD",
          label: "standing_GD",
          field: "standing_GD",
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "standing_PTS",
          label: "standing_PTS",
          field: "standing_PTS",
          align: "center",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
    };
  },
  mounted() {
    this.getStandings();
  },
  methods: {
    async getStandings() {
      const params = {
        met: "Standings",
        leagueId: this.$store.state.selectedLeague.league_key,
      };
      await this.$axios.get("", { params }).then((res) => {
        this.standingList = res.data.result.total;
        this.loading = false;
      });
    },
    ScreenChange() {
      this.fullscreen = !this.fullscreen;
    },
    GoTeamDetail(item) {
      this.$store.commit("setTeam", item);
      this.$router.push({ path: `/league/team/${item.team_key}` });
    },
  },
};
</script>

<style>
</style>