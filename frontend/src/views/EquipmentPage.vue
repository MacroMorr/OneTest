<template>
  <div class="home">
    <EquipmentList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EquipmentList from "@/components/EquipmentList.vue"; // @ is an alias to /src

@Component({
  components: {
    EquipmentList,
  },
})
export default class HomeView extends Vue {}
</script>
