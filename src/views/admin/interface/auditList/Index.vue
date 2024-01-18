<template>
  <Container :navbarDefault = "'/admin/auditInterfaceList'">
    <template v-slot:content>
      这里是所有接口审核页面
    </template>
  </Container>
</template>

<script setup lang="ts">

import Container from "../../../../components/Container.vue";
</script>

<style scoped>

</style>