<template>
  <div class="login-form">
    <a-input placeholder="请输入账号">
      <template #prefix>
        <icon-user/>
      </template>
    </a-input>
    <a-input-password placeholder="请输入密码">
      <template #prefix>
        <icon-lock/>
      </template>
    </a-input-password>
    <div class="other-select">
      <a-checkbox>自动登录</a-checkbox>
      <a href="#">忘记密码</a>
    </div>
    <a-button type="primary">登录</a-button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 30px;


  .other-select {
    display: flex;
    justify-content: space-between;
  }
}

.arco-btn-size-medium {
  border-radius: 8px;
}

.arco-input-wrapper {
  border-radius: 8px;
}


</style>
