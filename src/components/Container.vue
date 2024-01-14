<template>
  <div class="page-container" :style="{ gridTemplateColumns: gridCols }">

    <a-layout-header>
      <a-space class="headerLogo">
        网站logo
      </a-space>

      <a-space class="headerBox">
        用户信息
      </a-space>
    </a-layout-header>

    <div class="page-navbar">
      <Navbar :onCollapse="containerOnCollapse" :default="props.navbarDefault"></Navbar>
    </div>

    <a-layout-content>
      <slot name="content"></slot>
    </a-layout-content>

  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
import {ref} from "vue";

const props = defineProps({
  navbarDefault: String
})


const containerOnCollapse = (val, type) => {
  if (gridCols.value === '17% 1fr') {
    gridCols.value = '5% 1fr';
  } else {
    gridCols.value = '17% 1fr';
  }
};

const gridCols = ref('17% 1fr');


</script>

<style scoped>
.page-container {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: "header header header" "sidebar content content";
  grid-template-rows: 8% 1fr;
}

.arco-layout-header {
  display: flex;
  justify-content: space-between;
  grid-area: header;
  background-color: #535bf2;
}

.page-navbar {
  grid-area: sidebar;
  background-color: aqua;
}

.arco-layout-content {
  grid-area: content;
  background-color: antiquewhite;
}
</style>
