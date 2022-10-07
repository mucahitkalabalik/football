import axios from "axios";
import store from "@/store";

const appAxios = axios.create({
  baseURL: "https://apiv2.allsportsapi.com/football/",
  params:{
    APIkey : store.state.apiKey
  }
});

export default appAxios;