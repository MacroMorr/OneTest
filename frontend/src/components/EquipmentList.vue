<template>
  <div class="equipment">
    <v-data-table :headers="headers" :items="equipments" :loading="loading" class="equipment-table" hide-default-footer>
      <template v-slot:[`item.actions`]="{ item: equipment }">
        <v-btn class="edit-btn" small @click="openEditEquipmentModal(equipment)">
          <mdicon height="16" name="pencil" width="16" />
        </v-btn>
        <v-btn class="remove-btn" small @click="openRemoveEquipmentModal(equipment)">
          <mdicon height="16" name="delete" width="16" />
        </v-btn>
      </template>
    </v-data-table>
    <v-btn color="red lighten-2" dark @click="openAddEquipmentModal()">Add equipment</v-btn>

    <VDialog v-if="dialog" v-model="dialog" max-width="500px" @click:outside="closeModal">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titleEditEquipmentModal }}</span>
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
                <v-text-field v-model="tmpEquipment.id" disabled label="#" />
              </v-col>
            </v-row>

            <v-row v-if="dialogType === 'edit' || dialogType === 'add'">
              <v-col cols="12" md="4">
                <v-text-field v-model="tmpEquipment.code" label="Code" />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="tmpEquipment.equipment_type_id"
                  :items="equipmentTypeList"
                  item-text="code"
                  item-value="id"
                  label="Equipment type"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="tmpEquipment.serial_number" label="Serial NUMBER" />
              </v-col>
            </v-row>

            <v-row v-if="dialogType === 'edit' || dialogType === 'add'">
              <v-col>
                <v-textarea v-model="tmpEquipment.note" label="note" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal"> Cancel</v-btn>
          <v-btn v-if="dialogType === 'edit'" color="blue darken-1" text @click="saveEquipment"> Save</v-btn>
          <v-btn v-if="dialogType === 'add'" color="blue darken-1" text @click="addEquipment"> Add</v-btn>
          <v-btn v-if="dialogType === 'remove'" color="red darken-3" text @click="deleteEquipment"> Delete</v-btn>
        </v-card-actions>
      </v-card>
    </VDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TEquipment, TEquipmentType } from "@/types";

const DEFAULT_EQUIPMENT = {
  id: null,
  code: null,
  equipment_type_id: null,
  serial_number: null,
  note: null,
};

@Component({})
export default class EquipmentList extends Vue {
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
      text: "Code equipment",
      value: "equipment_type_id",
    },
    {
      text: "SERIAL NUMBER",
      value: "serial_number",
    },
    {
      text: "NOTE",
      value: "note",
    },
    {
      text: "",
      value: "actions",
    },
  ];

  get equipments(): TEquipment[] {
    return this.$store.state.equipment.equipments;
  }

  get equipmentTypeList(): TEquipmentType[] {
    return this.$store.state.equipmentType.equipmentTypeList;
  }

  tmpEquipment: TEquipment | null = null;

  form = {
    name: null,
  };
  errors: string[] = [];

  dialog = false;
  dialogType: "edit" | "remove" | "add" | null = null;

  get titleEditEquipmentModal(): string | null {
    switch (this.dialogType) {
      case "edit":
        return `Change equipment "${this.tmpEquipment?.serial_number}"`;

      case "remove":
        return `Are you sure you want to delete equipment "${this.tmpEquipment?.serial_number}"?`;

      case "add":
        return `Fill in the fields`;
    }
    return null;
  }

  closeModal(): void {
    this.dialog = false;
    this.dialogType = null;
  }

  openEditEquipmentModal(equipment: TEquipment): void {
    this.tmpEquipment = { ...equipment };
    this.$store
      .dispatch("getEquipmentTypeList")
      .then(() => {
        this.dialogType = "edit";
        this.dialog = true;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  openRemoveEquipmentModal(equipment: TEquipment): void {
    this.tmpEquipment = { ...equipment };
    this.dialogType = "remove";
    this.dialog = true;
  }

  openAddEquipmentModal(): void {
    this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as any;
    this.$store
      .dispatch("getEquipmentTypeList")
      .then((/*list*/) => {
        //this.equipmentTypeList = list;
        this.dialogType = "add";
        this.dialog = true;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  saveEquipment(): void {
    this.$store
      .dispatch("saveEquipment", this.tmpEquipment)
      .then(() => {
        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  addEquipment(): void {
    if (!/\d+/.test((this.tmpEquipment as TEquipment).code)) {
      this.errors.push("Code should be a number!");
      return;
    }

    if (!/\d+/.test((this.tmpEquipment as TEquipment).equipment_type_id)) {
      this.errors.push("Code equipment should be a number!");
      return;
    }

    if (!/(\d|[A-z])+/.test((this.tmpEquipment as TEquipment).serial_number)) {
      this.errors.push("Serial number should be a number!");
      return;
    }

    this.$store
      .dispatch("addEquipment", this.tmpEquipment)
      .then(() => {
        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  deleteEquipment(): void {
    this.$store
      .dispatch("deleteEquipment", this.tmpEquipment)
      .then(() => {
        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  mounted(): void {
    this.loading = true;
    this.$store.dispatch(`getEquipmentList`).then(() => {
      this.loading = false;
    });
  }
}
</script>

<style scoped lang="scss">
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
