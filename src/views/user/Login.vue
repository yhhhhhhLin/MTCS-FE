<template>
  <div class="login-container">
    <div class="login-page">
      <div class="login-logo">
        <img src="../../assets/vue.svg" alt="logo">
        demo集合平台
      </div>
      <hr>
      <div class="login-from">
        <a-input
            placeholder="请输入账号名字"
        />
        <a-input-password
            placeholder="请输入密码"
        />
      </div>
      <div class="select-box">
        这里是选择菜单
      </div>
      <div class="login-btn">
        <a-button type="primary">登录</a-button>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">

import Container from "../../components/Container.vue";
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .login-page {
    width: 40%;
    height: 40vh;
    display: flex;
    background-color: azure;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    .login-from {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}

.arco-input-wrapper {
//padding: 5px; border-radius: 8px;
}

</style>