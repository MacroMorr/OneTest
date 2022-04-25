import Vue from "vue";
import Vuex from "vuex";
import EquipmentApi from "@/api/EquipmentApi";
import { TEquipment } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getEquipmentList(): Promise<TEquipment[]> {
      return await EquipmentApi.getList();
    },
    async saveEquipment(_: any, equipment: TEquipment): Promise<TEquipment> {
      return await EquipmentApi.save(equipment.id, equipment);
    },
    async deleteEquipment(_: any, equipment: TEquipment): Promise<TEquipment> {
      return await EquipmentApi.remove(equipment.id);
    },
    async addEquipment(_: any, equipment: TEquipment): Promise<number> {
      return await EquipmentApi.add(equipment);
    },
  },
  modules: {},
});
