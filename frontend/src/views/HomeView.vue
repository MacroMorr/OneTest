<template>
  <div class="home">
    <EquipmentList />
    <hr class="divided" />
    <EquipmentTypeList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EquipmentList from "@/components/EquipmentList.vue"; // @ is an alias to /src
import EquipmentTypeList from "@/components/EquipmentTypeList.vue"; // @ is an alias to /src

@Component({
  components: {
    EquipmentList,
    EquipmentTypeList,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.divided {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
