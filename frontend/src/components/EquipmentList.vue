<template>
  <div class="equipment">
    <v-data-table :headers="headers" :items="equipments" :loading="loading" class="equipment-table" hide-default-footer>
      <template v-slot:[`item.edit`]="{ item: equipment }">
        <v-btn class="edit-btn" small @click="openEditEquipmentModal(equipment)">
          <mdicon height="16" name="pencil" width="16" />
        </v-btn>
        <v-btn class="remove-btn" small @click="openRemoveEquipmentModal(equipment)">
          <mdicon height="16" name="delete" width="16" />
        </v-btn>
      </template>
    </v-data-table>

    <VDialog v-model="dialog" max-width="500px" @click:outside="closeModal">
      <template v-slot:activator="{ item: equipment }">
        <v-btn color="red lighten-2" dark @click="openAddEquipmentModal(equipment)">Add a note</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titleEditEquipmentModal }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row v-if="dialogType === 'edit' || dialogType === 'addNote'">
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="tmpEquipment.id" disabled label="#" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="tmpEquipment.code" label="Code" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="tmpEquipment.code_equipment" label="Code Equipment" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="tmpEquipment.serial_number" label="Serial NUMBER" />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="tmpEquipment.notes" label="Notes" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal"> Cancel</v-btn>
          <v-btn v-if="dialogType === 'edit'" color="blue darken-1" text @click="saveEquipment"> Save</v-btn>
          <v-btn v-if="dialogType === 'addNote'" color="blue darken-1" text @click="addEquipment"> Add</v-btn>
          <v-btn v-if="dialogType === 'remove'" color="red darken-3" text @click="deleteEquipment"> Delete</v-btn>
        </v-card-actions>
      </v-card>
    </VDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TEquipment } from "@/types";

const DEFAULT_EQUIPMENT = {
  id: null,
  code: null,
  code_equipment: null,
  serial_number: null,
  notes: null,
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
      value: "code_equipment",
    },
    {
      text: "SERIAL NUMBER",
      value: "serial_number",
    },
    {
      text: "NOTE",
      value: "notes",
    },
    {
      text: "",
      value: "actions",
    },
  ];
  equipments: TEquipment[] = [];
  tmpEquipment: TEquipment | null = null;

  form = {
    name: null,
  };
  dialog = false;
  dialogType: "edit" | "remove" | "addNote" | null = null;

  get titleEditEquipmentModal(): string | null {
    switch (this.dialogType) {
      case "edit":
        return `Change equipment "${this.tmpEquipment?.serial_number}"`;

      case "remove":
        return `Are you sure you want to delete equipment "${this.tmpEquipment?.serial_number}"?`;

      case "addNote":
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
    this.dialogType = "edit";
    this.dialog = true;
  }

  openRemoveEquipmentModal(equipment: TEquipment): void {
    this.tmpEquipment = { ...equipment };
    this.dialogType = "remove";
    this.dialog = true;
  }

  openAddEquipmentModal(equipment: TEquipment): void {
    this.tmpEquipment = { ...equipment };
    this.dialogType = "addNote";
    this.dialog = true;
  }

  saveEquipment(): void {
    this.$store
      .dispatch("saveEquipment", this.tmpEquipment)
      .then(() => {
        this.equipments = this.equipments.map((equipment: TEquipment) => {
          if (equipment.id === this.tmpEquipment?.id) {
            return this.tmpEquipment;
          }

          return equipment;
        }) as TEquipment[];

        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  addEquipment(): void {
    this.$store
      .dispatch("addEquipment", this.tmpEquipment)
      .then((id: number) => {
        (this.tmpEquipment as TEquipment).id = id;
        this.equipments.push(this.tmpEquipment as TEquipment);
        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  deleteEquipment(): void {
    this.$store
      .dispatch("deleteEquipment", this.tmpEquipment)
      .then(() => {
        const newEquipments: TEquipment[] = [];
        this.equipments.forEach((equipment: TEquipment) => {
          if (equipment.id !== this.tmpEquipment?.id) {
            newEquipments.push(equipment);
          }
        });
        this.equipments = newEquipments;

        this.tmpEquipment = { ...DEFAULT_EQUIPMENT } as never as TEquipment;
        this.dialog = false;
      })
      .catch(({ exception, message }) => alert(`[${exception}] ${message}`));
  }

  mounted(): void {
    this.loading = true;
    this.$store.dispatch(`getEquipmentList`).then((equipments) => {
      this.equipments = equipments;
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
