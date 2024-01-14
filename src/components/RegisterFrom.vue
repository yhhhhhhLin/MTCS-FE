<template>
  <div class="register-form">
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
    <a-input-password placeholder="再次确认密码">
      <template #prefix>
        <icon-lock/>
      </template>
    </a-input-password>
    <a-button type="primary">注册</a-button>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>


.arco-input-wrapper {
  border-radius: 8px;
}


.register-form {
  display: flex;
  flex-direction: column;
  gap: 30px;

}

.arco-btn-size-medium{
  border-radius: 8px;
}

.arco-input-wrapper {
  border-radius: 8px;
}

.arco-tabs-content{
  padding-top: 30px;
}
</style>
