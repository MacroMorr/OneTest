import Vue from "vue";
import Vuex from "vuex";
import equipment from "./equipment";
import equipmentType from "./equipment_type";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    equipment,
    equipmentType,
  },
});
