<template>
  <div class="country-main">
    <h2 class="q-pr-lg q-mr-lg">Select Country</h2>
    <q-card
      class="my-card q-ma-sm"
      v-for="(item, index) in this.$store.getters.getCountries"
      :key="index"
    >
      <q-img
        :src="item.country_logo"
        class="country-img"
        @click="GoLeagues(item)"
      >
        <div class="country-name absolute-bottom text-subtitle2 text-center">
          <span> {{ item.country_name }}</span>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      params: {
        met: "Countries",
      },
    };
  },
  mounted() {
    
    if (this.$store.state.countries == null) {
      const params = this.params;
      this.$axios.get("", { params }).then((res) => {
        this.$store.commit("setCountries", res.data.result);
      });
    }
  },
  methods: {
    GoLeagues(item) {
      this.$store.state.selectedCountry = item;
      localStorage.setItem("selectedCountry", JSON.stringify(item))
      this.$router.push({ path: `/leagues/${item.country_key}` });
    },
  },
};
</script>

<style scoped>
.country-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.country-img {
  height: 150px;
  width: 150px;
  transition: 0.5s ease all;
  cursor: pointer;
}
.country-name {
  display: flex;
  align-items: end;
  justify-content: center;
}
span {
  transition: 0.5s ease all;
}

.country-img:hover {
  transform: scale(1.1);
  z-index: 2;
}
.country-img {
  transition: all 0.4s ease;
}
.country-img:hover div {
  font-size: 1.3rem;
  height: 100%;
}
.country-img:hover span {
  transform: translateY(-75px);
}
</style>
