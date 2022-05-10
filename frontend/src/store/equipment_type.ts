import EquipmentTypeApi from "@/api/EquipmentTypeApi";
import { TEquipmentType } from "@/types";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getEquipmentTypeList(): Promise<TEquipmentType[]> {
      return await EquipmentTypeApi.getList();
    },
    async saveEquipmentType(_: any, equipment: TEquipmentType): Promise<TEquipmentType> {
      return await EquipmentTypeApi.save(equipment.id, equipment);
    },
    async deleteEquipmentType(_: any, equipment: TEquipmentType): Promise<TEquipmentType> {
      return await EquipmentTypeApi.remove(equipment.id);
    },
    async addEquipmentType(_: any, equipment: TEquipmentType): Promise<number> {
      return await EquipmentTypeApi.add(equipment);
    },
  },
  modules: {},
};
