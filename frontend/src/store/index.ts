import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import equipment from "./equipment";
import equipmentType from "./equipment_type";

Vue.use(Vuex);

const store: StoreOptions<any> = {
  modules: {
    equipment,
    equipmentType,
  } as any,
};
export default new Vuex.Store<any>(store);
