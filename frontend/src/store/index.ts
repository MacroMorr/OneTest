import Vue from "vue";
import Vuex from "vuex";
import EquipmentApi from "@/api/EquipmentApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getEquipmentList(_: any, params: any): Promise<any> {
      const { request, mydata } = await EquipmentApi.getList(params);
      console.log(request);
      return mydata;
    },
  },
  modules: {},
});
