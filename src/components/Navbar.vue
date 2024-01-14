<template>
  <a-menu
      :style="{  height: '100%' }"
      show-collapse-button
      @collapse="onCollapse"
      :default-selected-keys=[props.default]
  >
    <a-menu-item key="0" data-obj="1" @click="router.push('/')">
      首页
    </a-menu-item>
    <a-menu-item key="1" data-obj="1" @click="router.push('/gptChat')">
      <router-link to="/chat">GPT聊天</router-link>
    </a-menu-item>
    <a-sub-menu key="2">
      <!-- TODO icon-->
      <!-- <template #icon><icon-apps></icon-apps></template> -->
      <template #title>下拉式</template>
      <a-menu-item key="2_0">下拉菜单 1</a-menu-item>
      <a-menu-item key="2_1">下拉菜单 2</a-menu-item>
      <a-menu-item key="2_2" disabled>Menu 3</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {defineExpose, ref} from "vue";

const router = useRouter();

const props = defineProps({
  default: {
    type: String,
    default: '0'
  },
  onCollapse: Function
});


const onCollapse = ref((val, type) => {
  if (props.onCollapse) {
    props.onCollapse(val, type)
  }
});

defineExpose({onCollapse});
</script>
<style scoped>


</style>
