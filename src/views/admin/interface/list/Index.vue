<template>
  <Container :navbarDefault = "'/admin/interfaceList'">
    <template v-slot:content>
      这里是所有接口页面
    </template>

  </Container>

</template>

<script setup lang="ts">

import Container from "../../../../components/Container.vue";
</script>

<style scoped>

</style>