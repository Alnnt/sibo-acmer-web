<script setup>
import Card from '@/components/CardBox.vue'
import { submit } from "@/api/info.js";
import { useInfoStore } from "@/stores/info.js";

const infoStore = useInfoStore()
submit(infoStore.info);
const subPos = [20, 15, 3, 11, 4, 16]
function getCode() {
  let str = ''
  for (let i = 0; i < subPos.length; ++i) {
    str += infoStore.info.cdkey.at(subPos[i])
  }
  str += str[1];
  return str.toUpperCase();
}
</script>

<template>
  <Card class="box">
    <div class="msg">
      感谢惠顾！
      <br />
      (每周套餐于周四自动答题)
      <br />
      售后服务:
      <br />
      邀请码：{{ getCode() }}
      <br />
      群号：368659681
    </div>
  </Card>
</template>

<style scoped>
.msg {
  color: white;
  font-size: 24px;
}
</style>
