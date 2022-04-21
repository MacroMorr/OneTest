import API from "@/api/API";

class EquipmentApi extends API {
  async getList(params: any): Promise<any> {
    return await this.get("/api/equipment", params);
  }
}

export default new EquipmentApi();
