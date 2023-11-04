<template>
  <p class="shopName">Welcome shop!</p>
  <!-- <van-button type="primary">主要按钮</van-button> -->

  <van-calendar v-model:show="show" @confirm="onConfirm"/>
  <Slot>这是一个插槽功能</Slot>
  <div class="shopTabs">
    <Tabs></Tabs>
    <div  @click="oprint">打印</div>
  </div>
  <div>
    <van-cell title="选择单个日期" :value="date" @click="openPop" />
    <About :title="title" />
  </div>
</template>

<script lang="ts">
import { Button, Checkbox, CheckboxGroup } from "vant";
import { ref } from "vue";
import About from "./About.vue";
import Slot from "../components/Slot.vue";
import Tabs from "../components/TabTable.vue";
export default {
  components: {
    About,
    Button,
    Slot,
    Checkbox,
    CheckboxGroup,
    Tabs,
  },
  methods: {
    openPop(){
    alert('riqi');
  },
  },
  setup() {
    const date = ref("");
    const show = ref(false);
    const title = ref("请选择日期");
    const checked = ref(["a", "b"]);

    const formatDate = (date: { getMonth: () => number; getDate: () => any; }) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (value: any) => {
      title.value = "你已选择日期";
      console.log(value, title, "value");

      show.value = false;
      date.value = formatDate(value);
    };
    console.log('渲染顺序:setUp');
    
    return {
      date,
      show,
      onConfirm,
      title,
      checked,
    };
  },
  beforeCreate() {
    console.log('渲染顺序:beforeCreate');
  },
  created() {
    console.log('渲染顺序:created');
  },
  beforeMount() {
    console.log('渲染顺序:beforeMount');
  },
  mounted() {
    console.log('渲染顺序:mounted');
  },
  beforeUnmount() {
    console.log('渲染顺序:beforeUnmount');

  },
  unmounted() {
    console.log('渲染顺序:unmounted');

  },
};
</script>
<style lang="less" scoped>
.shopName {
  text-align: center;
}
.shopTabs {
  margin-top: 10px;
  text-align: center;
}
</style>