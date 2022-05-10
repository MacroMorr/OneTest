import EquipmentTypeApi from "@/api/EquipmentTypeApi";
import { TEquipmentType } from "@/types";
import { Store } from "vuex";

type TState = {
  equipmentTypeList: TEquipmentType[];
};

export default {
  state: (): TState => ({
    equipmentTypeList: [],
  }),
  getters: {},
  mutations: {
    setEquipmentsType(state: TState, equipmentTypeList: TEquipmentType[]): void {
      state.equipmentTypeList = equipmentTypeList;
    },
  },
  actions: {
    async getEquipmentTypeList(store: Store<TState>): Promise<void> {
      store.commit("setEquipmentsType", await EquipmentTypeApi.getList());
    },
    async saveEquipmentType(store: Store<TState>, newEquipment: TEquipmentType): Promise<void> {
      await EquipmentTypeApi.save(newEquipment.id, newEquipment);
      let newEquipments = [...store.state.equipmentTypeList];
      newEquipments = newEquipments.map((equipmentTypeList: TEquipmentType) => {
        if (equipmentTypeList.id === newEquipment?.id) {
          return newEquipment;
        }
        return equipmentTypeList;
      }) as TEquipmentType[];
      store.commit("setEquipmentsType", newEquipments);
    },

    async deleteEquipmentType(store: Store<TState>, removingEquipment: TEquipmentType): Promise<void> {
      await EquipmentTypeApi.remove(removingEquipment.id);
      const newEquipments = [] as TEquipmentType[];
      store.state.equipmentTypeList.forEach((equipmentTypeList: TEquipmentType) => {
        if (equipmentTypeList.id !== removingEquipment?.id) {
          newEquipments.push(equipmentTypeList);
        }
      });
      store.commit("setEquipmentsType", newEquipments);
    },
    async addEquipmentType(store: Store<TState>, newEquipment: TEquipmentType): Promise<void> {
      newEquipment.id = await EquipmentTypeApi.add(newEquipment);
      const newEquipments = [...store.state.equipmentTypeList];
      newEquipments.push(newEquipment);
      store.commit("setEquipmentsType", newEquipments);
    },
  },

  modules: {},
};
