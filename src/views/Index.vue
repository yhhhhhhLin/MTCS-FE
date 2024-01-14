<template>
  <Container>
    <template v-slot:content>
      <button @click="login">发送登录请求</button>
      content
    </template>
  </Container>
</template>

<script setup lang="ts">
import request from "../request/request.ts";
import Container from "../components/Container.vue";

// 发送post请求到main/user/login
function login() {
  request.get("/audit/audit/interface/list").
  then((res) => {
    console.log("huiwhjirwe"+res)
  }).catch((e)=>{
    console.log(e)
    console.log('出现错误')
  })
  // request
  //     .post("/main/user/login", {
  //       userName: "admin",
  //       userPassword: "123456",
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //     });

}


</script>

<style scoped>

</style>