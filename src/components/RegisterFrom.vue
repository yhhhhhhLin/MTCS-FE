<template>
  <div class="register-form">
    <a-input placeholder="请输入账号" v-model="userRegisterInfo.userAccount">
      <template #prefix>
        <icon-user/>
      </template>
    </a-input>
    <a-input-password placeholder="请输入密码" v-model="userRegisterInfo.userPassword">
      <template #prefix>
        <icon-lock/>
      </template>
    </a-input-password>
    <a-input-password placeholder="再次确认密码" v-model="userRegisterInfo.checkPassword">
      <template #prefix>
        <icon-lock/>
      </template>
    </a-input-password>
    <a-button type="primary" @click="registerHandler">注册</a-button>
  </div>

</template>

<script setup lang="ts">

import {reactive} from "vue";
import {userRegister} from "../services/user";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";

const router = useRouter()


const userRegisterInfo = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

function clearInfo() {
  userRegisterInfo.userAccount = ''
  userRegisterInfo.userPassword = ''
  userRegisterInfo.checkPassword = ''
}

function registerHandler() {
  userRegister(userRegisterInfo)
      .then((res: API.BaseResponse) => {
        if (!res.code) {
          Message.success('注册成功')
          router.go(0)

        } else {
          Message.error(res.message)
        }
      })
      .catch(res => {
        console.log('发送注册请求出现错误' + res)
        Message.error('注册出现异常')
      })
}

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

.arco-btn-size-medium {
  border-radius: 8px;
}

.arco-input-wrapper {
  border-radius: 8px;
}

.arco-tabs-content {
  padding-top: 30px;
}
</style>
