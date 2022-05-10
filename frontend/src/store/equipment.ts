import EquipmentApi from "@/api/EquipmentApi";
import { TEquipment } from "@/types";
import { Store } from "vuex";

type TState = {
  equipments: TEquipment[];
};
export default {
  state: (): TState => ({
    equipments: [],
  }),
  getters: {},
  mutations: {
    setEquipments(state: TState, equipments: TEquipment[]): void {
      state.equipments = equipments;
    },
  },
  actions: {
    async getEquipmentList(store: Store<TState>): Promise<void> {
      store.commit("setEquipments", await EquipmentApi.getList());
    },
    async saveEquipment(store: Store<TState>, newEquipment: TEquipment): Promise<void> {
      await EquipmentApi.save(newEquipment.id, newEquipment);
      let newEquipments = [...store.state.equipments];
      newEquipments = newEquipments.map((equipment: TEquipment) => {
        if (equipment.id === newEquipment?.id) {
          return newEquipment;
        }
        return equipment;
      }) as TEquipment[];
      store.commit("setEquipments", newEquipments);
    },
    async deleteEquipment(store: Store<TState>, removingEquipment: TEquipment): Promise<void> {
      await EquipmentApi.remove(removingEquipment.id);
      const newEquipments = [] as TEquipment[];
      store.state.equipments.forEach((equipment: TEquipment) => {
        if (equipment.id !== removingEquipment?.id) {
          newEquipments.push(equipment);
        }
      });
      store.commit("setEquipments", newEquipments);
    },
    async addEquipment(store: Store<TState>, newEquipment: TEquipment): Promise<void> {
      newEquipment.id = await EquipmentApi.add(newEquipment);
      const newEquipments = [...store.state.equipments];
      newEquipments.push(newEquipment);
      store.commit("setEquipments", newEquipments);
    },
  },
  modules: {},
};
