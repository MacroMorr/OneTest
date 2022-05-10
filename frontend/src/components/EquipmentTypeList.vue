<template>
  <div class="equipment">
    <v-data-table
      :headers="headers"
      :items="equipmentTypeList"
      :loading="loading"
      class="equipment-table"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item: equipmentType }">
        <v-btn class="edit-btn" small @click="openEditEquipmentTypeModal(equipmentType)">
          <mdicon height="16" name="pencil" width="16" />
        </v-btn>
        <v-btn class="remove-btn" small @click="openRemoveEquipmentTypeModal(equipmentType)">
          <mdicon height="16" name="delete" width="16" />
        </v-btn>
      </template>
    </v-data-table>
    <v-btn color="red lighten-2" dark @click="openAddEquipmentTypeModal()">Add equipment type</v-btn>

    <!--  Dialog Two-->
    <VDialog v-if="dialog" v-model="dialog" max-width="500px" @click:outside="closeModal">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titleEditEquipmentModalType }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row v-for="(error, idx) in errors" :key="idx">
              <v-col>
                <v-alert dense outlined type="error">
                  {{ error }}
                </v-alert>
              </v-col>
            </v-row>

            <v-row v-if="dialogType === 'edit'">
              <v-col cols="12" md="12">
                <v-text-field v-model="tmpEquipmentType.id" disabled label="#" />
              </v-col>
            </v-row>

            <v-row v-if="dialogType === 'edit' || dialogType === 'add'">
              <v-col cols="12" md="4">
                <v-text-field v-model="tmpEquipmentType.code" label="CODE" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="tmpEquipmentType.type" label="TYPE" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="tmpEquipmentType.mask_serial_number" label="MASK SERIAL NUMBER" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal"> Cancel</v-btn>
          <v-btn v-if="dialogType === 'edit'" color="blue darken-1" text @click="saveEquipmentType"> Save</v-btn>
          <v-btn v-if="dialogType === 'add'" color="blue darken-1" text @click="addEquipmentType"> Add</v-btn>
          <v-btn v-if="dialogType === 'remove'" color="red darken-3" text @click="deleteEquipmentType"> Delete</v-btn>
        </v-card-actions>
      </v-card>
    </VDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TEquipmentType } from "@/types";

const DEFAULT_EQUIPMENT_TYPE = {
  id: null,
  code: null,
  type: null,
  mask_serial_number: null,
};

@Component({})
export default class EquipmentTypeList extends Vue {
  loading = false;
  headers = [
    {
      text: "ID",
      value: "id",
    },
    {
      text: "CODE",
      value: "code",
    },
    {
      text: "TYPE",
      value: "type",
    },
    {
      text: "MASK SERIAL NUMBER",
      value: "mask_serial_number",
    },
    {
      text: "",
      value: "actions",
    },
  ];
  equipmentTypeList: TEquipmentType[] = [];
  tmpEquipmentType: TEquipmentType | null = null;

  form = {
    name: null,
  };
  errors: string[] = [];

  dialog = false;
  dialogType: "edit" | "remove" | "add" | null = null;

  get titleEditEquipmentModalType(): string | null {
    switch (this.dialogType) {
      case "edit":
        return `Change equipment "${this.tmpEquipmentType?.mask_serial_number}"`;

      case "remove":
        return `Are you sure you want to delete equipment "${this.tmpEquipmentType?.mask_serial_number}"?`;

      case "add":
        return `Fill in the fields Type`;
    }
    return null;
  }

  mounted(): void {
    this.loading = true;
    this.$store.dispatch(`getEquipmentTypeList`).then((equipmentTypeList) => {
      this.equipmentTypeList = equipmentTypeList;
      this.loading = false;
    });
  }

  closeModal(): void {
    this.dialog = false;
    this.dialogType = null;
  }

  openEditEquipmentTypeModal(equipmentType: TEquipmentType): void {
    this.tmpEquipmentType = { ...equipmentType };
    this.$store
      .dispatch("getEquipmentTypeList")
      .then((listType) => {
        this.equipmentTypeList = listType;
        this.dialogType = "edit";
        this.dialog = true;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  openRemoveEquipmentTypeModal(equipmentType: TEquipmentType): void {
    this.tmpEquipmentType = { ...equipmentType };
    this.dialogType = "remove";
    this.dialog = true;
  }

  openAddEquipmentTypeModal(): void {
    this.tmpEquipmentType = { ...DEFAULT_EQUIPMENT_TYPE } as any;
    this.dialogType = "add";
    this.dialog = true;
  }

  saveEquipmentType(): void {
    this.$store
      .dispatch("saveEquipmentType", this.tmpEquipmentType)
      .then(() => {
        this.equipmentTypeList = this.equipmentTypeList.map((equipmentType: TEquipmentType) => {
          if (equipmentType.id === this.tmpEquipmentType?.id) {
            return this.tmpEquipmentType;
          }

          return equipmentType;
        }) as TEquipmentType[];

        this.tmpEquipmentType = { ...DEFAULT_EQUIPMENT_TYPE } as never as TEquipmentType;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  addEquipmentType(): void {
    if (!/\d+/.test((this.tmpEquipmentType as TEquipmentType).code)) {
      this.errors.push("Code should be a number TYPE!");
      return;
    }

    if (!/\d+/.test((this.tmpEquipmentType as TEquipmentType).type)) {
      this.errors.push("Code equipment should be a number TYPE!");
      return;
    }

    if (!/\d+|a-z|A-Z/.test((this.tmpEquipmentType as TEquipmentType).mask_serial_number)) {
      this.errors.push("Serial number should be a number TYPE!");
      return;
    }

    this.$store
      .dispatch("addEquipmentType", this.tmpEquipmentType)
      .then((id: number) => {
        (this.tmpEquipmentType as TEquipmentType).id = id;
        this.equipmentTypeList.push(this.tmpEquipmentType as TEquipmentType);
        this.tmpEquipmentType = { ...DEFAULT_EQUIPMENT_TYPE } as never as TEquipmentType;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  deleteEquipmentType(): void {
    this.$store
      .dispatch("deleteEquipmentType", this.tmpEquipmentType)
      .then(() => {
        const newEquipmentTypeList: TEquipmentType[] = [];
        this.equipmentTypeList.forEach((equipmentType: TEquipmentType) => {
          if (equipmentType.id !== this.tmpEquipmentType?.id) {
            newEquipmentTypeList.push(equipmentType);
          }
        });
        this.equipmentTypeList = newEquipmentTypeList;

        this.tmpEquipmentType = { ...DEFAULT_EQUIPMENT_TYPE } as never as TEquipmentType;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }
}
</script>

<style lang="scss" scoped>
.equipment {
  &-table {
    min-width: 80%;
    margin: auto;

    .edit-btn {
      height: 36px;
    }
  }
}
</style>
