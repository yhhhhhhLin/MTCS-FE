<template>
  <div class="login-register-page">
    <div class="login-register-box">
      <div class="login-title">
        <img src="../../assets/vue.svg" alt="logo">
        这里是logo和文字描述
      </div>
      <div class="select-from">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="账号密码登录">
            <LoginForm></LoginForm>
          </a-tab-pane>
          <a-tab-pane key="2" title="注册账号">
            <RegisterFrom></RegisterFrom>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "../../components/LoginForm.vue";
import RegisterFrom from "../../components/RegisterFrom.vue";
</script>

<style scoped>

.login-register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;


  .login-register-box {
    width: 450px;
    height: 70vh;
    display: flex;
    gap: 30px;
    background-color: azure;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .select-from {
      width: 300px;

    }

  }
}

</style>