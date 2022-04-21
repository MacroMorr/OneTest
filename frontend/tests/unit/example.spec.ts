import { shallowMount } from "@vue/test-utils";
import EquipmentList from "@/components/EquipmentList.vue";

describe("EquipmentList.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(EquipmentList, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
