import API from "@/api/API";
import { TEquipment } from "@/types";

class EquipmentApi extends API {
  async getList(): Promise<TEquipment[]> {
    return await this.get("/api/equipment");
  }

  async save(id: number, equipment: TEquipment): Promise<TEquipment> {
    return await this.put(`/api/equipment/${id}`, equipment);
  }

  async remove(id: number): Promise<TEquipment> {
    return await this.delete(`/api/equipment/${id}`);
  }

  async add(equipment: TEquipment): Promise<number> {
    return await this.post(`/api/equipment`, equipment);
  }
}

export default new EquipmentApi();
