import { createRouter, createWebHashHistory } from "vue-router";

//components
import HomePage from "../views/HomePage.vue";
import AllLeagues from "../views/AllLeagues.vue";
import LeagueDetail from "../views/LeaguesDetail.vue";
import TeamDetail from "../views/TeamDetails.vue"
import PlayerDetail from "../views/PlayerDetail.vue"

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "AllLeagues",
    path: "/leagues/:id",
    component: AllLeagues,
  },
  {
    name: "LeagueDetail",
    path: '/leagues/league/:id',
    component: LeagueDetail,
  },
  {
    name: "TeamDetail",
    path: '/league/team/:id',
    component: TeamDetail,
  },
  {
    name: "PlayerDetail",
    path: '/league/team/player/:id',
    component: PlayerDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
