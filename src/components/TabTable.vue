<template>
  <van-tabs v-model:active="active" sticky>
    <van-tab :title="item" v-for="(item, index) in state.list" :name='index'>
      <div v-show="active == 0">
        <div v-for="val in state.categoryList.filter(ival => ival.type == 1)" class="shopContent" >
          {{ val.type }}
          <img :src="val.imgUrl" alt="" />
          <div class="shopTitle">
            <div>特殊类:{{ val.type }}</div>
            <p>{{ val.name }}</p>
            <div>{{ val.categoryId }}</div>
          </div>
        </div>
      </div>
      <div v-show="active==1">
        <div v-for="val in state.categoryList.filter(ival => ival.type == 2)" class="shopContent">
          <img :src="val.imgUrl" alt="" />
          <div class="shopTitle">
            <div>特殊类:{{ val.type }}</div>
            <p>{{ val.name }}</p>
            <div>{{ val.categoryId }}</div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
  <van-cell-group inset>
  <van-field v-model="value" label="文本" placeholder="请输入用户名" />
</van-cell-group>
</template>
<script lang="ts">
import { ref, reactive, watch } from "vue";
import { Tab, Tabs, Field, CellGroup } from "vant";
export default {
  components: { Tabs, Tab, Field, CellGroup },
  props: {
    title: String,
  },
  data() {
    return {};
  },
  setup(props) {
    const active = ref(0);
    const value = ref('')
    const state = reactive({
      swiperList: [], // 轮播图列表
      isLogin: false, // 是否已登录
      headerScroll: false, // 滚动透明判断
      hots: [],
      newGoodses: [],
      recommends: [],
      categoryList: [
        {
          name: "新蜂超市",
          type: 1,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
          categoryId: 100001,
        },
        {
          name: "新蜂服饰",
          type: 1,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
          categoryId: 100003,
        },
        {
          name: "全球购",
          type: 1,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
          categoryId: 100002,
        },
        {
          name: "新蜂生鲜",
          type: 1,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
          categoryId: 100004,
        },
        {
          name: "新蜂到家",
          type: 2,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
          categoryId: 100005,
        },
        {
          name: "充值缴费",
          type: 2,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
          categoryId: 100006,
        },
        {
          name: "9.9元拼",
          type: 2,
          imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
          categoryId: 100007,
        },
        {
          name: "领劵",
          type: 2,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
          categoryId: 100008,
        },
        {
          name: "省钱",
          type: 2,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
          categoryId: 100009,
        },
        {
          name: "全部",
          type: 2,
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
          categoryId: 100010,
        },
      ],
      list: ["衣服", "全部"],
      loading: true,
    });
    watch(value,(newValue,oldValue)=>{
      console.log(newValue,oldValue,'oldValueoldValue');
      
    });
    return { state, active, value };
  },
};
</script>
<style lang='less'>
.shopContent {
  display: flex;
  margin-top: 20px;
  padding: 10px;

  .shopTitle {
    line-height: 1;
  }
}
</style>