<template>
  <div class="hello">
    <VDataTable
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="loading"
      hide-default-footer
    />
    <VForm>
      {{ form.name }}
      <VTextField :label="'Code Equipment'" v-model="form.name" />
      <VTextField :label="'Type Equipment'" v-model="form.elevation" />
      <v-btn @click="submitAction" class="mr-4"> submit </v-btn>
    </VForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VDataTable } from "vuetify/lib/components";

@Component({
  components: { VDataTable },
})
export default class EquipmentList extends Vue {
  loading = false;
  headers = [
    {
      text: "ID",
      value: "id",
    },
    {
      text: "CODE",
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
  ];
  items = [];

  form = {
    name: null,
  };

  submitAction() {
    this.loading = true;
    const params = {
      name: this.form.name,
      age: 26,
    };
    this.$store.dispatch("getEquipmentList", params).then((items) => {
      this.items = items;
      this.loading = false;
    });
  }

  /*created() {
    this.loading = true;
    this.$store.dispatch("getEquipmentList").then((items) => {
      this.items = items;
      this.loading = false;
    });
  }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  min-width: 1000px;
  min-height: 500px;
}
</style>
