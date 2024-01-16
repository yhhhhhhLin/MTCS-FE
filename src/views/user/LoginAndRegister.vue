<template>
  <div class="login-register-page">
    <div class="login-register-box">
      <div class="login-title">
        <img class="logo" src="../../assets/logo.png" alt="logo">
      </div>
      <div class="select-from">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="账号密码登录">
            <div class="form">
              <LoginForm></LoginForm>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" title="注册账号">
            <div class="form">
              <RegisterFrom></RegisterFrom>
            </div>
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
    border-radius: 10px;
    box-shadow: 50px 50px 50px 50px rgba(0, 0, 0, 0.06);
    width: 450px;
    height: 70vh;
    display: flex;
    gap: 30px;
    background-color: aliceblue;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .select-from {
      width: 300px;
      .form{
        margin-top: 15px;
      }

    }

  }
}


.login-title{
   display: flex;
   align-items: end;
 }

.logo{
  width: 90%;
  height: 90%;
}


</style>