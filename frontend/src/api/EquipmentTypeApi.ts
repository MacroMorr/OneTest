import API from "@/api/API";
import { TEquipmentType } from "@/types";

class EquipmentTypeApi extends API {
  async getList(): Promise<TEquipmentType[]> {
    return await this.get("/api/equipment_type");
  }

  async save(id: number, equipment: TEquipmentType): Promise<TEquipmentType> {
    return await this.put(`/api/equipment_type/${id}`, equipment);
  }

  async remove(id: number): Promise<TEquipmentType> {
    return await this.delete(`/api/equipment_type/${id}`);
  }

  async add(equipment: TEquipmentType): Promise<number> {
    return await this.post(`/api/equipment_type`, equipment);
  }
}

export default new EquipmentTypeApi();
