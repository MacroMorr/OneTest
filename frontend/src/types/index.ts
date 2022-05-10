export type TEquipment = {
  id: number;
  code: string;
  equipment_type_id: string;
  serial_number: string;
  note: string;
  created_at?: string;
  updated_at?: string;
};

export type TEquipmentType = {
  id: number;
  code: string;
  type: string;
  mask_serial_number: string;
  created_at?: string;
  updated_at?: string;
};
