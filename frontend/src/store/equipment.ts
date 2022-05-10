import EquipmentApi from "@/api/EquipmentApi";
import { TEquipment } from "@/types";

export default {
  state: {
    // equipments: [],
  },
  getters: {},
  mutations: {
    // setEquipments() {},
  },
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
};
